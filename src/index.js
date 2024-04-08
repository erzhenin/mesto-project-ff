import "./pages/index.css";
import { createCard, removeCard, likeCard } from "./components/card";
import { openModal, closeModal, closeModalClick } from "./components/modal";
import { enableValidation, clearValidation } from "./components/validation";
import { addCard, getInitialCards, getUserInfo, setAvatar, setUserInfo } from "./components/api";
import { handleSubmit, imageSubmit } from "./components/utils/utils";
import * as con from "./components/utils/constants";

// Functions

const openImageModal = (cardInfo) => {
  const source = cardInfo.link;
  const alternative = cardInfo.name;

  con.image.src = source;
  con.image.alt = alternative;

  con.caption.textContent = alternative;

  openModal(con.popupImage);
};

const openDeleteCardModal = (cardInfo) => {
  con.deleteCardFormId.value = cardInfo._id;

  clearValidation(con.deleteCardForm, con.validationConfig);

  openModal(con.popupDeleteCard);
};

const cardParameters = {
  cardTemplate: con.cardTemplate,
  removeFunction: openDeleteCardModal,
  showFunction: openImageModal,
  likeFunction: likeCard,
};

const renderCard = (cardInfo, userId, method = "prepend") => {
  const cardElement = createCard(cardInfo, userId, cardParameters);

  con.cardsList[method](cardElement);
};

const handleProfileFormSubmit = (event) => {
  const makeRequest = () => {
    return setUserInfo(
      con.profileFormName.value,
      con.profileFormDesc.value
    ).then((userData) => {
      con.profileTitle.textContent = userData.name;
      con.profileDesc.textContent = userData.about;

      closeModal(con.popupProfileEdit);
    });
  };

  handleSubmit(makeRequest, event);
};

const handlePlaceFormSubmit = (event) => {
  const makeRequest = () => {
    return addCard(con.placeFormName.value, con.placeFormLink.value).then(
      (cardInfo) => {
        renderCard(cardInfo, cardInfo.owner._id);

        closeModal(con.popupNewCard);
      }
    );
  };

  imageSubmit(con.placeFormLink.value, makeRequest, event);
};

const handleAvatarFormSubmit = (event) => {
  const makeRequest = () => {
    return setAvatar(con.avatarFormLink.value).then((data) => {
      con.profileAvatar.style.backgroundImage = `url(${data.avatar})`;

      closeModal(con.popupAvatar);
    });
  };

  imageSubmit(con.avatarFormLink.value, makeRequest, event);
};

const handleDeleteFormSubmit = (event) => {
  const cardElement = document.querySelector(
    `[data-id="${con.deleteCardFormId.value}"]`
  );

  const makeRequest = () => {
    return removeCard(cardElement).then(() => {
      closeModal(con.popupDeleteCard);
    });
  };

  if (cardElement) {
    handleSubmit(makeRequest, event, "Удаление...");
  } else {
    console.log("Ошибка: Указанная карточка не найдена!");
  }
};

// Handlers

con.buttonProfileEdit.addEventListener("click", () => {
  con.profileFormName.value = con.profileTitle.textContent;
  con.profileFormDesc.value = con.profileDesc.textContent;

  clearValidation(con.profileForm, con.validationConfig);

  openModal(con.popupProfileEdit);
});

con.buttonNewCard.addEventListener("click", () => {
  clearValidation(con.placeForm, con.validationConfig);

  openModal(con.popupNewCard);
});

con.buttonChangeAvatar.addEventListener("click", () => {
  clearValidation(con.avatarForm, con.validationConfig);

  openModal(con.popupAvatar);
});

con.profileForm.addEventListener("submit", handleProfileFormSubmit);

con.placeForm.addEventListener("submit", handlePlaceFormSubmit);

con.avatarForm.addEventListener("submit", handleAvatarFormSubmit);

con.deleteCardForm.addEventListener("submit", handleDeleteFormSubmit);

con.popupCloseCollection.forEach((popup) => {
  popup.addEventListener("click", closeModalClick);
});

// Retrieving initial information

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    con.profileTitle.textContent = userData.name;
    con.profileDesc.textContent = userData.about;
    con.profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    const userId = userData._id;

    cards.forEach((cardInfo) => {
      renderCard(cardInfo, userId, "append");
    });
  })
  .catch((error) => {
    console.log(`Ошибка: ${error}`);
  });

// Enabling validations on all forms

enableValidation(con.validationConfig);
