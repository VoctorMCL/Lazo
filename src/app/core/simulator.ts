import { Injectable, computed, inject, signal } from '@angular/core';
import { SCENARIOS } from './data';
import { getAIResponse } from './ai';
import { ProgressService, ChatMessage } from './progress';

export type { ChatMessage } from './progress';

const MIN_USER_TURNS_FOR_FEEDBACK = 3;

@Injectable({ providedIn: 'root' })
export class Simulator {
  private readonly progressSvc = inject(ProgressService);

  readonly currentScenario = signal(SCENARIOS[0]);
  readonly chatMessages = signal<ChatMessage[]>([]);
  readonly isGenerating = signal(false);
  readonly feedbackGiven = signal(false);

  readonly userTurnCount = computed(
    () => this.chatMessages().filter((m) => m.sender === 'user').length
  );

  init(scenarioId: string, forceFresh = false) {
    const scenario = SCENARIOS.find((s) => s.id === scenarioId) ?? SCENARIOS[0];
    this.currentScenario.set(scenario);
    this.isGenerating.set(false);

    const saved = !forceFresh ? this.progressSvc.getScenarioProgress(scenario.id) : undefined;
    if (saved?.completed) {
      if (saved.messages && saved.messages.length > 0) {
        this.chatMessages.set([...saved.messages]);
        this.feedbackGiven.set(true);
      } else if (saved.feedback) {
        this.chatMessages.set([
          { sender: 'character', text: scenario.apertura },
          { sender: 'feedback', text: saved.feedback },
        ]);
        this.feedbackGiven.set(true);
      } else {
        this.chatMessages.set([{ sender: 'character', text: scenario.apertura }]);
        this.feedbackGiven.set(false);
      }
    } else {
      this.chatMessages.set([{ sender: 'character', text: scenario.apertura }]);
      this.feedbackGiven.set(false);
    }
  }

  async send(text: string) {
    if (!text || this.isGenerating()) return;

    const scenario = this.currentScenario();
    this.chatMessages.update((messages) => [...messages, { sender: 'user', text }]);
    this.isGenerating.set(true);

    const responseData = await getAIResponse(scenario, this.chatMessages());

    this.chatMessages.update((messages) => [
      ...messages,
      { sender: 'character', text: responseData.reply },
    ]);

    const readyForFeedback =
      responseData.achieved &&
      !!responseData.feedback &&
      !this.feedbackGiven() &&
      this.userTurnCount() >= MIN_USER_TURNS_FOR_FEEDBACK;

    if (readyForFeedback && responseData.feedback) {
      const feedback = responseData.feedback;
      this.feedbackGiven.set(true);
      const updatedMessages: ChatMessage[] = [
        ...this.chatMessages(),
        { sender: 'feedback', text: feedback },
      ];
      this.chatMessages.set(updatedMessages);
      this.progressSvc.complete(scenario.id, feedback, updatedMessages);
    }

    this.isGenerating.set(false);
  }

  repeatCurrentScenario() {
    const id = this.currentScenario().id;
    this.progressSvc.resetScenario(id);
    this.init(id, true);
  }

  reset() {
    this.init(this.currentScenario().id, true);
  }
}
