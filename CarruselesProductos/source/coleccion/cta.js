const bytes = Uint8Array.from(
  atob(new URLSearchParams(window.location.search).get('payload')),
  (character) => character.charCodeAt(0),
);
const carousel = JSON.parse(new TextDecoder().decode(bytes));
document.querySelector('#cta').style.setProperty('--accent', carousel.accent);
