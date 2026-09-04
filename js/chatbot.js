import { getChatbotResponse } from './ai.js';
import { esc } from './utils.js';

let chatbotMessages = [];
let isChatbotGenerating = false;

export function initChatbot() {
  chatbotMessages = [
    { sender: 'bot', text: '¡Hola! Soy tu asistente de convivencia. Pregúntame sobre resolución de conflictos, comunicación, mediación o cualquier tema relacionado con la vida escolar.' }
  ];
  renderChatbot();
}

function renderChatbot() {
  const sidebar = document.getElementById('chatbot-sidebar');
  if (!sidebar) return;

  sidebar.innerHTML = `
    <div class="bg-surface border border-line rounded-2xl p-4 h-full md:h-[calc(100vh-6rem)] flex flex-col shadow-xl md:shadow-sm md:sticky md:top-20">
      <div class="flex items-center gap-2.5 mb-1 pb-3 border-b border-line/70">
        <span class="w-8 h-8 rounded-full bg-teal-soft text-teal flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </span>
        <div class="min-w-0">
          <h2 class="font-display text-base font-semibold text-ink leading-tight">Asistente</h2>
          <p class="text-[11px] text-ink-soft leading-tight">Convivencia escolar</p>
        </div>
        <button onclick="window.toggleChatbotDrawer(false)" aria-label="Cerrar"
                class="md:hidden ml-auto w-8 h-8 rounded-full flex items-center justify-center text-ink-soft hover:bg-bg shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <div id="chatbot-messages" class="flex-1 overflow-y-auto my-3 space-y-3 text-sm pr-0.5">
        ${chatbotMessages.map(msg => {
    const isUser = msg.sender === 'user';
    const isError = !isUser && msg.text.trim().startsWith('[Error]');
    return `
            <div class="flex ${isUser ? 'justify-end' : 'justify-start'} msg-in ${isError ? 'animate-shake' : ''}">
              <div class="${isUser
        ? 'bg-teal text-bg rounded-2xl rounded-tr-none'
        : isError
          ? 'bg-alert-soft border border-alert/30 text-alert rounded-2xl rounded-tl-none'
          : 'bg-bg border border-line text-ink rounded-2xl rounded-tl-none'
      } p-2.5 max-w-[88%] whitespace-pre-wrap">
                ${esc(msg.text)}
              </div>
            </div>
          `;
  }).join('')}
        ${isChatbotGenerating ? `
          <div class="flex items-center gap-1.5 text-ink-soft text-xs pl-1">
            <span class="dot-bounce w-1.5 h-1.5 rounded-full bg-teal" style="animation-delay:0ms"></span>
            <span class="dot-bounce w-1.5 h-1.5 rounded-full bg-teal" style="animation-delay:150ms"></span>
            <span class="dot-bounce w-1.5 h-1.5 rounded-full bg-teal" style="animation-delay:300ms"></span>
          </div>
        ` : ''}
      </div>

      <div class="flex gap-2 items-end pt-1">
        <input type="text" id="chatbot-input" placeholder="Pregunta algo..." ${isChatbotGenerating ? 'disabled' : ''}
               class="flex-1 bg-bg border border-line rounded-xl p-2.5 text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 disabled:opacity-60"
               onkeydown="window.handleChatbotKeydown(event)">
        <button onclick="window.sendChatbotMessage()" ${isChatbotGenerating ? 'disabled' : ''}
                class="bg-teal text-bg px-3.5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-50 shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </button>
      </div>
    </div>
  `;

  const msgContainer = document.getElementById('chatbot-messages');
  if (msgContainer) msgContainer.scrollTop = msgContainer.scrollHeight;
}

window.sendChatbotMessage = async function () {
  const input = document.getElementById('chatbot-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text || isChatbotGenerating) return;

  input.value = '';
  chatbotMessages.push({ sender: 'user', text });
  isChatbotGenerating = true;
  renderChatbot();

  const reply = await getChatbotResponse(chatbotMessages);
  chatbotMessages.push({ sender: 'bot', text: reply });
  isChatbotGenerating = false;
  renderChatbot();
};

window.handleChatbotKeydown = function (e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    window.sendChatbotMessage();
  }
};
