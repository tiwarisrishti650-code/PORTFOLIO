// 1. Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// 2. Mobile menu
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menu-btn");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", false);
  })
);

// 3. Dark / light theme (remembered between visits)
const themeBtn = document.getElementById("theme-btn");
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeBtn.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  try { localStorage.setItem("theme", theme); } catch (e) {}
}
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
setTheme(saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
themeBtn.addEventListener("click", () =>
  setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark")
);

// 4. Rotating role text in the hero
const roles = ["websites", "layouts", "small apps", "ideas into code"];
let r = 0;
setInterval(() => {
  r = (r + 1) % roles.length;
  document.getElementById("role").textContent = roles[r];
}, 2200);

// 5. Skill bars fill when scrolled into view
const bars = document.querySelectorAll(".bar i");
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.level + "%";
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
bars.forEach(b => barObserver.observe(b));

// 6. Project filter
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".card");
filters.forEach(btn =>
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    cards.forEach(card => {
      const show = btn.dataset.filter === "all" || card.dataset.type === btn.dataset.filter;
      card.classList.toggle("hide", !show);
    });
  })
);

// 7. Contact form validation
const form = document.getElementById("contact-form");
const msg = document.getElementById("form-msg");
form.addEventListener("submit", e => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const text = form.message.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  msg.className = "";
  if (!name || !text) {
    msg.textContent = "Please fill in your name and message.";
    msg.className = "error";
  } else if (!emailOk) {
    msg.textContent = "Enter a valid email address, like name@example.com.";
    msg.className = "error";
  } else {
    msg.textContent = "Thanks, " + name + ". Your message is ready to send.";
    msg.className = "ok";
    form.reset();
  }
});
