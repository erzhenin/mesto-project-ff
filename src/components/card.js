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
  cardImage.addEventListener("click", showFunction);
  cardDeleteButton.addEventListener("click", removeFunction);
  cardLikeButton.addEventListener("click", likeFunction);
  cardTitle.textContent = cardInfo.name;

  return cardElement;
}

function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

function removeCard(event) {
  const listItem = event.target.closest(".places__item");
  listItem.remove();
}

export { createCard, likeCard, removeCard };
