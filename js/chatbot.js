/* ============================================================
   CHATBOT LATERAL (Asistente de convivencia)
   ============================================================ */
import { getChatbotResponse } from './ai.js';
import { esc } from './utils.js';

let chatbotMessages = [];
let isChatbotGenerating = false;

export function initChatbot() {
  // Mensaje de bienvenida
  chatbotMessages = [
    { sender: 'bot', text: '¡Hola! Soy tu asistente de convivencia. Pregúntame sobre resolución de conflictos, comunicación, mediación o cualquier tema relacionado con la vida escolar.' }
  ];
  renderChatbot();
}

function renderChatbot() {
  const sidebar = document.getElementById('chatbot-sidebar');
  if (!sidebar) return;

  sidebar.innerHTML = `
    <div class="bg-surface border border-line rounded-xl p-4 h-[calc(100vh-6rem)] flex flex-col shadow-sm sticky top-6">
      <h2 class="font-display text-lg font-semibold text-ink mb-2">Asistente</h2>
      <div id="chatbot-messages" class="flex-1 overflow-y-auto mb-3 space-y-3 text-sm">
        ${chatbotMessages.map(msg => {
          const isUser = msg.sender === 'user';
          return `
            <div class="flex ${isUser ? 'justify-end' : 'justify-start'}">
              <div class="${isUser ? 'bg-jade text-white' : 'bg-bg border border-line'} p-2.5 rounded-lg max-w-[90%]">
                ${esc(msg.text)}
              </div>
            </div>
          `;
        }).join('')}
        ${isChatbotGenerating ? `<div class="text-ink-soft text-xs italic">Escribiendo...</div>` : ''}
      </div>
      <div class="flex gap-2">
        <input type="text" id="chatbot-input" placeholder="Pregunta algo..."
               class="flex-1 bg-bg border border-line rounded-lg p-2 text-sm focus:outline-none focus:border-jade"
               onkeydown="window.handleChatbotKeydown(event)">
        <button onclick="window.sendChatbotMessage()"
                class="bg-jade text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 shrink-0">
          Enviar
        </button>
      </div>
    </div>
  `;

  // Scroll al final
  const msgContainer = document.getElementById('chatbot-messages');
  if (msgContainer) msgContainer.scrollTop = msgContainer.scrollHeight;
}

// Funciones globales para los eventos del DOM
window.sendChatbotMessage = async function() {
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

window.handleChatbotKeydown = function(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    window.sendChatbotMessage();
  }
};