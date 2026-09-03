/* ============================================================
   SIMULADOR DE DIÁLOGO Y CHAT
   ============================================================ */
import { SCENARIOS } from './data.js';
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

export function renderChatView() {
    if (!currentScenario) return '';

    return `
    <div class="mb-4 flex items-center justify-between">
      <button onclick="window.appNavigate('list', { catId: '${currentScenario.catId}' })" class="text-xs font-semibold text-jade hover:underline">
        ← Volver a situaciones
      </button>
      <span class="text-xs text-ink-soft bg-surface border border-line px-3 py-1 rounded-full font-medium">
        Objetivo: ${esc(currentScenario.objetivo)}
      </span>
    </div>

    <!-- Cabecera de la simulación -->
    <div class="bg-surface border border-line rounded-xl p-4 mb-4 shadow-sm flex items-center justify-between">
      <div>
        <h1 class="font-display text-xl font-semibold text-ink">${esc(currentScenario.title)}</h1>
        <p class="text-xs text-ink-soft mt-0.5">Estás conversando con <strong class="text-ink">${esc(currentScenario.personaje)}</strong> (${esc(currentScenario.personajeEstado)})</p>
      </div>
      <button onclick="window.resetCurrentChat()" class="text-xs text-alert bg-alert-soft px-3 py-1.5 rounded font-medium hover:opacity-80">
        Reiniciar diálogo
      </button>
    </div>

    <!-- Contenedor del Chat -->
    <div id="chat-container" class="bg-surface border border-line rounded-xl p-4 sm:p-6 mb-4 h-[50vh] overflow-y-auto flex flex-col gap-4 shadow-sm">
      <div class="text-center my-2">
        <span class="text-xs bg-bg text-ink-soft px-3 py-1 rounded-full border border-line">
          Inicio de la conversación con ${esc(currentScenario.personaje)}
        </span>
      </div>

      ${chatMessages.map(msg => {
        if (msg.sender === 'character') {
            return `
            <div class="flex items-start gap-3 max-w-[85%]">
              <div class="w-8 h-8 rounded-full bg-jade text-white flex items-center justify-center font-bold text-xs shrink-0">
                ${esc(currentScenario.personaje.charAt(0))}
              </div>
              <div class="bg-bg border border-line p-3.5 rounded-2xl rounded-tl-none text-ink text-sm">
                <p class="font-semibold text-xs text-jade mb-1">${esc(currentScenario.personaje)}</p>
                <p class="whitespace-pre-wrap">${esc(msg.text)}</p>
              </div>
            </div>
          `;
        } else if (msg.sender === 'user') {
            return `
            <div class="flex items-start gap-3 max-w-[85%] ml-auto flex-row-reverse">
              <div class="w-8 h-8 rounded-full bg-ink text-surface flex items-center justify-center font-bold text-xs shrink-0">
                Tú
              </div>
              <div class="bg-jade text-white p-3.5 rounded-2xl rounded-tr-none text-sm">
                <p class="whitespace-pre-wrap">${esc(msg.text)}</p>
              </div>
            </div>
          `;
        } else if (msg.sender === 'feedback') {
            return `
            <div class="w-full bg-jade-soft border border-jade/30 p-4 rounded-xl my-2">
              <p class="font-semibold text-xs text-jade uppercase tracking-wider mb-1">Evaluación / Retroalimentación</p>
              <p class="text-ink text-sm whitespace-pre-wrap">${esc(msg.text)}</p>
            </div>
          `;
        }
        return '';
    }).join("")}

      ${isGenerating ? `
        <div class="flex items-center gap-2 text-ink-soft text-xs italic">
          <div class="w-2 h-2 rounded-full bg-jade animate-ping"></div>
          ${esc(currentScenario.personaje)} está escribiendo...
        </div>
      ` : ''}
    </div>

    <!-- Caja de texto para enviar mensajes -->
    <div class="bg-surface border border-line rounded-xl p-3 shadow-sm flex gap-2 items-center">
      <textarea id="chat-input" rows="2" 
                placeholder="Escribe lo que le dirías a ${esc(currentScenario.personaje)}..."
                class="w-full bg-bg border border-line rounded-lg p-3 text-sm text-ink focus:outline-none focus:border-jade resize-none"
                onkeydown="window.handleChatKeydown(event)"></textarea>
      <button onclick="window.sendUserMessage()" 
              class="bg-jade text-white px-5 py-3 rounded-lg font-medium text-sm hover:opacity-90 shrink-0 h-full flex items-center justify-center">
        Enviar
      </button>
    </div>
  `;
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

    // Llamar a la IA para obtener la respuesta del personaje
    const responseData = await getAIResponse(currentScenario, chatMessages);

    chatMessages.push({ sender: 'character', text: responseData.reply });

    if (responseData.feedback) {
        chatMessages.push({ sender: 'feedback', text: responseData.feedback });
        // Marcar como completado en localStorage
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