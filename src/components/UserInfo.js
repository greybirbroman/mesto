export default class UserInfo {
  constructor({user, job}) {
    this._user = document.querySelector(user)
    this._job = document.querySelector(job)
  }

  getUserInfo () {
    return {
      user: this._user.textContent,
      job: this._job.textContent,
    }
  }
  setUserInfo ({user, job}) {
    this._user.textContent = user
    this._job.textContent = job
  }
}