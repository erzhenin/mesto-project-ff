function createCard(
  cardTemplate,
  cardInfo,
  removeFunction,
  showFunction,
  likeFunction
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  cardImage.addEventListener("click", () => showFunction(cardInfo));
  cardDeleteButton.addEventListener("click", () => removeFunction(cardElement));
  cardLikeButton.addEventListener("click", () => likeFunction(cardLikeButton));
  cardTitle.textContent = cardInfo.name;

  return cardElement;
}

function likeCard(cardLikeButton) {
  cardLikeButton.classList.toggle("card__like-button_is-active");
}

function removeCard(cardElement) {
  cardElement.remove();
}

export { createCard, likeCard, removeCard };
