const KEY = "lazo:progreso";

function storageIsAvailable() {
  try {
    const testKey = "__lazo_test__";
    localStorage.setItem(testKey, "1");
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

const hasStorage = storageIsAvailable();
let memoryFallback = {};

if (!hasStorage) {
  console.warn("localStorage no está disponible en este navegador: el progreso no se guardará entre sesiones.");
}

export function getProgress() {
  if (!hasStorage) return memoryFallback;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error("No se pudo leer el progreso:", e);
    return {};
  }
}

export function saveProgress(progress) {
  if (!hasStorage) {
    memoryFallback = progress;
    return false;
  }
  try {
    localStorage.setItem(KEY, JSON.stringify(progress));
    return true;
  } catch (e) {
    console.error("No se pudo guardar el progreso:", e);
    return false;
  }
}

export function resetProgress() {
  memoryFallback = {};
  return saveProgress({});
}
