export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    return res.ok ? res.json() : `Error ${res.status}`;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(this._getResponseData);
  }

  getDataUser() {
    return fetch(`${this._baseUrl}/users/me`, {headers: this._headers }).then(this._getResponseData);
  }

  saveDataInfo(profileInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: profileInfo.user_name,
        about: profileInfo.user_job
      })
    })
      .then(this._getResponseData);
  }


  saveCardInfo(cardInfo) {
    console.log('API:' + cardInfo)
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: cardInfo.card_name,
        link: cardInfo.card_src
      })
    })
      .then(this._getResponseData);
  }

  getLikes() {
    return fetch(`${this._baseUrl}/likes`, { headers: this._headers }).then(this._getResponseData);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(this._getResponseData);
  }

}
