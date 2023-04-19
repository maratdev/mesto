export default class UserInfo{
  constructor({ nameSelector, jobSelector }) {
    this._name = nameSelector;
    this._job = jobSelector;
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
      id: this._userId
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
    this._userId = data.userId;
  }
}
