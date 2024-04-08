// Constant variables

export const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-10",
  headers: {
    authorization: "4988e7fc-55bd-42c1-ae9f-ec575699ec2a",
    "Content-Type": "application/json",
  },
};

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

export const cardTemplate = document.querySelector("#card-template").content;
export const cardsList = document.querySelector(".places__list");

export const popupProfileEdit = document.querySelector(".popup_type_edit");
export const popupNewCard = document.querySelector(".popup_type_new-card");
export const popupAvatar = document.querySelector(".popup_type_change-avatar");
export const popupDeleteCard = document.querySelector(".popup_type_delete-card");

export const popupImage = document.querySelector(".popup_type_image");
export const image = popupImage.querySelector(".popup__image");
export const caption = popupImage.querySelector(".popup__caption");

export const popupCloseCollection = document.querySelectorAll(".popup, .popup__close");

export const buttonProfileEdit = document.querySelector(".profile__edit-button");
export const buttonNewCard = document.querySelector(".profile__add-button");
export const buttonChangeAvatar = document.querySelector(".profile__avatar-button");

export const profileForm = document.forms["edit-profile"];
export const profileFormName = profileForm.elements["name"];
export const profileFormDesc = profileForm.elements["description"];
export const profileFormButton = profileForm.elements["button"];
export const profileFormError = popupProfileEdit.querySelector(".popup__error");

export const placeForm = document.forms["new-place"];
export const placeFormName = placeForm.elements["place-name"];
export const placeFormLink = placeForm.elements["link"];
export const placeFormButton = placeForm.elements["button"];
export const placeFromError = popupNewCard.querySelector(".popup__error");

export const avatarForm = document.forms["change-avatar"];
export const avatarFormLink = avatarForm.elements["avatar"];
export const avatarFormButton = avatarForm.elements["button"];
export const avatarFormError = popupAvatar.querySelector(".popup__error");

export const deleteCardForm = document.forms["delete-card"];
export const deleteCardFormId = deleteCardForm.elements["cardid"];
export const deleteCardFormButton = deleteCardForm.elements["button"];
export const deleteCardFormError = popupDeleteCard.querySelector(".popup__error");

export const profileTitle = document.querySelector(".profile__title");
export const profileDesc = document.querySelector(".profile__description");
export const profileAvatar = document.querySelector(".profile__image");
