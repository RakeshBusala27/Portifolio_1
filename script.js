
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".navigation");

// Mobile navigation
if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
  });

  // Close the menu after clicking a navigation link
  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
      menuButton.textContent = "☰";
    });
  });
}

// Project filtering
const filterButtons = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;

    // Update the active filter button
    filterButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    // Show projects matching the selected category
    projectCards.forEach((card) => {
      const showCard =
        category === "all" ||
        card.dataset.category === category;

      card.classList.toggle("hidden", !showCard);
    });
  });
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches ? "auto" : "smooth"
    });

    // Update the browser URL
    history.replaceState(null, "", targetId);
  });
});

// Automatically update the footer year
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}
