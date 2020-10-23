import config from '../config'
import TokenServices from './token-services'


export const QServices = {

  getGenQuestions(token) {
    return fetch(`${config.API_ENDPOINT}/general-questions`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  postNewUserQuestions(newQuestion) {
    return fetch(`${config.API_ENDPOINT}/user-questions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenServices.getAuthToken()}`
      },
      body: JSON.stringify(newQuestion)
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  getQuestionaireUserData() {
    return fetch(`${config.API_ENDPOINT}/user-answers`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenServices.getAuthToken()}`
      }
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  getQuestionaireRelData() {
    return fetch(`${config.API_ENDPOINT}/rel-answers`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenServices.getAuthToken()}`
      }
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  getAlertsData() {
    return fetch(`${config.API_ENDPOINT}/compare-users`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenServices.getAuthToken()}`
      }
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  openingQsToSessionStorage(data) {
    window.sessionStorage.setItem(config.openingQData, data)
  },
  relQsToSessionStorage(data) {
    window.sessionStorage.setItem(config.relQData, data)
  },
  getOpeningDataFromStorage() {
    return JSON.parse(window.sessionStorage.getItem(config.openingQData))
  },
  getRelDataFromStorage() {
    return JSON.parse(window.sessionStorage.getItem(config.relQData))
  },
  clearOpeningDataFromStorage() {
    window.sessionStorage.removeItem(config.openingQData)
  },
  clearRelDataFromStorage() {
    window.sessionStorage.removeItem(config.relQData)
  },
  getTQMState(you, relationship, page) {
    const userQuestions = []
    let userData = you

    if( page === 'relationship') {
      userData = relationship
    }

    userData.map(qs => userQuestions.push(qs.question))
    const uniqueUserQuestions = userQuestions.filter((v, i, a) =>
      a.indexOf(v) === i
    )
    const userQuestionData = [] 
    uniqueUserQuestions.map(qs => userQuestionData.push(
      {
        question: qs,
        joy:[],
        disgust:[],
        sadness: [],
        anger: [],
        fear: [],
        mood: []
      }
    ))
    
    const userJoyData = []
    userData.map(data => userJoyData.push(
      {
        key: new Date(data.date_created),
        b: data.joy
      }
    ))

    if(userQuestionData.length > 0) {
      for(let i = 0; i < userQuestionData.length; i++) {
        
        for(let j = 0; j < userData.length; j++) {
          if(userQuestionData[i].question === userData[j].question) {
            userQuestionData[i].joy.push(
              {
                x: userData[j].date_created,
                y: userData[j].joy
              }
            )
            userQuestionData[i].disgust.push(
              {
                x: userData[j].date_created,
                y: userData[j].disgust
              }
            )
            userQuestionData[i].sadness.push(
              {
                x: userData[j].date_created,
                y: userData[j].sadness
              }
            )
            userQuestionData[i].anger.push(
              {
                x: userData[j].date_created,
                y: userData[j].anger
              }
            )
            userQuestionData[i].fear.push(
              {
                x: userData[j].date_created,
                y: userData[j].fear
              }
            )
            userQuestionData[i].mood.push(
              {
                x: userData[j].date_created,
                y: userData[j].mood
              }
            )
          }
        }
      }
    }

    return userQuestionData
  }
}

export const JournalServices = {

  postJournalEntry(text) {
    return fetch(`${config.API_ENDPOINT}/text-entry`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenServices.getAuthToken()}`
      },
      body: JSON.stringify(text)
      
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
      )
  },
  postFileEntry(files) {
    return fetch(`${config.API_ENDPOINT}/files`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TokenServices.getAuthToken()}`
      },
      body: files
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  submitAnswer(answer) {
    return fetch(`${config.API_ENDPOINT}/questionaire`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenServices.getAuthToken()}`
      },
      body: JSON.stringify(answer)
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  getJournalData() {
    return fetch(`${config.API_ENDPOINT}/text-entry`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TokenServices.getAuthToken()}`
      }
    })
    .then(res => 
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  getAudioData() {
    return fetch(`${config.API_ENDPOINT}/audio`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TokenServices.getAuthToken()}`
      }
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  getVideoData() {
    return fetch(`${config.API_ENDPOINT}/videos`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TokenServices.getAuthToken()}`
      }
    })
    .then(res => 
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  getImagesData() {
    return fetch(`${config.API_ENDPOINT}/images`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TokenServices.getAuthToken()}`
      }
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
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

export const ReqServices = {

  submitRelReq (relRequest) {
    return fetch(`${config.API_ENDPOINT}/user-relationship-request`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenServices.getAuthToken()}`
      },
      body: JSON.stringify(relRequest)
    })
    .then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  },
  getRelRequests() {
    return fetch(`${config.API_ENDPOINT}/user-relationship-request`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenServices.getAuthToken()}`
      }
    })
    .then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  },
  acceptRequest(approvedRel) {
    return fetch(`${config.API_ENDPOINT}/user-relationship`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenServices.getAuthToken()}`
      },
      body: JSON.stringify(approvedRel)
    })
    .then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  },
  deleteRequest() {
    return fetch(`${config.API_ENDPOINT}/user-relationship-request`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${TokenServices.getAuthToken()}`
      }
    })
    .then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  }
}

export default {
  JournalServices,
  AuthServices,
  QServices,
  ReqServices
}