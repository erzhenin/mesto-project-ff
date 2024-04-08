const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-10",
  headers: {
    authorization: "4988e7fc-55bd-42c1-ae9f-ec575699ec2a",
    "Content-Type": "application/json",
  },
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

const request = (endpoint, options) => {
  return fetch(apiConfig.baseUrl.concat("/", endpoint), options).then(
    checkResponse
  );
};

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
