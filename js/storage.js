const KEY = "splitmate-bills";
const defaults = [
  { name: "Dinner at Social", people: 5, date: "Today", amount: 2450, tag: "You paid ₹490", status: "Settled", icon: "🍴" },
  { name: "Goa Trip Airbnb & Cab", people: 4, date: "Yesterday", amount: 8450, tag: "Your share ₹2,120", status: "2 pending", icon: "✈" },
  { name: "Weekend Groceries & Snacks", people: 3, date: "18 Sep", amount: 1280, tag: "You are owed ₹426", status: "Settled", icon: "♧" }
];
export function getBills() {
  const saved = localStorage.getItem(KEY);
  if (!saved) return defaults;
  try { return JSON.parse(saved); } catch { return defaults; }
}
export function addBill(bill) {
  const bills = [bill, ...getBills()];
  localStorage.setItem(KEY, JSON.stringify(bills));
  return bills;
}