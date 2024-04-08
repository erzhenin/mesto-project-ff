const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-10",
  headers: {
    authorization: "4988e7fc-55bd-42c1-ae9f-ec575699ec2a",
    "Content-Type": "application/json",
  },
};

const getUserInfo = () => {
  return fetch(config.baseUrl.concat("/", "users/me"), {
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

const setUserInfo = (name, about) => {
  return fetch(config.baseUrl.concat("/", "users/me"), {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

const getInitialCards = () => {
  return fetch(config.baseUrl.concat("/", "cards"), {
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

const addCard = (name, link) => {
  return fetch(config.baseUrl.concat("/", "cards"), {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

const deleteCard = (cardId) => {
  return fetch(config.baseUrl.concat("/", "cards").concat("/", cardId), {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

const changeLike = (cardId, method) => {
  return fetch(config.baseUrl.concat("/", "cards/likes").concat("/", cardId), {
    method: method,
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

const addLike = (cardId) => {
  return changeLike(cardId, "PUT");
};

const removeLike = (cardId) => {
  return changeLike(cardId, "DELETE");
};

const setAvatar = (avatar) => {
  return fetch(config.baseUrl.concat("/", "users/me/avatar"), {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
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
