import { SCENARIOS, catOf, COLOR_MAP } from './data.js';
import { getProgress, saveProgress } from './storage.js';
import { esc } from './utils.js';
import { getAIResponse } from './ai.js';

let currentScenario = null;
let chatMessages = [];
let isGenerating = false;

export function initSimulator(scenarioId) {
  currentScenario = SCENARIOS.find(s => s.id === scenarioId) || SCENARIOS[0];
  chatMessages = [
    {
      sender: 'character',
      text: currentScenario.apertura
    }
  ];
  isGenerating = false;
}

function scenarioColors() {
  const cat = catOf(currentScenario.catId);
  return COLOR_MAP[cat.color] || COLOR_MAP.jade;
}

export function renderChatView() {
  if (!currentScenario) return '';
  const colors = scenarioColors();

  return `
    <div class="mb-4 flex items-center justify-between gap-3">
      <button onclick="window.appNavigate('list', { catId: '${currentScenario.catId}' })"
              class="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-jade transition-colors shrink-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M15 18l-6-6 6-6"/></svg>
        Situaciones
      </button>
      <span class="text-xs text-ink-soft bg-surface border border-line px-3 py-1.5 rounded-full font-medium text-right line-clamp-1">
        🎯 ${esc(currentScenario.objetivo)}
      </span>
    </div>

    <div class="bg-surface border border-line rounded-2xl p-4 mb-4 flex items-center justify-between gap-3">
      <div class="flex items-center gap-3 min-w-0">
        <span class="w-11 h-11 rounded-full bg-${colors.soft} text-${colors.main} flex items-center justify-center font-display font-semibold text-lg shrink-0">
          ${esc(currentScenario.personaje.charAt(0))}
        </span>
        <div class="min-w-0">
          <h1 class="font-display text-lg font-semibold text-ink leading-tight truncate">${esc(currentScenario.title)}</h1>
          <p class="text-xs text-ink-soft mt-0.5">Con <strong class="text-ink font-medium">${esc(currentScenario.personaje)}</strong> · ${esc(currentScenario.personajeEstado)}</p>
        </div>
      </div>
      <button onclick="window.resetCurrentChat()"
              class="text-xs text-alert bg-alert-soft px-3 py-1.5 rounded-lg font-medium hover:opacity-80 shrink-0">
        Reiniciar
      </button>
    </div>

    <div id="chat-container" class="bg-surface border border-line rounded-2xl p-4 sm:p-6 mb-4 h-[55vh] sm:h-[50vh] overflow-y-auto flex flex-col gap-4">
      <div class="text-center my-1">
        <span class="text-xs bg-bg text-ink-soft px-3 py-1 rounded-full border border-line">
          Inicio de la conversación con ${esc(currentScenario.personaje)}
        </span>
      </div>

      ${chatMessages.map(msg => renderMessage(msg, colors)).join("")}

      ${isGenerating ? `
        <div class="flex items-center gap-2 text-ink-soft text-xs italic pl-1">
          <span class="dot-bounce w-1.5 h-1.5 rounded-full bg-${colors.main}" style="animation-delay:0ms"></span>
          <span class="dot-bounce w-1.5 h-1.5 rounded-full bg-${colors.main}" style="animation-delay:150ms"></span>
          <span class="dot-bounce w-1.5 h-1.5 rounded-full bg-${colors.main}" style="animation-delay:300ms"></span>
          ${esc(currentScenario.personaje)} está escribiendo
        </div>
      ` : ''}
    </div>
    <div class="bg-surface border border-line rounded-2xl p-3 flex gap-2 items-end focus-within:ring-2 focus-within:ring-jade/25 focus-within:border-jade transition-shadow">
      <textarea id="chat-input" rows="2"
                placeholder="Escribe lo que le dirías a ${esc(currentScenario.personaje)}..."
                ${isGenerating ? 'disabled' : ''}
                class="w-full bg-bg border border-line rounded-xl p-3 text-sm text-ink focus:outline-none focus:border-jade resize-none disabled:opacity-60"
                onkeydown="window.handleChatKeydown(event)"></textarea>
      <button onclick="window.sendUserMessage()" ${isGenerating ? 'disabled' : ''}
              class="bg-jade text-bg px-5 py-3 rounded-xl font-medium text-sm hover:opacity-90 disabled:opacity-50 shrink-0 h-full flex items-center justify-center gap-1.5">
        Enviar
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
      </button>
    </div>
  `;
}

function renderMessage(msg, colors) {
  if (msg.sender === 'character') {
    const isError = msg.text.trim().startsWith('[Error]');
    return `
            <div class="flex items-start gap-3 max-w-[92%] sm:max-w-[85%] msg-in ${isError ? 'animate-shake' : ''}">
              <div class="w-8 h-8 rounded-full ${isError ? 'bg-alert-soft text-alert' : `bg-${colors.soft} text-${colors.main}`} flex items-center justify-center font-semibold text-xs shrink-0">
                ${isError ? '!' : esc(currentScenario.personaje.charAt(0))}
              </div>
              <div class="${isError ? 'bg-alert-soft border border-alert/30 text-alert' : 'bg-bg border border-line text-ink'} p-3.5 rounded-2xl rounded-tl-none text-sm">
                <p class="font-semibold text-xs ${isError ? 'text-alert' : `text-${colors.main}`} mb-1">${isError ? 'Error' : esc(currentScenario.personaje)}</p>
                <p class="whitespace-pre-wrap">${esc(msg.text)}</p>
              </div>
            </div>
          `;
  } else if (msg.sender === 'user') {
    return `
            <div class="flex items-start gap-3 max-w-[92%] sm:max-w-[85%] ml-auto flex-row-reverse msg-in">
              <div class="w-8 h-8 rounded-full bg-ink text-bg flex items-center justify-center font-semibold text-xs shrink-0">
                Tú
              </div>
              <div class="bg-jade text-bg p-3.5 rounded-2xl rounded-tr-none text-sm">
                <p class="whitespace-pre-wrap">${esc(msg.text)}</p>
              </div>
            </div>
          `;
  } else if (msg.sender === 'feedback') {
    return `
            <div class="w-full bg-jade-soft border border-jade/25 p-4 rounded-xl my-1 msg-in flex gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-jade shrink-0 mt-0.5"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"/></svg>
              <div class="min-w-0">
                <p class="font-semibold text-xs text-jade uppercase tracking-wide mb-1">Retroalimentación</p>
                <p class="text-ink text-sm whitespace-pre-wrap">${esc(msg.text)}</p>
              </div>
            </div>
          `;
  }
  return '';
}

window.sendUserMessage = async function () {
  const inputEl = document.getElementById("chat-input");
  if (!inputEl) return;
  const text = inputEl.value.trim();
  if (!text || isGenerating) return;

  inputEl.value = "";
  chatMessages.push({ sender: 'user', text });
  isGenerating = true;
  updateChatDOM();

  const responseData = await getAIResponse(currentScenario, chatMessages);

  chatMessages.push({ sender: 'character', text: responseData.reply });

  if (responseData.feedback) {
    chatMessages.push({ sender: 'feedback', text: responseData.feedback });
    const progress = getProgress();
    progress[currentScenario.id] = { completed: true, updatedAt: new Date().toISOString() };
    saveProgress(progress);
  }

  isGenerating = false;
  updateChatDOM();
};

window.resetCurrentChat = function () {
  if (currentScenario) {
    initSimulator(currentScenario.id);
    updateChatDOM();
  }
};

window.handleChatKeydown = function (e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    window.sendUserMessage();
  }
};

function updateChatDOM() {
  const container = document.getElementById("app");
  if (container) {
    container.innerHTML = renderChatView();
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }
}
