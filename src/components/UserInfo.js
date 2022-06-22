export default class UserInfo {
  constructor({user, job, avatar}) {
    this._user = document.querySelector(user)
    this._job = document.querySelector(job)
    this._avatar = document.querySelector(avatar)
    this._id = 0
  }

  getUserInfo () {
    const userInfo = {
      user: this._user.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src,
    }
    return userInfo
  }

  /**
   * Обьект с данными пользователя для установки
   * @param {data = {data.name, data.about, data.avatar, data._id}}
   */
  setUserInfo (data) {
    this._user.textContent = data.name
    this._job.textContent = data.about
    this._avatar.src = data.avatar
    this._id = data._id
  }

  getUserID() {
    return this._id
  }
}