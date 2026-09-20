const output = document.querySelector("#amount-output");
const total = document.querySelector("#total-label");
const footer = document.querySelector("#footer-total");
const nameInput = document.querySelector("#bill-name");
const keypad = document.querySelector("#keypad");
let amount = "2380";
function renderAmount() {
  const formatted = Number(amount || 0).toLocaleString("en-IN");
  output.textContent = formatted;
  total.textContent = `₹${formatted}`;
  footer.textContent = `₹${formatted}`;
  localStorage.setItem("splitmate-draft", JSON.stringify({ name: nameInput.value, amount: Number(amount) }));
}
keypad?.addEventListener("click", (event) => {
  const key = event.target.closest("button")?.textContent;
  if (!key) return;
  if (key === "⌫") amount = amount.slice(0, -1) || "0";
  else if (key === "." && !amount.includes(".")) amount += key;
  else if (key !== ".") amount = amount === "0" ? key : amount + key;
  renderAmount();
});
nameInput?.addEventListener("input", renderAmount);
document.querySelectorAll(".category").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll(".category").forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
}));
renderAmount();