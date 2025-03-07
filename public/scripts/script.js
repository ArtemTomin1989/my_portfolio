document.addEventListener("mousemove", (event) => {
  let trail = document.createElement("div");
  trail.classList.add("rainbow-trail");
  document.body.appendChild(trail);

  // Встановлення позиції райдужного сліду
  trail.style.left = `${event.pageX}px`;
  trail.style.top = `${event.pageY}px`;

  // Видалення через 500 мс, щоб уникнути накопичення
  setTimeout(() => {
    trail.remove();
  }, 500);
});
