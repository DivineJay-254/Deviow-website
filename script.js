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

// Counter animation for statistics
const animateCounter = (element, target) => {
  let current = 0;
  const increment = target / 60;
  const interval = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + (element.textContent.includes("+") ? "+" : "");
      clearInterval(interval);
    } else {
      element.textContent = Math.floor(current) + (element.textContent.includes("+") ? "+" : "");
    }
  }, 30);
};

const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px"
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      const text = entry.target.textContent.replace(/\+/g, "");
      const target = parseInt(text);
      animateCounter(entry.target, target);
      entry.target.dataset.animated = "true";
      counterObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

const statNumbers = document.querySelectorAll(".stat-number");
statNumbers.forEach((stat) => {
  counterObserver.observe(stat);
});

// Image slide-in animation
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "slideIn 0.6s ease-out forwards";
      imageObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll("img, .gallery-item, .media-card").forEach((img) => {
  imageObserver.observe(img);
});

