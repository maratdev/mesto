export default class UserInfo{
  constructor({ nameSelector, jobSelector }) {
    this._name = nameSelector;
    this._job = jobSelector;
    this._avatar = document.querySelector(".profile__avatar");
  }
  getUserInfo() {
    return {
      user_name: this._name.textContent,
      user_job: this._job.textContent,
      id: this._userId
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
    this._userId = data.userId;
  }

  setUserAvatar(profileAvatar) {
    //console.log(profileAvatar);
    this._avatar.src = profileAvatar;
  }
}
