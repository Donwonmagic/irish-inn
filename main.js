// MOBILE NAV TOGGLE
const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-list");

if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("nav-list--open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

// FOOTER YEAR
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// "TONIGHT AT THE INN" DYNAMIC CONTENT
const tonightTitle = document.getElementById("tonight-title");
const tonightDesc = document.getElementById("tonight-description");
const tonightTime = document.getElementById("tonight-time");
const tonightSpecial = document.getElementById("tonight-special");

// Basic weekly schedule – customize to match reality
const weeklySchedule = {
  0: { // Sunday
    title: "Sunday Jazz in the Dining Room",
    description: "Live jazz and Sunday roast specials in our main dining room.",
    time: "4:30–7:30 PM",
    special: "Roast of the Day & Classic Irish Coffee."
  },
  1: { // Monday
    title: "Irish Inn Mates Session",
    description: "Traditional Irish tunes led by seasoned local and visiting musicians.",
    time: "7:00–10:00 PM",
    special: "Guinness & Shepherd’s Pie."
  },
  2: { // Tuesday
    title: "Trivia Night",
    description: "Bring a team and compete for bragging rights and prizes.",
    time: "7:30–9:00 PM",
    special: "Trivia Night Burger & Pint pairing."
  },
  3: { // Wednesday
    title: "House Band Wednesday",
    description: "Inn House Band playing classics and crowd favorites.",
    time: "6:00–9:00 PM",
    special: "Whiskey flight feature."
  },
  4: { // Thursday
    title: "Thursday Acoustic Sets",
    description: "Guest singer-songwriters in the pub.",
    time: "6:00–9:00 PM",
    special: "Chef’s seasonal fish special."
  },
  5: { // Friday
    title: "Friday Evenings at the Inn",
    description: "Perfect for date night or a celebratory dinner.",
    time: "Dinner service from 4:00–11:00 PM",
    special: "Classic martinis & shared starters."
  },
  6: { // Saturday
    title: "Saturday at The Irish Inn",
    description: "Brunch into dinner, with the pub lively into the night.",
    time: "Brunch from 11:00 AM · Dinner from 4:00 PM",
    special: "Full brunch menu & Irish espresso martini."
  }
};

(function setTonightBlock() {
  if (!tonightTitle || !tonightDesc || !tonightTime || !tonightSpecial) return;

  const today = new Date();
  const weekday = today.getDay(); // 0 = Sunday
  const todayConfig = weeklySchedule[weekday];

  if (!todayConfig) {
    tonightTitle.textContent = "Welcome to The Irish Inn at Glen Echo";
    tonightDesc.textContent = "Join us for dinner, drinks, and warm Irish hospitality.";
    tonightTime.textContent = "";
    tonightSpecial.textContent = "";
    return;
  }

  tonightTitle.textContent = todayConfig.title;
  tonightDesc.textContent = todayConfig.description;
  tonightTime.textContent = todayConfig.time;
  tonightSpecial.textContent = todayConfig.special;
})();

// MENU TABS (MENUS PAGE)
const menuTabs = document.querySelectorAll(".menu-tab");
const menuPanels = document.querySelectorAll(".menu-panel");

if (menuTabs.length && menuPanels.length) {
  menuTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-menu-target");

      // Activate tab
      menuTabs.forEach((t) => t.classList.remove("menu-tab--active"));
      tab.classList.add("menu-tab--active");

      // Show matching panel
      menuPanels.forEach((panel) => {
        panel.classList.toggle(
          "menu-panel--active",
          panel.id === `menu-${target}`
        );
      });

      // Reset filters to "all"
      const filterButtons = document.querySelectorAll(".menu-filter");
      filterButtons.forEach((b) => b.classList.remove("menu-filter--active"));
      const allBtn = document.querySelector('.menu-filter[data-filter="all"]');
      if (allBtn) allBtn.classList.add("menu-filter--active");

      // Show all rows in the active panel
      const activePanel = document.querySelector(".menu-panel--active");
      if (activePanel) {
        const rows = activePanel.querySelectorAll(".menu-item-row");
        rows.forEach((row) => (row.style.display = ""));
      }
    });
  });
}

// MENU FILTERS (MENUS PAGE)
const filterButtons = document.querySelectorAll(".menu-filter");

if (filterButtons.length && menuPanels.length) {
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      // Toggle active state on filter buttons
      filterButtons.forEach((b) => b.classList.remove("menu-filter--active"));
      btn.classList.add("menu-filter--active");

      // Only apply to rows in the active panel
      const activePanel = document.querySelector(".menu-panel--active");
      if (!activePanel) return;

      const rows = activePanel.querySelectorAll(".menu-item-row");
      rows.forEach((row) => {
        const tags = (row.getAttribute("data-tags") || "").toLowerCase();
        const show = filter === "all" || tags.includes(filter.toLowerCase());
        row.style.display = show ? "" : "none";
      });
    });
  });
}

// SCROLL REVEAL
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));
}
