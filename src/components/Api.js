export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    return res.ok ? res.json() : `Error ${res.status}`;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { method: 'GET', headers: this._headers }).then(this._getResponseData);
  }

  getDataUser() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(this._getResponseData);
  }
}
