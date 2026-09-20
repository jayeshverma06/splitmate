import { getDraft, saveDraft } from "./storage.js";

const draft = getDraft();
const participants = document.querySelector("#participants");
const dialog = document.querySelector("#person-dialog");
const form = document.querySelector("#person-form");
const methods = document.querySelectorAll(".method");
let method = draft.splitMethod || "equal";

function money(value) { return `₹${Number(value || 0).toFixed(2)}`; }
function allocations() {
  const count = draft.people.length;
  if (!count) return [];
  if (method === "exact") return draft.people.map((person) => Number(draft.allocations[person.id] || 0));
  if (method === "percentage") return draft.people.map((person) => draft.amount * Number(draft.allocations[person.id] || 0) / 100);
  if (method === "shares") {
    const totalShares = draft.people.reduce((sum, person) => sum + Number(draft.allocations[person.id] || 1), 0);
    return draft.people.map((person) => draft.amount * Number(draft.allocations[person.id] || 1) / totalShares);
  }
  return draft.people.map(() => draft.amount / count);
}
function render() {
  const values = allocations();
  document.querySelector("#people-summary").textContent = `${draft.people.length} participant${draft.people.length === 1 ? "" : "s"} splitting ${money(draft.amount)} total`;
  document.querySelector("#people-count").textContent = draft.people.length;
  participants.innerHTML = draft.people.map((person, index) => {
    const editor = method === "exact" ? `<input class="allocation-input" data-id="${person.id}" type="number" min="0" step="0.01" value="${draft.allocations[person.id] ?? values[index].toFixed(2)}" aria-label="Amount for ${person.name}">` :
      method === "percentage" ? `<input class="allocation-input" data-id="${person.id}" type="number" min="0" max="100" step="1" value="${draft.allocations[person.id] ?? (100 / draft.people.length).toFixed(0)}" aria-label="Percentage for ${person.name}"> %` :
      method === "shares" ? `<input class="allocation-input" data-id="${person.id}" type="number" min="1" step="1" value="${draft.allocations[person.id] ?? 1}" aria-label="Shares for ${person.name}"> shares` : "";
    return `<div class="participant"><span class="avatar">${person.name.slice(0, 2).toUpperCase()}</span><div class="participant-info"><strong>${person.payer ? `${person.name} (You)` : person.name}${person.payer ? " <em>PAYER</em>" : ""}</strong><small>${person.contact || "No contact added"}</small></div><div class="share-area">${editor}<b class="share">${money(values[index])}</b></div>${!person.payer ? `<button class="remove-person" data-id="${person.id}" aria-label="Remove ${person.name}">×</button>` : ""}</div>`;
  }).join("");
  const total = values.reduce((sum, value) => sum + value, 0);
  document.querySelector("#balance-message").innerHTML = `● ${Math.abs(total - draft.amount) < 0.01 ? "Split is balanced" : "Split needs adjustment"}<br><small>${money(total)} allocated across ${draft.people.length} people.</small>`;
}

methods.forEach((button) => {
  button.classList.toggle("active", button.dataset.method === method);
  button.addEventListener("click", () => {
    method = button.dataset.method;
    draft.splitMethod = method;
    if (method === "equal") draft.allocations = {};
    saveDraft({ splitMethod: method, allocations: draft.allocations });
    methods.forEach((item) => item.classList.toggle("active", item === button));
    render();
  });
});
document.querySelector(".add-person-button").addEventListener("click", () => { form.reset(); dialog.showModal(); form.elements.name.focus(); });
document.querySelector("#close-person").addEventListener("click", () => dialog.close());
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  draft.people.push({ id: crypto.randomUUID(), name: data.get("name").trim(), contact: data.get("contact").trim(), payer: false });
  saveDraft({ people: draft.people });
  dialog.close();
  render();
});
participants.addEventListener("click", (event) => {
  const id = event.target.closest(".remove-person")?.dataset.id;
  if (!id) return;
  draft.people = draft.people.filter((person) => person.id !== id);
  saveDraft({ people: draft.people });
  render();
});
participants.addEventListener("change", (event) => {
  const input = event.target.closest(".allocation-input");
  if (!input) return;
  draft.allocations[input.dataset.id] = Number(input.value);
  saveDraft({ allocations: draft.allocations });
  render();
});
document.querySelector("#continue-review").addEventListener("click", (event) => {
  if (draft.people.length < 2) { event.preventDefault(); dialog.showModal(); }
});
render();
