import { addLike, deleteCard, removeLike } from "./api";

const createCard = (
  cardTemplate,
  cardInfo,
  removeFunction,
  showFunction,
  likeFunction,
  isLiked
) => {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.dataset.id = cardInfo._id;

  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");

  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  cardTitle.textContent = cardInfo.name;
  cardLikeCounter.textContent = cardInfo.likes.length;

  if (isLiked) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardImage.addEventListener("click", () => showFunction(cardInfo));
  cardLikeButton.addEventListener("click", () =>
    likeFunction(cardLikeButton, cardLikeCounter, cardInfo)
  );

  if (removeFunction) {
    cardDeleteButton.addEventListener("click", () => {
      removeFunction(cardInfo);
    });
  } else {
    cardDeleteButton.classList.add("card__delete-button_inactive");
  }

  return cardElement;
};

const likeCard = (cardLikeButton, cardLikeCounter, cardInfo) => {
  if (cardLikeButton.classList.contains("card__like-button_is-active")) {
    removeLike(cardInfo._id)
      .then((data) => {
        cardLikeCounter.textContent = data.likes.length;
        cardLikeButton.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  } else {
    addLike(cardInfo._id)
      .then((data) => {
        cardLikeCounter.textContent = data.likes.length;
        cardLikeButton.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
};

const removeCard = (cardElement, cardId) => {
  return deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};

export { createCard, likeCard, removeCard };
