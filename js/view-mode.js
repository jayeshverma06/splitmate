const MODE_KEY = "splitmate-view-mode";
const root = document.documentElement;
const buttons = document.querySelectorAll("[data-view-toggle]");

function applyMode(mode) {
  root.classList.toggle("phone-mode", mode === "phone");
  buttons.forEach((button) => {
    button.textContent = mode === "phone" ? "Desktop view" : "Phone view";
    button.setAttribute("aria-label", `Switch to ${mode === "phone" ? "desktop" : "phone"} view`);
  });
}

const initialMode = localStorage.getItem(MODE_KEY) || "desktop";
applyMode(initialMode);
buttons.forEach((button) => button.addEventListener("click", () => {
  const nextMode = root.classList.contains("phone-mode") ? "desktop" : "phone";
  localStorage.setItem(MODE_KEY, nextMode);
  applyMode(nextMode);
}));
