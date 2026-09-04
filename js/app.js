import { CATEGORIES, SCENARIOS, catOf, COLOR_MAP } from './data.js';
import { getProgress, resetProgress } from './storage.js';
import { esc } from './utils.js';
import { initSimulator, renderChatView } from './simulator.js';
import { initChatbot } from './chatbot.js';

let currentView = "home";
let selectedCatId = null;
let activeScenarioId = null;

const CATEGORY_ICONS = {
  comunicacion: `<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>`,
  origen: `<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>`,
  equipo: `<path d="M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1"/><circle cx="9" cy="8" r="3.5"/><path d="M22 19v-1a4 4 0 0 0-3-3.87"/><path d="M15 4.13a4 4 0 0 1 0 7.75"/>`,
  espacio: `<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>`,
  consentimiento: `<path d="M12 3l7 3v5.3c0 4.8-3 8.4-7 9.7-4-1.3-7-4.9-7-9.7V6l7-3z"/>`,
  opinion: `<rect x="3" y="5" width="18" height="12" rx="3"/><path d="M8 17l-2 3v-3"/>`,
  exclusion: `<circle cx="9" cy="8" r="3.5"/><path d="M2 19v-1a4 4 0 0 1 4-4h2a4 4 0 0 1 3.6 2.3"/><path d="M17 8l4 4M21 8l-4 4"/>`,
  ira: `<path d="M12 2c1.6 3-1.8 4.6-1.8 8a3.8 3.8 0 0 0 7.6 0c0-1.9-.9-2.9-1.4-3.8.9 2.8-.9 3.8-1.5 3.8-.8 0-1.5-1-1-2.4.7-2-.5-4-1.9-5.6z"/>`,
  justicia: `<path d="M12 3v18"/><path d="M5 7h14"/><path d="M5 7l-3 6.3a3.4 3.4 0 0 0 6.8 0L5 7z"/><path d="M19 7l-3 6.3a3.4 3.4 0 0 0 6.8 0L19 7z"/>`,
  familiar: `<path d="M4 11l8-7 8 7"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/>`
};

const HEX = {
  jade: "#2F6E5B", gold: "#A8763A", slate: "#48626B", moss: "#6B7A3E",
  teal: "#2E7E82", indigo: "#4A5A8A", plum: "#6B4A6B", clay: "#8A5A3E",
  berry: "#8A3E5A", olive: "#7A7A3E", alert: "#A8472A"
};

function icon(catId, extraClass = "") {
  const d = CATEGORY_ICONS[catId] || CATEGORY_ICONS.comunicacion;
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
               stroke-linecap="round" stroke-linejoin="round" class="${extraClass}">${d}</svg>`;
}

export function navigate(view, params = {}) {
  currentView = view;
  if (params.catId !== undefined) selectedCatId = params.catId;
  if (params.scenarioId !== undefined) {
    activeScenarioId = params.scenarioId;
    if (activeScenarioId) initSimulator(activeScenarioId);
  }
  renderApp();
  window.scrollTo(0, 0);

  if (typeof window.toggleChatbotDrawer === "function") window.toggleChatbotDrawer(false);
}

function renderApp() {
  const container = document.getElementById("app");
  if (!container) return;

  if (currentView === "home") {
    container.innerHTML = renderHome();
  } else if (currentView === "list") {
    container.innerHTML = renderList();
  } else if (currentView === "chat") {
    container.innerHTML = renderChatView();
  }
}

function renderHome() {
  const progress = getProgress();
  const totalScenarios = SCENARIOS.length;
  const completedCount = Object.keys(progress).filter(k => progress[k].completed).length;
  const pct = Math.round((completedCount / totalScenarios) * 100) || 0;

  return `
    <header class="mb-10 sm:mb-12 relative">
      <svg viewBox="0 0 600 90" preserveAspectRatio="none"
           class="absolute -top-2 left-0 w-full h-16 sm:h-20 text-jade/25 -z-10" aria-hidden="true">
        <path class="thread-draw" d="M0 60 C 100 10, 200 100, 300 55 C 400 15, 500 95, 600 45"
              fill="none" stroke="currentColor" stroke-width="2.5" pathLength="220"/>
      </svg>
      <p class="text-sm text-ink-soft mb-2">Un espacio para practicar antes de la conversación real</p>
      <h1 class="font-display text-4xl sm:text-[3.25rem] leading-[1.05] font-semibold tracking-tight text-ink max-w-xl">
        Lazo
      </h1>
      <p class="max-w-md text-ink-soft text-base sm:text-lg mt-3">
        Conversa con un personaje, aplica escucha activa y mediación, y recibe retroalimentación sobre cómo manejaste la situación.
      </p>
    </header>

    <section class="bg-surface border border-line rounded-2xl p-5 mb-8 flex items-center gap-5">
      <div class="relative w-16 h-16 shrink-0" aria-hidden="true">
        <svg viewBox="0 0 36 36" class="w-16 h-16 -rotate-90">
          <circle cx="18" cy="18" r="15.5" fill="none" stroke="#DCD3B9" stroke-width="3"/>
          <circle cx="18" cy="18" r="15.5" fill="none" stroke="#2F6E5B" stroke-width="3"
                  stroke-linecap="round" stroke-dasharray="97.4" stroke-dashoffset="${97.4 - (97.4 * pct / 100)}"/>
        </svg>
        <span class="absolute inset-0 flex items-center justify-center text-xs font-semibold text-ink">${pct}%</span>
      </div>
      <div class="min-w-0">
        <p class="text-sm font-semibold text-ink">Tu progreso</p>
        <p class="text-sm text-ink-soft">${completedCount} de ${totalScenarios} situaciones completadas</p>
      </div>
    </section>

    <section class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      ${CATEGORIES.map(cat => {
    const colors = COLOR_MAP[cat.color] || COLOR_MAP.jade;
    const catScenarios = SCENARIOS.filter(s => s.catId === cat.id);
    const catCompleted = catScenarios.filter(s => progress[s.id]?.completed).length;
    return `
          <div onclick="window.appNavigateList('${cat.id}')"
               style="--fold:${HEX[cat.color] || HEX.jade}"
               class="fold-corner bg-surface border border-line hover:border-${colors.main} p-5 rounded-2xl rounded-tr-none cursor-pointer transition-colors hover:shadow-md flex flex-col justify-between group">
            <div class="flex items-start gap-3.5">
              <span class="w-10 h-10 rounded-xl bg-${colors.soft} text-${colors.main} flex items-center justify-center shrink-0">
                ${icon(cat.id, "w-5 h-5")}
              </span>
              <div class="min-w-0 pt-0.5">
                <h2 class="font-display text-lg font-medium text-ink leading-snug">
                  ${cat.label}
                </h2>
                <p class="text-xs text-ink-soft mt-0.5">${catScenarios.length} situaciones</p>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between text-xs">
              <span class="text-ink-soft">${catCompleted}/${catScenarios.length} completados</span>
              <span class="font-medium text-${colors.main} opacity-0 group-hover:opacity-100 transition-opacity">Explorar</span>
            </div>
          </div>
        `;
  }).join("")}
    </section>
  `;
}

function renderList() {
  const cat = catOf(selectedCatId);
  const colors = COLOR_MAP[cat.color] || COLOR_MAP.jade;
  const scenarios = SCENARIOS.filter(s => s.catId === selectedCatId);
  const progress = getProgress();

  return `
    <div class="mb-6">
      <button onclick="window.appNavigate('home')"
              class="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-jade transition-colors mb-4">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M15 18l-6-6 6-6"/></svg>
        Categorías
      </button>
      <div class="flex items-center gap-3">
        <span class="w-9 h-9 rounded-lg bg-${colors.soft} text-${colors.main} flex items-center justify-center shrink-0">
          ${icon(cat.id, "w-[18px] h-[18px]")}
        </span>
        <h1 class="font-display text-2xl sm:text-3xl font-semibold text-ink">${cat.label}</h1>
      </div>
      <p class="text-ink-soft text-sm mt-2">Elige una situación para iniciar la simulación de diálogo.</p>
    </div>

    <div class="space-y-3.5">
      ${scenarios.map(sc => {
    const isCompleted = progress[sc.id]?.completed;
    return `
          <div onclick="window.appNavigate('chat', { scenarioId: '${sc.id}' })"
               class="relative bg-surface border border-line hover:border-${colors.main} pl-5 pr-5 py-4 rounded-xl cursor-pointer transition-all hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 overflow-hidden">
            <span class="absolute left-0 top-0 bottom-0 w-1 bg-${colors.main}"></span>
            <div class="min-w-0">
              <div class="flex items-center flex-wrap gap-2 mb-1">
                <span class="text-xs px-2 py-0.5 rounded-full bg-${colors.soft} text-${colors.main} font-medium">${sc.personaje}</span>
                ${isCompleted ? `<span class="inline-flex items-center gap-1 text-xs bg-jade text-bg px-2 py-0.5 rounded-full font-medium">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3"><path d="M20 6L9 17l-5-5"/></svg>
                    Completado
                  </span>` : ''}
              </div>
              <h2 class="font-display text-lg font-medium text-ink">${sc.title}</h2>
              <p class="text-ink-soft text-sm line-clamp-2 mt-0.5">${sc.text}</p>
            </div>
            <button class="self-start sm:self-center bg-jade text-bg text-sm px-4 py-2 rounded-lg font-medium hover:opacity-90 shrink-0">
              Practicar
            </button>
          </div>
        `;
  }).join("")}
    </div>
  `;
}

window.appNavigate = navigate;
window.appNavigateList = (catId) => navigate('list', { catId });

document.addEventListener("DOMContentLoaded", () => {
  renderApp();
  initChatbot();
});
