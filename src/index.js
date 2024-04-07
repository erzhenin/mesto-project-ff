import "./pages/index.css";
import { initialCards } from "./components/cards";
import { createCard, removeCard, likeCard } from "./components/card";
import { openModal, closeModal, closeModalClick } from "./components/modal";
import { enableValidation, clearValidation } from "./components/validation";

// Constant variables

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");

const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");

const popupImage = document.querySelector(".popup_type_image");
const image = popupImage.querySelector(".popup__image");
const caption = popupImage.querySelector(".popup__caption");

const popupCloseCollection = document.querySelectorAll(".popup, .popup__close");

const buttonProfileEdit = document.querySelector(".profile__edit-button");
const buttonNewCard = document.querySelector(".profile__add-button");

const profileForm = document.forms["edit-profile"];
const profileFormName = profileForm.elements["name"];
const profileFormDesc = profileForm.elements["description"];

const placeForm = document.forms["new-place"];
const placeFormName = placeForm.elements["place-name"];
const placeFormLink = placeForm.elements["link"];

const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");

// Functions

function openImageModal(cardInfo) {
  const source = cardInfo.link;
  const alternative = cardInfo.name;

  image.src = source;
  image.alt = alternative;

  caption.textContent = alternative;

  openModal(popupImage);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();

  profileTitle.textContent = profileFormName.value;
  profileDesc.textContent = profileFormDesc.value;

  closeModal(popupProfileEdit);
}

function handlePlaceFormSubmit(event) {
  event.preventDefault();

  const card = {
    name: placeFormName.value,
    link: placeFormLink.value,
  };

  const newCard = createCard(
    cardTemplate,
    card,
    removeCard,
    openImageModal,
    likeCard
  );

  placeForm.reset();

  cardsList.prepend(newCard);

  closeModal(popupNewCard);
}

// Handlers

buttonProfileEdit.addEventListener("click", () => {
  profileFormName.value = profileTitle.textContent;
  profileFormDesc.value = profileDesc.textContent;

  clearValidation(profileForm, validationConfig);

  openModal(popupProfileEdit);
});

buttonNewCard.addEventListener("click", () => {
  placeForm.reset();

  clearValidation(placeForm, validationConfig);

  openModal(popupNewCard);
});

profileForm.addEventListener("submit", (event) => {
  handleProfileFormSubmit(event);
});

placeForm.addEventListener("submit", (event) => {
  handlePlaceFormSubmit(event);
});

popupCloseCollection.forEach((popup) => {
  popup.addEventListener("click", closeModalClick);
});

// Creating initial cards

initialCards.forEach((card) => {
  const newCard = createCard(
    cardTemplate,
    card,
    removeCard,
    openImageModal,
    likeCard
  );
  cardsList.append(newCard);
});

// Enabling validations on all forms

enableValidation(validationConfig);
