import "./pages/index.css";
import { initialCards } from "./components/cards";
import { createCard, removeCard, likeCard } from "./components/card";
import { openModal, closeModal } from "./components/modal";

// Constant variables

const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");

const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");

const buttonProfileEdit = document.querySelector(".profile__edit-button");
const buttonNewCard = document.querySelector(".profile__add-button");

const profileForm = document.forms["edit-profile"];
const placeForm = document.forms["new-place"];

const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");

// Functions

function openImageModal(event) {
  const source = event.target.src;
  const alternative = event.target.alt;

  const popupImage = document.querySelector(".popup_type_image");
  const image = popupImage.querySelector(".popup__image");
  const caption = popupImage.querySelector(".popup__caption");

  image.src = source;
  image.alt = alternative;

  caption.textContent = alternative;

  openModal(popupImage);
}

function handleProfileFormSubmit(
  event,
  profileTitle,
  profileDesc,
  popupProfileEdit
) {
  event.preventDefault();

  const form = event.target;

  const name = form.elements["name"].value;
  const desc = form.elements["description"].value;

  profileTitle.textContent = name;
  profileDesc.textContent = desc;

  closeModal(popupProfileEdit);
}

function handlePlaceFormSubmit(event, cardsList, popupNewCard) {
  event.preventDefault();

  const form = event.target;

  const name = form.elements["place-name"].value;
  const link = form.elements["link"].value;

  const card = {
    name,
    link,
  };

  const newCard = createCard(
    cardTemplate,
    card,
    removeCard,
    openImageModal,
    likeCard
  );

  cardsList.prepend(newCard);

  form.reset();

  closeModal(popupNewCard);
}

// Handlers

buttonProfileEdit.addEventListener("click", () => {
  profileForm.elements["name"].value = profileTitle.textContent;
  profileForm.elements["description"].value = profileDesc.textContent;

  openModal(popupProfileEdit);
});

buttonNewCard.addEventListener("click", () => {
  openModal(popupNewCard);
});

profileForm.addEventListener("submit", (event) => {
  handleProfileFormSubmit(event, profileTitle, profileDesc, popupProfileEdit);
});

placeForm.addEventListener("submit", (event) => {
  handlePlaceFormSubmit(event, cardsList, popupNewCard);
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
