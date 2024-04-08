import "./pages/index.css";
import { createCard, removeCard, likeCard } from "./components/card";
import { openModal, closeModal, closeModalClick } from "./components/modal";
import { enableValidation, clearValidation } from "./components/validation";
import {
  addCard,
  getInitialCards,
  getUserInfo,
  isImage,
  setAvatar,
  setUserInfo,
} from "./components/api";
import { handleSubmit } from "./components/utils/utils";

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
const popupAvatar = document.querySelector(".popup_type_change-avatar");
const popupDeleteCard = document.querySelector(".popup_type_delete-card");

const popupImage = document.querySelector(".popup_type_image");
const image = popupImage.querySelector(".popup__image");
const caption = popupImage.querySelector(".popup__caption");

const popupCloseCollection = document.querySelectorAll(".popup, .popup__close");

const buttonProfileEdit = document.querySelector(".profile__edit-button");
const buttonNewCard = document.querySelector(".profile__add-button");
const buttonChangeAvatar = document.querySelector(".profile__avatar-button");

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

const avatarForm = document.forms["change-avatar"];
const avatarFormLink = avatarForm.elements["avatar"];
const avatarFormButton = avatarForm.elements["button"];
const avatarFormError = popupAvatar.querySelector(".popup__error");

const deleteCardForm = document.forms["delete-card"];
const deleteCardFormId = deleteCardForm.elements["cardid"];
const deleteCardFormButton = deleteCardForm.elements["button"];
const deleteCardFormError = popupDeleteCard.querySelector(".popup__error");

const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

// Functions

const openImageModal = (cardInfo) => {
  const source = cardInfo.link;
  const alternative = cardInfo.name;

  image.src = source;
  image.alt = alternative;

  caption.textContent = alternative;

  openModal(popupImage);
};

const openDeleteCardModal = (cardInfo) => {
  deleteCardFormId.value = cardInfo._id;

  clearValidation(deleteCardForm, validationConfig);

  openModal(popupDeleteCard);
};

function handleProfileFormSubmit(event) {
  // создаем функцию, которая возвращает промис, так как любой запрос возвращает его
  function makeRequest() {
    // return позволяет потом дальше продолжать цепочку `then, catch, finally`
    return setUserInfo(profileFormName.value, profileFormDesc.value).then(
      (userData) => {
        profileTitle.textContent = userData.name;
        profileDesc.textContent = userData.about;

        closeModal(popupProfileEdit);
      }
    );
  }
  // вызываем универсальную функцию, передавая в нее запрос, событие и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
  handleSubmit(makeRequest, event);
}

const handlePlaceFormSubmit = (event) => {
  const makeRequest = () => {
    return addCard(placeFormName.value, placeFormLink.value).then(
      (cardInfo) => {
        const newCard = createCard(
          cardTemplate,
          cardInfo,
          openDeleteCardModal,
          openImageModal,
          likeCard,
          cardInfo.owner._id
        );
        cardsList.prepend(newCard);

        closeModal(popupNewCard);
      }
    );
  };

  handleSubmit(makeRequest, event);
};

const handleAvatarFormSubmit = (event) => {
  const makeRequest = () => {
    return setAvatar(avatarFormLink.value).then((data) => {
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;

      closeModal(popupAvatar);
    });
  };

  isImage(avatarFormLink.value)
    .then((checkResult) => {
      if (checkResult) {
        handleSubmit(makeRequest, event);
      } else {
        console.log("Ссылка не является изображением!");
      }
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};

const handleDeleteFormSubmit = (event) => {
  const cardElement = document.querySelector(
    `[data-id="${deleteCardFormId.value}"]`
  );

  const makeRequest = () => {
    return removeCard(cardElement).then(() => {
      closeModal(popupDeleteCard);
    });
  };

  if (cardElement) {
    handleSubmit(makeRequest, event, "Удаление...");
  } else {
    console.log("Ошибка: Указанная карточка не найдена!");
  }
};

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

buttonChangeAvatar.addEventListener("click", () => {
  avatarForm.reset();

  clearValidation(avatarForm, validationConfig);

  openModal(popupAvatar);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

placeForm.addEventListener("submit", handlePlaceFormSubmit);

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

deleteCardForm.addEventListener("submit", handleDeleteFormSubmit);

popupCloseCollection.forEach((popup) => {
  popup.addEventListener("click", closeModalClick);
});

// Retrieving initial information

const promises = [getUserInfo(), getInitialCards()];

Promise.all(promises)
  .then((data) => {
    profileTitle.textContent = data[0].name;
    profileDesc.textContent = data[0].about;
    profileAvatar.style.backgroundImage = `url(${data[0].avatar})`;

    const userId = data[0]._id;

    data[1].forEach((card) => {
      const newCard = createCard(
        cardTemplate,
        card,
        openDeleteCardModal,
        openImageModal,
        likeCard,
        userId
      );
      cardsList.append(newCard);
    });
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

// Enabling validations on all forms

enableValidation(validationConfig);
