import { Component, ElementRef, inject, viewChild, afterRenderEffect } from '@angular/core';
import { AppState } from '../core/app-state';
import { Simulator } from '../core/simulator';
import { colorsOf } from '../core/data';
import { isAiError } from '../core/ai';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.html',
})
export class Chat {
  private readonly state = inject(AppState);
  private readonly sim = inject(Simulator);
  private readonly chatContainer = viewChild<ElementRef<HTMLDivElement>>('chatContainer');

  protected readonly isError = isAiError;

  get scenario() { return this.sim.currentScenario(); }
  get messages() { return this.sim.chatMessages(); }
  get isGenerating() { return this.sim.isGenerating(); }
  get colors() { return colorsOf(this.scenario.catId); }

  constructor() {
    const id = this.state.activeScenarioId();
    if (id) this.sim.init(id);
    afterRenderEffect(() => {
      const el = this.chatContainer()?.nativeElement;
      if (el) requestAnimationFrame(() => { el.scrollTop = el.scrollHeight; });
    });
  }

  backToList() {
    this.state.navigate('list', { catId: this.scenario.catId });
  }

  reset() {
    this.sim.reset();
  }

  async send(input: HTMLTextAreaElement) {
    const text = input.value.trim();
    if (!text || this.isGenerating) return;
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
