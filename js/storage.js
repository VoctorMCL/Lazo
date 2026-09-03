/* ============================================================
   PROGRESO (localStorage)
   ------------------------------------------------------------
   Guarda el progreso únicamente en este navegador/dispositivo,
   igual que se explica en el modal de privacidad de la app.
   ============================================================ */

const KEY = "lazo:progreso";

export function getProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error("No se pudo leer el progreso:", e);
    return {};
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(progress));
    return true;
  } catch (e) {
    console.error("No se pudo guardar el progreso:", e);
    return false;
  }
}

export function resetProgress() {
  return saveProgress({});
}
