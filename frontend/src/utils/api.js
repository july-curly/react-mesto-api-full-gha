class Api {
  constructor(options) {
    this._url = options.baseUrl;
    // this._headers = options.headers;
    // this._authorization = options.headers.authorization;
  }

  _checkRes(res){
    if (res.ok) {
      return res.json();
      }
    else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  getInfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._checkRes);
    }

  setInfo(data, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.username,
        about: data.aboutme
      })
    })
    .then(this._checkRes);
  }

  setAvatar(data, token) {
    return fetch(`${this._url}/users/me/avatar `, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._checkRes);
  }

  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._checkRes);
  }

  setCard(data, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.title,
        link: data.link
      })
    })
    .then(this._checkRes);
  }

  addLike(cardId, token) {
    return fetch (`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
         "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._checkRes);
  }

  deleteLike(cardId, token) {
    return fetch (`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._checkRes);
  }

  changeLikeCardStatus(cardId, isLike, token) {
    if(isLike) {
      return this.addLike(cardId, token)
    }
    return this.deleteLike(cardId, token)
  }

  deleteCard(cardId, token) {
    return fetch (`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._checkRes);
  }
}

export const api = new Api({
  baseUrl: 'https://july.nomoredomainsicu.ru',
  // headers: {
  //   authorization: '5887a0c5-56a4-4e48-bec1-f3083e2d9c60',
  //   'Content-Type': 'application/json'
  // }
});

