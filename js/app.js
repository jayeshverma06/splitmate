import { addBill, getBills } from "./storage.js";
const billList = document.querySelector("#bill-list");
const dialog = document.querySelector("#bill-dialog");
const form = document.querySelector("#bill-form");
const toast = document.querySelector("#toast");
function money(value) { return `₹${Number(value).toLocaleString("en-IN")}`; }
function renderBills(bills = getBills()) {
  billList.innerHTML = bills.slice(0, 3).map((bill) => `<article class="bill-card"><span class="bill-icon">${bill.icon || "▣"}</span><div class="bill-info"><strong>${bill.name}</strong><small>${bill.people} people · ${bill.date}</small><span class="bill-tag">${bill.tag}</span></div><div class="bill-amount"><strong>${money(bill.amount)}</strong><small class="${bill.status !== "Settled" ? "pending" : ""}">● ${bill.status}</small></div></article>`).join("");
}
function showToast(message) { toast.textContent = message; toast.classList.add("show"); window.setTimeout(() => toast.classList.remove("show"), 2200); }
function openBillDialog() { dialog.showModal(); form.elements.name.focus(); }
document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "new-bill") openBillDialog();
  if (action === "close-dialog") dialog.close();
  if (action === "scan") showToast("Receipt scanner is ready for your next bill.");
  if (action === "settle") showToast("Your settlement reminders are up to date.");
  if (action === "customize") showToast("Choose your favourite pals to split with.");
  if (action === "add-friend") showToast("Friend invites are coming soon.");
  if (action === "see-all") showToast("Showing your most recent bills.");
  const tab = event.target.closest("[data-tab]");
  if (tab) { document.querySelectorAll("[data-tab]").forEach((button) => button.classList.remove("active")); tab.classList.add("active"); if (tab.dataset.tab !== "home") showToast(`${tab.textContent.trim()} is coming soon.`); }
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form); const amount = Number(data.get("amount")); const people = Number(data.get("people"));
  addBill({ name: data.get("name"), amount, people, date: "Just now", tag: `Your share ${money(amount / people)}`, status: "1 pending", icon: "▣" });
  renderBills(); dialog.close(); form.reset(); form.elements.people.value = 2; showToast("Bill created successfully.");
});
renderBills();