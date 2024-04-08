import { isImage } from "../api";
import { apiConfig } from "./constants";

// Submit functions

export function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText
  } else {
    button.textContent = buttonText
  }
}

export function handleSubmit(request, evt, loadingText = "Сохранение...") {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;

  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      evt.target.reset();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}

export function imageSubmit(link, request, event) {
  isImage(link).then((checkResult) => {
    if (checkResult) {
      handleSubmit(request, event);
    } else {
      console.log("Ссылка не является изображением!");
    }
  })
  .catch((error) => {
    console.log(`Ошибка: ${error}`);
  });
}


// API functions

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

export const request = (endpoint, options) => {
  return fetch(apiConfig.baseUrl.concat("/", endpoint), options).then(
    checkResponse
  );
};
