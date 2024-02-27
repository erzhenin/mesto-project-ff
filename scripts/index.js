const cardTemplate = document.querySelector("#card-template").content;

const cardsList = document.querySelector(".places__list");

function createCard(cardInfo, removeFunction) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  cardDeleteButton.addEventListener("click", (event) => removeFunction(event));
  cardTitle.textContent = cardInfo.name;

  return cardElement;
}

function removeCard(event) {
  const listItem = event.target.closest(".places__item");
  listItem.remove();
}

initialCards.forEach((card) => {
  const newCard = createCard(card, removeCard);
  cardsList.append(newCard);
});
