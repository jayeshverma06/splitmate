import { getBills } from "./storage.js";

const list = document.querySelector("#history-list");
const empty = document.querySelector("#history-empty");
const money = (value) => `₹${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
let filter = "all";

function peopleCount(bill) {
  return Array.isArray(bill.people) ? bill.people.length : Number(bill.people || 0);
}

function render() {
  const bills = getBills().filter((bill) => filter === "all" || (filter === "pending" ? bill.status !== "Settled" : bill.status === "Settled"));
  empty.hidden = bills.length > 0;
  list.hidden = bills.length === 0;
  list.innerHTML = bills.map((bill) => `<article class="history-card"><div class="history-icon">${bill.icon || "▣"}</div><div class="history-card-main"><div class="history-card-top"><h3>${bill.name || "Untitled bill"}</h3><strong>${money(bill.amount)}</strong></div><p>${bill.category || "Bill"} · ${peopleCount(bill)} ${peopleCount(bill) === 1 ? "person" : "people"} · ${bill.date || "Recently"}</p><span class="bill-tag">${bill.tag || "Split created"}</span></div><span class="history-status ${bill.status === "Settled" ? "settled" : "pending"}">${bill.status || "Pending"}</span></article>`).join("");
}

document.querySelectorAll(".history-filter").forEach((button) => button.addEventListener("click", () => {
  filter = button.dataset.filter;
  document.querySelectorAll(".history-filter").forEach((item) => item.classList.toggle("active", item === button));
  render();
}));
render();
