import { getDraft, saveDraft } from "./storage.js";

const amountOutput = document.querySelector("#amount-output");
const totalLabel = document.querySelector("#total-label");
const footerTotal = document.querySelector("#footer-total");
const nameInput = document.querySelector("#bill-name");
const keypad = document.querySelector("#keypad");
const nextLink = document.querySelector("#next-people");
let amount = String(getDraft().amount || "");

function money(value) { return `₹${Number(value || 0).toLocaleString("en-IN")}`; }
function render() {
  const value = Number(amount || 0);
  amountOutput.textContent = value.toLocaleString("en-IN");
  totalLabel.textContent = money(value);
  footerTotal.textContent = money(value);
  saveDraft({ name: nameInput.value.trim(), amount: value });
}

keypad.addEventListener("click", (event) => {
  const key = event.target.closest("button")?.dataset.key;
  if (!key) return;
  if (key === "backspace") amount = amount.slice(0, -1);
  else if (key === "." && !amount.includes(".")) amount += key;
  else if (/^\d$/.test(key)) amount = amount === "0" ? key : amount + key;
  render();
});

nameInput.value = getDraft().name;
nameInput.addEventListener("input", render);
document.querySelectorAll(".category").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll(".category").forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  saveDraft({ category: button.dataset.category });
}));
nextLink.addEventListener("click", (event) => {
  if (!getDraft().name || !getDraft().amount) {
    event.preventDefault();
    nameInput.reportValidity();
    nameInput.focus();
  }
});
render();
