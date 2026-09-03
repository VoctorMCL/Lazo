/* ============================================================
   APLICACIÓN PRINCIPAL (Enrutamiento y Vistas)
   ============================================================ */
import { CATEGORIES, SCENARIOS, catOf } from './data.js';
import { getProgress, resetProgress } from './storage.js';
import { esc } from './utils.js';
import { initSimulator, renderChatView } from './simulator.js';
import { initChatbot } from './chatbot.js';

let currentView = "home"; // "home" | "list" | "chat"
let selectedCatId = null;
let activeScenarioId = null;

export function navigate(view, params = {}) {
  currentView = view;
  if (params.catId !== undefined) selectedCatId = params.catId;
  if (params.scenarioId !== undefined) {
    activeScenarioId = params.scenarioId;
    if (activeScenarioId) initSimulator(activeScenarioId);
  }
  renderApp();
  window.scrollTo(0, 0);
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
    <header class="mb-10 text-center">
      <h1 class="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-ink mb-3">
        Lazo
      </h1>
      <p class="max-w-xl mx-auto text-ink-soft text-base sm:text-lg">
        Practica cómo manejar desacuerdos y situaciones difíciles conversando con personajes, aplicando escucha activa y mediación.
      </p>
    </header>

    <!-- Barra de progreso general -->
    <section class="bg-surface border border-line rounded-xl p-5 mb-8 shadow-sm">
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm font-semibold text-ink">Progreso general</span>
        <span class="text-sm text-ink-soft">${completedCount} de ${totalScenarios} completados (${pct}%)</span>
      </div>
      <div class="w-full bg-line rounded-full h-2.5 overflow-hidden">
        <div class="bg-jade h-2.5 rounded-full transition-all duration-500" style="width: ${pct}%"></div>
      </div>
    </section>

    <!-- Listado de Categorías -->
    <section class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      ${CATEGORIES.map(cat => {
    const catScenarios = SCENARIOS.filter(s => s.catId === cat.id);
    const catCompleted = catScenarios.filter(s => progress[s.id]?.completed).length;
    return `
          <div onclick="window.appNavigateList('${cat.id}')" 
               class="bg-surface border border-line hover:border-jade p-5 rounded-xl cursor-pointer transition-all hover:shadow-md flex flex-col justify-between group">
            <div>
              <div class="text-xs uppercase font-semibold text-jade mb-1">${catScenarios.length} situaciones</div>
              <h2 class="font-display text-xl font-medium text-ink group-hover:text-jade transition-colors">
                ${cat.label}
              </h2>
            </div>
            <div class="mt-4 flex items-center justify-between text-xs text-ink-soft">
              <span>${catCompleted}/${catScenarios.length} completados</span>
              <span class="font-medium text-jade group-hover:translate-x-1 transition-transform">Explorar →</span>
            </div>
          </div>
        `;
  }).join("")}
    </section>
  `;
}

function renderList() {
  const cat = catOf(selectedCatId);
  const scenarios = SCENARIOS.filter(s => s.catId === selectedCatId);
  const progress = getProgress();

  return `
    <div class="mb-6">
      <button onclick="window.appNavigate('home')" class="text-xs font-semibold text-jade hover:underline mb-3 inline-block">
        ← Volver a categorías
      </button>
      <h1 class="font-display text-3xl font-semibold text-ink">${cat.label}</h1>
      <p class="text-ink-soft text-sm mt-1">Elige una situación para iniciar la simulación de diálogo.</p>
    </div>

    <div class="space-y-4">
      ${scenarios.map(sc => {
    const isCompleted = progress[sc.id]?.completed;
    return `
          <div onclick="window.appNavigate('chat', { scenarioId: '${sc.id}' })"
               class="bg-surface border ${isCompleted ? 'border-jade bg-jade-soft/10' : 'border-line'} hover:border-jade p-5 rounded-xl cursor-pointer transition-all hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs px-2 py-0.5 rounded bg-surface border border-line font-medium text-ink-soft">Personaje: ${sc.personaje}</span>
                ${isCompleted ? '<span class="text-xs bg-jade text-white px-2 py-0.5 rounded font-medium">Completado</span>' : ''}
              </div>
              <h2 class="font-display text-lg font-medium text-ink">${sc.title}</h2>
              <p class="text-ink-soft text-sm line-clamp-2 mt-1">${sc.text}</p>
            </div>
            <button class="self-start sm:self-center bg-jade text-white text-sm px-4 py-2 rounded-lg font-medium hover:opacity-90 shrink-0">
              Practicar
            </button>
          </div>
        `;
  }).join("")}
    </div>
  `;
}

// Exponer funciones globales para que funcionen los onclick del HTML generado
window.appNavigate = navigate;
window.appNavigateList = (catId) => navigate('list', { catId });

// Inicializar la app al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  renderApp();
  initChatbot();   // <--- Añade esta línea
});