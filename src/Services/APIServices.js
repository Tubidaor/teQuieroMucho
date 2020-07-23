import config from '../config';
import TokenServices from './token-services';



export const analyticsData = [
  {
    id: 1,
    category: 'sex',
    trend: [
      {
        date: '05/04/2012',
        joy: '80',
        disgust: '0',
        sadness: '0',
        anger: '0',
        fear: '20',
      },
      {
        date: '05/07/2012',
        joy: '80',
        disgust: '0',
        sadness: '0',
        anger: '0',
        fear: '20',
      },
      {
        date: '05/14/2012',
        joy: '80',
        disgust: '0',
        sadness: '0',
        anger: '0',
        fear: '20',
      },
      {
        date: '05/21/2012',
        joy: '80',
        disgust: '0',
        sadness: '0',
        anger: '0',
        fear: '20',
      },
      {
        date: '05/28/2012',
        joy: '75',
        disgust: '0',
        sadness: '05',
        anger: '0',
        fear: '20',
      },
      {
        date: '06/01/2012',
        joy: '70',
        disgust: '0',
        sadness: '0',
        anger: '10',
        fear: '20',
      },
      {
        date: '06/07/2012',
        joy: '70',
        disgust: '0',
        sadness: '0',
        anger: '10',
        fear: '20',
      },
      {
        date: '06/14/2012',
        joy: '70',
        disgust: '0',
        sadness: '10',
        anger: '0',
        fear: '20',
      },
      {
        date: '06/21/2012',
        joy: '70',
        disgust: '0',
        sadness: '10',
        anger: '0',
        fear: '20',
      },
      {
        date: '06/28/2012',
        joy: '60',
        disgust: '0',
        sadness: '0',
        anger: '20',
        fear: '20',
      },
      {
        date: '07/01/2012',
        joy: '60',
        disgust: '20',
        sadness: '0',
        anger: '0',
        fear: '20',
      },
      {
        date: '07/07/2012',
        joy: '70',
        disgust: '0',
        sadness: '10',
        anger: '0',
        fear: '20',
      },
      {
        date: '07/14/2012',
        joy: '60',
        disgust: '0',
        sadness: '0',
        anger: '20',
        fear: '20',
      },
      {
        date: '07/21/2012',
        joy: '50',
        disgust: '0',
        sadness: '20',
        anger: '20',
        fear: '20',
      },
      {
        date: '07/28/2012',
        joy: '50',
        disgust: '0',
        sadness: '10',
        anger: '20',
        fear: '20',
      },
      {
        date: '08/01/2012',
        joy: '70',
        disgust: '0',
        sadness: '0',
        anger: '10',
        fear: '20',
      },
      {
        date: '08/07/2012',
        joy: '50',
        disgust: '20',
        sadness: '0',
        anger: '10',
        fear: '20',
      },
      {
        date: '08/14/2012',
        joy: '50',
        disgust: '10',
        sadness: '10',
        anger: '10',
        fear: '20',
      },
      {
        date: '08/21/2012',
        joy: '50',
        disgust: '10',
        sadness: '10',
        anger: '10',
        fear: '20',
      },
      {
        date: '08/28/2012',
        joy: '50',
        disgust: '10',
        sadness: '10',
        anger: '10',
        fear: '20',
      },
      {
        date: '09/01/2012',
        joy: '50',
        disgust: '10',
        sadness: '10',
        anger: '10',
        fear: '20',
      },
      {
        date: '09/07/2012',
        joy: '50',
        disgust: '10',
        sadness: '10',
        anger: '10',
        fear: '20',
      },
      {
        date: '09/14/2012',
        joy: '50',
        disgust: '10',
        sadness: '10',
        anger: '10',
        fear: '20',
      },
      {
        date: '09/21/2012',
        joy: '50',
        disgust: '10',
        sadness: '10',
        anger: '10',
        fear: '20',
      },
      {
        date: '09/28/2012',
        joy: '50',
        disgust: '10',
        sadness: '10',
        anger: '10',
        fear: '20',
      },
      {
        date: '10/01/2012',
        joy: '50',
        disgust: '10',
        sadness: '10',
        anger: '10',
        fear: '20',
      },
      {
        date: '10/07/2012',
        joy: '50',
        disgust: '10',
        sadness: '10',
        anger: '10',
        fear: '20',
      },


    ]
  }
]
export const QServices = {

  getGenQuestions() {
    console.log(TokenServices.getAuthToken())
    return fetch(`${config.API_ENDPOINT}/general-questions`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenServices.getAuthToken()}`
      }
    })
    .then(res => {
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    })
  },

  getUserQuestions() {
    return fetch(`${config.API_ENDPOINT}/user-questions`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenServices.getAuthToken()}`
      }
    })
    .then(res => {
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    })
  },





}
export const JournalServices = {

  postJournalEntry(text) {

    console.log(text)
    
    // return fetch(`${config.API_ENDPOINT}/journalEntry`, {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json',
    //     //authorization pending
    //   },
    //   body: JSON.stringify({
    //    text
    //   })
    // })
    // .then(res =>
    //   (!res.ok)
    //   ? res.json().then(e => Promise.reject(e))
    //   : res.json()
    //   )
  },
  postFileEntry(file) {
    //post file to server
  },
  postAudioEntry(file) {
    //post file to server
  },
  postVideoEntry(file) {
    //post file to server
  },
  submitAnswer(answer) {
    console.log(answer)
    // return fetch(`${config.API_ENDPOINT}/answer`, {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json',
    //     //authorization pending
    //   },
    //   body: JSON.stringify({answer})
    // })
    // .then(res => {
    //   (!res.ok)
    //   ? res.json().then(e => Promise.reject(e))
    //   : res.json()
    // })
  }



}

export const AuthServices = {

  login(credentials) {

    return fetch(`${config.API_ENDPOINT}/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(credentials)
    })
    .then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
      )
  },

  registerUser(newUser) {
    console.log(newUser)
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json' 
      },
      body: JSON.stringify(newUser)
    })
    .then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  },

}
export default {
  JournalServices,
  analyticsData,
  AuthServices,
  QServices
  
}