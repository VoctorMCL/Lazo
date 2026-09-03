/* ============================================================
   UTILIDADES COMPARTIDAS
   ============================================================ */

/**
 * Escapa texto antes de insertarlo con innerHTML, para que lo que
 * escriben los estudiantes (o lo que devuelve la IA) nunca se
 * interprete como HTML/JS.
 */
export function esc(str) {
  const div = document.createElement("div");
  div.textContent = str === null || str === undefined ? "" : String(str);
  return div.innerHTML;
}

export function formatDateEs(isoString) {
  try {
    return new Date(isoString).toLocaleDateString("es-CO", {
      day: "numeric",
      month: "long"
    });
  } catch (e) {
    return "";
  }
}
