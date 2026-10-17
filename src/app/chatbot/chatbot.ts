import { Component, inject, signal, ElementRef, viewChild, afterRenderEffect } from '@angular/core';
import { AppState } from '../core/app-state';
import { getChatbotResponse, isAiError } from '../core/ai';

interface ChatMsg { sender: 'bot' | 'user'; text: string; }

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.html',
})
export class Chatbot {
  private readonly state = inject(AppState);
  protected readonly messages = signal<ChatMsg[]>([
    { sender: 'bot', text: '¡Hola! Soy tu asistente de convivencia. Pregúntame sobre resolución de conflictos, comunicación, mediación o cualquier tema relacionado con la vida escolar.' }
  ]);
  protected readonly isGenerating = signal(false);
  private readonly msgContainer = viewChild<ElementRef<HTMLDivElement>>('msgContainer');

  constructor() {
    afterRenderEffect(() => {
      const el = this.msgContainer()?.nativeElement;
      if (el) requestAnimationFrame(() => { el.scrollTop = el.scrollHeight; });
    });
  }

  close() { this.state.toggleChatbotDrawer(false); }

  protected readonly isError = isAiError;

  async send(input: HTMLInputElement) {
    const text = input.value.trim();
    if (!text || this.isGenerating()) return;
    input.value = '';
    this.messages.update(m => [...m, { sender: 'user', text }]);
    this.isGenerating.set(true);
    const result = await getChatbotResponse(this.messages());
    const reply = result.ok ? result.text : result.message;
    this.messages.update(m => [...m, { sender: 'bot', text: reply }]);
    this.isGenerating.set(false);
  }

  onKeydown(e: KeyboardEvent, input: HTMLInputElement) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); void this.send(input);
    }
  }
}
