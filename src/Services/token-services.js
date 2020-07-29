import config from '../config';

const TokenServices = {

  saveAuthToken(token) {
    window.sessionStorage.setItem(config.TOKEN_KEY, token)
  },

  getAuthToken() {
    console.log(window.sessionStorage.getItem(config.TOKEN_KEY))
    return window.sessionStorage.getItem(config.TOKEN_KEY)
  },

  clearAuthToken() {
    window.sessionStorage.removeItem(config.TOKEN_KEY)
  }

}

export default TokenServices