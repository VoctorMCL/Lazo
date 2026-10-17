import { Injectable, computed, inject, signal } from '@angular/core';
import { SCENARIOS } from './data';
import { getAIResponse } from './ai';
import { ProgressService } from './progress';

export interface ChatMessage {
  sender: 'character' | 'user' | 'feedback';
  text: string;
}

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

  init(scenarioId: string) {
    const scenario = SCENARIOS.find((s) => s.id === scenarioId) ?? SCENARIOS[0];
    this.currentScenario.set(scenario);
    this.chatMessages.set([{ sender: 'character', text: scenario.apertura }]);
    this.isGenerating.set(false);
    this.feedbackGiven.set(false);
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
      this.chatMessages.update((messages) => [
        ...messages,
        { sender: 'feedback', text: feedback },
      ]);
      this.progressSvc.complete(scenario.id);
    }

    this.isGenerating.set(false);
  }

  reset() {
    this.init(this.currentScenario().id);
  }
}
