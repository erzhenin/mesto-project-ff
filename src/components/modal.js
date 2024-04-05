function openModal(modalElement) {
  document.addEventListener("keydown", closeModalKeyboard);

  modalElement.classList.add("popup_is-opened");
}

function closeModal(modalElement) {
  document.removeEventListener("keydown", closeModalKeyboard);

  modalElement.classList.remove("popup_is-opened");
}

function closeModalKeyboard(event) {
  if (event.key === "Escape") {
    const modalElement = document.querySelector(".popup_is-opened");
    closeModal(modalElement);
  }
}

function closeModalClick(event) {
  event.stopPropagation();
  if (
    event.target.classList.contains("popup") ||
    event.target.classList.contains("popup__close")
  ) {
    const modalElement = event.target.closest(".popup");
    closeModal(modalElement);
  }
}

export { openModal, closeModal, closeModalClick };
