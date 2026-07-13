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
  const footerLinks = document.querySelectorAll('.footer-links a');

  const normalize = (href) => {
    try {
      const u = new URL(href, window.location.origin);
      let p = u.pathname.replace(/\/index\.html$/, '');
      if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
      if (p === '') p = '/';
      return { path: p, hash: u.hash || '' };
    } catch (e) {
      return { path: href || '', hash: '' };
    }
  };

  const current = normalize(window.location.href);

  const allLinks = Array.from(navAnchors).concat(Array.from(footerLinks));

  allLinks.forEach((link) => {
    const href = link.getAttribute('href') || '';
    const target = normalize(href);

    const samePath = target.path === current.path;
    const isParentPath = target.path !== '/' && current.path.startsWith(target.path + '/');

    if (samePath || isParentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }

    // Also update state immediately on click so users see feedback before navigation
    link.addEventListener('click', () => {
      allLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
};

highlightActiveNav();

window.addEventListener('popstate', highlightActiveNav);
window.addEventListener('hashchange', highlightActiveNav);

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
        const text = entry.target.textContent.replace(/\+/g, "").trim();
        const target = parseInt(text, 10);
        if (Number.isFinite(target)) {
          animateCounter(entry.target, target);
          entry.target.dataset.animated = "true";
          counterObserver.unobserve(entry.target);
        } else {
          // Not a numeric stat (e.g., 'Safe spaces' or 'Community-led') — leave as-is and don't animate
          entry.target.dataset.animated = "true";
          counterObserver.unobserve(entry.target);
        }
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

