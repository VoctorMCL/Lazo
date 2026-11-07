import { Component, ElementRef, inject, signal, viewChild, afterRenderEffect } from '@angular/core';
import { AppState } from '../core/app-state';
import { Simulator } from '../core/simulator';
import { ProgressService } from '../core/progress';
import { colorsOf } from '../core/data';
import { isAiError } from '../core/ai';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.html',
  host: { class: 'flex flex-col flex-1 min-h-0' },
})
export class Chat {
  private readonly state = inject(AppState);
  private readonly sim = inject(Simulator);
  private readonly progressSvc = inject(ProgressService);
  private readonly chatContainer = viewChild<ElementRef<HTMLDivElement>>('chatContainer');

  protected readonly isError = isAiError;
  protected readonly contextOpen = signal(true);

  get scenario() { return this.sim.currentScenario(); }
  get messages() { return this.sim.chatMessages(); }
  get isGenerating() { return this.sim.isGenerating(); }
  get feedbackGiven() { return this.sim.feedbackGiven(); }
  get isCompleted() { return this.progressSvc.isCompleted(this.scenario.id); }
  get colors() { return colorsOf(this.scenario.catId); }

  constructor() {
    const id = this.state.activeScenarioId();
    if (id) this.sim.init(id);
    afterRenderEffect(() => {
      const el = this.chatContainer()?.nativeElement;
      if (el) requestAnimationFrame(() => { el.scrollTop = el.scrollHeight; });
    });
  }

  goHome() {
    this.state.navigate('home');
  }

  toggleContext() {
    this.contextOpen.update((open) => !open);
  }

  repeatScenario() {
    const confirmed = window.confirm(
      '¿Deseas repetir esta situación? Se reiniciará el diálogo y la retroalimentación de esta situación para que puedas practicar de nuevo.'
    );
    if (!confirmed) return;
    this.sim.repeatCurrentScenario();
  }

  reset() {
    this.sim.reset();
  }

  async send(input: HTMLTextAreaElement) {
    const text = input.value.trim();
    if (!text || this.isGenerating || this.feedbackGiven) return;
    input.value = '';
    await this.sim.send(text);
  }

  onKeydown(e: KeyboardEvent, input: HTMLTextAreaElement) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void this.send(input);
    }
  }
}
