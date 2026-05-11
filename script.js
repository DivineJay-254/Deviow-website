const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const chatToggle = document.querySelector(".chat-toggle");
const chatPanel = document.querySelector(".chat-panel");
const chatClose = document.querySelector(".chat-close");
const quickReplies = document.querySelectorAll(".quick-reply");
const WHATSAPP_NUMBER = "254788559307";

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks?.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navAnchors.forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks?.classList.contains("open")) {
      navLinks.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
    }
  });
});

const highlightActiveNav = () => {
  const current = window.location.pathname.split("/").filter(Boolean).pop() || "index.html";
  navAnchors.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    if (href === current || (href === "index.html" && current === "")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
};

highlightActiveNav();

chatToggle?.addEventListener("click", () => {
  const isOpen = chatPanel?.classList.toggle("open");
  chatToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  chatPanel?.setAttribute("aria-hidden", String(!isOpen));
});

chatClose?.addEventListener("click", () => {
  chatPanel?.classList.remove("open");
  chatPanel?.setAttribute("aria-hidden", "true");
  chatToggle?.setAttribute("aria-expanded", "false");
});

quickReplies.forEach((button) => {
  button.addEventListener("click", () => {
    const message = encodeURIComponent(button.dataset.message ?? "");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  });
});

