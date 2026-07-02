/* ═══════════════════════════════════════
   UNIVERSAL STUDENT HUB — main.js
   Shared logic: nav, theme, modal, toast
═══════════════════════════════════════ */

/* ── TOAST (defined first — used by inline onclick handlers) ── */
function toast(msg, color) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.style.background = color || "#10b981";
  t.classList.add("show");
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove("show"), 2600);
}
window.toast = toast;

/* ── ACTIVE NAV LINK ── */
(function () {
  const raw = location.pathname.split("/").pop();
  // empty string = root / index
  const page = raw === "" || raw === "/" ? "index.html" : raw;
  document.querySelectorAll(".nav-btn[data-page]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.page === page);
  });
})();

/* ── HAMBURGER ── */
document
  .getElementById("hamburger")
  .addEventListener("click", () =>
    document.getElementById("nav-links").classList.toggle("open"),
  );

/* ── DARK / LIGHT THEME ── */
const themeBtn = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("ush-theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);
themeBtn.textContent = savedTheme === "dark" ? "🌙" : "☀️";

themeBtn.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const next = isDark ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  themeBtn.textContent = next === "dark" ? "🌙" : "☀️";
  localStorage.setItem("ush-theme", next);
  toast(next === "dark" ? "Dark mode 🌙" : "Light mode ☀️", "#7c3aed");
});

/* ── LOGIN MODAL ── */
function openModal(tab) {
  document.getElementById("modal-overlay").classList.add("open");
  activateTab(tab || "login");
}
function closeModal() {
  document.getElementById("modal-overlay").classList.remove("open");
}
function activateTab(name) {
  document
    .querySelectorAll(".modal-tab")
    .forEach((t, i) =>
      t.classList.toggle("active", ["login", "signup"][i] === name),
    );
  const mb = document.getElementById("modal-body");
  if (name === "login") {
    mb.innerHTML = `
      <label>Email</label>
      <input type="email" id="m-email" placeholder="you@university.edu"/>
      <label>Password</label>
      <input type="password" id="m-pass" placeholder="••••••••"/>
      <button class="btn-submit" onclick="doLogin()">Login →</button>`;
  } else {
    mb.innerHTML = `
      <label>Full Name</label>
      <input type="text" id="m-name" placeholder="Your Name"/>
      <label>Email</label>
      <input type="email" id="m-email2" placeholder="you@university.edu"/>
      <label>Password</label>
      <input type="password" id="m-pass2" placeholder="Create password"/>
      <button class="btn-submit" onclick="doSignup()">Create Account →</button>`;
  }
}
function doLogin() {
  const e = document.getElementById("m-email").value;
  if (!e) {
    toast("Please enter your email", "#ef4444");
    return;
  }
  closeModal();
  toast("Welcome back! 🎉", "#10b981");
  document.getElementById("open-login").textContent = e.split("@")[0] + " ✓";
}
function doSignup() {
  const n = document.getElementById("m-name").value;
  if (!n) {
    toast("Please enter your name", "#ef4444");
    return;
  }
  closeModal();
  toast("Welcome, " + n + " 🎓", "#10b981");
  document.getElementById("open-login").textContent = n.split(" ")[0] + " ✓";
}

document
  .getElementById("open-login")
  .addEventListener("click", () => openModal("login"));
document.getElementById("modal-close").addEventListener("click", closeModal);
document.getElementById("modal-overlay").addEventListener("click", (e) => {
  if (e.target === document.getElementById("modal-overlay")) closeModal();
});
document
  .querySelectorAll(".modal-tab")
  .forEach((t, i) =>
    t.addEventListener("click", () => activateTab(["login", "signup"][i])),
  );
activateTab("login");

window.openModal = openModal;
window.closeModal = closeModal;
window.doLogin = doLogin;
window.doSignup = doSignup;
