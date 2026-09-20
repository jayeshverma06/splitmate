const onPagesPath = window.location.pathname.includes("/pages/");
const root = onPagesPath ? "../" : "";
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const activePage = currentPage === "bill-details.html" ? "history"
  : currentPage === "profile.html" ? "profile"
    : currentPage === "index.html" ? "home" : "";

const navigation = document.querySelector("[data-navbar]");

if (navigation) {
  navigation.className = "bottom-nav";
  navigation.setAttribute("aria-label", "Main navigation");
  navigation.innerHTML = `
    <a class="${activePage === "home" ? "active" : ""}" href="${root}index.html" data-tab="home"><span>⌂ </span>Home</a>
    <a class="${activePage === "history" ? "active" : ""}" href="${root}pages/bill-details.html" data-tab="history"><span>◔ </span>History</a>
    <a class="${activePage === "profile" ? "active" : ""}" href="${root}pages/profile.html" data-tab="groups"><span>♧ </span>Groups</a>
    <a class="${activePage === "profile" ? "active" : ""}" href="${root}pages/profile.html" data-tab="settings"><span>⚙ </span>Settings</a>
  `;
}
