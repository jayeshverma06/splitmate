const BILLS_KEY = "splitmate-bills";
const DRAFT_KEY = "splitmate-draft";

export const emptyDraft = () => ({
  name: "",
  amount: 0,
  category: "Dining",
  splitMethod: "equal",
  allocations: {},
  people: [{ id: crypto.randomUUID(), name: "You", contact: "", payer: true }]
});

export function getDraft() {
  try {
    const saved = JSON.parse(localStorage.getItem(DRAFT_KEY));
    return saved ? { ...emptyDraft(), ...saved, people: saved.people?.length ? saved.people : emptyDraft().people } : emptyDraft();
  } catch {
    return emptyDraft();
  }
}

export function saveDraft(changes = {}) {
  const draft = { ...getDraft(), ...changes };
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  return draft;
}

export function clearDraft() {
  localStorage.removeItem(DRAFT_KEY);
}

export function getBills() {
  try {
    return JSON.parse(localStorage.getItem(BILLS_KEY)) || [];
  } catch {
    return [];
  }
}

export function addBill(bill) {
  const bills = [bill, ...getBills()];
  localStorage.setItem(BILLS_KEY, JSON.stringify(bills));
  clearDraft();
  return bills;
}
