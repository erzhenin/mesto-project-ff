function openModal(modalElement) {
  const closeModalButton = modalElement.querySelector(".popup__close");

  document.addEventListener("keydown", closeModalKeyboard);
  closeModalButton.addEventListener("click", closeModalClick);
  modalElement.addEventListener("click", closeModalClick);

  modalElement.classList.add("popup_is-opened");
}

function closeModal(modalElement) {
  const closeModalButton = modalElement.querySelector(".popup__close");

  document.removeEventListener("keydown", closeModalKeyboard);
  closeModalButton.removeEventListener("click", closeModalClick);
  modalElement.removeEventListener("click", closeModalClick);

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

export { openModal, closeModal };
