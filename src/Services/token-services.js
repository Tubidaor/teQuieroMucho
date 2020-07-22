import config from '../config';

const TokenServices = {

  saveAuthToken(token) {
    window.sessionStorage.setItem(config.TOKEN_KEY, token)
  },


}

export default TokenServices