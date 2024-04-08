import { apiConfig } from "./utils/constants";
import { request } from "./utils/utils";

const getUserInfo = () => {
  return request("users/me", {
    headers: {
      authorization: apiConfig.headers.authorization,
    },
  });
};

const setUserInfo = (name, about) => {
  return request("users/me", {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  });
};

const getInitialCards = () => {
  return request("cards", {
    headers: {
      authorization: apiConfig.headers.authorization,
    },
  });
};

const addCard = (name, link) => {
  return request("cards", {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  });
};

const deleteCard = (cardId) => {
  return request("cards".concat("/", cardId), {
    method: "DELETE",
    headers: {
      authorization: apiConfig.headers.authorization,
    },
  });
};

const changeLike = (cardId, method) => {
  return request("cards/likes".concat("/", cardId), {
    method: method,
    headers: {
      authorization: apiConfig.headers.authorization,
    },
  });
};

const addLike = (cardId) => {
  return changeLike(cardId, "PUT");
};

const removeLike = (cardId) => {
  return changeLike(cardId, "DELETE");
};

const setAvatar = (avatar) => {
  return request("users/me/avatar", {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar,
    }),
  });
};

const isImage = (link) => {
  return fetch(link, {}).then((res) => {
    if (res.ok) {
      return Promise.resolve(res.headers.get("content-type").includes("image"));
    }

    return Promise.reject(res.status);
  });
};

export {
  getUserInfo,
  setUserInfo,
  getInitialCards,
  addCard,
  deleteCard,
  addLike,
  removeLike,
  setAvatar,
  isImage,
};
