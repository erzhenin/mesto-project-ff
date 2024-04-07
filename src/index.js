import "./pages/index.css";
import { createCard, removeCard, likeCard } from "./components/card";
import { openModal, closeModal, closeModalClick } from "./components/modal";
import { enableValidation, clearValidation } from "./components/validation";
import {
  addCard,
  getInitialCards,
  getUserInfo,
  setUserInfo,
} from "./components/api";

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
const profileFormButton = profileForm.elements["button"];
const profileFormError = popupProfileEdit.querySelector(".popup__error");

const placeForm = document.forms["new-place"];
const placeFormName = placeForm.elements["place-name"];
const placeFormLink = placeForm.elements["link"];
const placeFormButton = placeForm.elements["button"];
const placeFromError = popupNewCard.querySelector(".popup__error");

const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

// Functions

const showError = (errorElement, errorText) => {
  errorElement.classList.add("popup__error_active");
  errorElement.textContent = errorText;
};

const hideError = (errorElement) => {
  errorElement.classList.remove("popup__error_active");
  errorElement.textContent = "";
};

const openImageModal = (cardInfo) => {
  const source = cardInfo.link;
  const alternative = cardInfo.name;

  image.src = source;
  image.alt = alternative;

  caption.textContent = alternative;

  openModal(popupImage);
};

const handleProfileFormSubmit = (event) => {
  event.preventDefault();

  profileFormButton.textContent = profileFormButton.dataset.loading;

  setUserInfo(profileFormName.value, profileFormDesc.value)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDesc.textContent = data.about;

      profileFormButton.textContent = profileFormButton.dataset.text;
      closeModal(popupProfileEdit);
    })
    .catch((err) => {
      showError(profileFormError, err);
      profileFormButton.textContent = profileFormButton.dataset.error;
    });
};

const handlePlaceFormSubmit = (event) => {
  event.preventDefault();

  placeFormButton.textContent = placeFormButton.dataset.loading;

  addCard(placeFormName.value, placeFormLink.value)
    .then((cardInfo) => {
      const newCard = createCard(
        cardTemplate,
        cardInfo,
        removeCard,
        openImageModal,
        likeCard
      );
      cardsList.prepend(newCard);

      placeForm.reset();
      placeFormButton.textContent = placeFormButton.dataset.text;

      closeModal(popupNewCard);
    })
    .catch((err) => {
      showError(placeFromError, err);
      placeFormButton.textContent = placeFormButton.dataset.error;
    });
};

// Handlers

buttonProfileEdit.addEventListener("click", () => {
  profileFormName.value = profileTitle.textContent;
  profileFormDesc.value = profileDesc.textContent;

  hideError(profileFormError);

  clearValidation(profileForm, validationConfig);

  openModal(popupProfileEdit);
});

buttonNewCard.addEventListener("click", () => {
  placeForm.reset();

  hideError(placeFromError);

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

// Retrieving initial information

getUserInfo().then((data) => {
  profileTitle.textContent = data.name;
  profileDesc.textContent = data.about;
  profileAvatar.style.backgroundImage = `url(${data.avatar})`;
});

getInitialCards().then((initialCards) => {
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
});

// Enabling validations on all forms

enableValidation(validationConfig);
