import { addBill, getDraft } from "./storage.js";

const draft = getDraft();
const money = (value) => `₹${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
const share = draft.amount / Math.max(draft.people.length, 1);

document.querySelector("#review-name").textContent = draft.name || "Untitled bill";
document.querySelector("#review-category").textContent = draft.category;
document.querySelector("#review-total").textContent = money(draft.amount);
document.querySelector("#receipt-name").textContent = draft.name || "Untitled bill";
document.querySelector("#receipt-date").textContent = new Date().toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
document.querySelector("#receipt-subtotal").textContent = money(draft.amount);
document.querySelector("#receipt-total").textContent = money(draft.amount);
document.querySelector("#breakdown-title").textContent = `SPLIT BREAKDOWN (${draft.people.length} PEOPLE)`;
document.querySelector("#average-share").textContent = money(share);
document.querySelector("#review-participants").innerHTML = draft.people.map((person) => `<div class="participant"><span class="avatar">${person.name.slice(0, 2).toUpperCase()}</span><div class="participant-info"><strong>${person.name}${person.payer ? " (You)" : ""}</strong><small>${person.payer ? "Settled · Payer" : "Payment pending"}</small></div><b class="share">${money(share)}</b></div>`).join("");

document.querySelectorAll(".share-choice").forEach((button) => button.addEventListener("click", async () => {
  if (button.dataset.share === "Copy link") {
    await navigator.clipboard?.writeText(location.href);
  }
  document.querySelector("#review-status").textContent = `${button.dataset.share} selected.`;
}));
document.querySelector("#confirm-bill").addEventListener("click", () => {
  addBill({ ...draft, date: new Date().toLocaleDateString(), status: "Pending", tag: `Your share ${money(share)}`, icon: "▣" });
  document.querySelector("#confirm-bill").textContent = "Bill split successfully ✓";
  document.querySelector("#confirm-bill").disabled = true;
  document.querySelector("#review-status").textContent = "Saved to your recent bills.";
});
