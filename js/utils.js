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
