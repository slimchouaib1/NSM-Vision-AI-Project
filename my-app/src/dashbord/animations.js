import gsap from "gsap";

/* 🚀 Animation de la Sidebar */
export function animateSidebar() {
  gsap.from(".sidebar", {
    x: -200,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });
}

/* 🎯 Animation des Cartes Statistiques */
export function animateCards() {
  gsap.from(".card", {
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
  });
}

/* 📊 Animation des Tableaux */
export function animateTable() {
  gsap.from(".table tr", {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
  });
}

/* 🔥 Effet sur les Boutons */
export function animateButtons() {
  gsap.from(".btn-primary, .btn-danger", {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    stagger: 0.1,
    ease: "back.out(1.7)",
  });
}
