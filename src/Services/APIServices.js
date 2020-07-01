import config from '../config';


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






}

export const AuthServices = {

  login(credentials) {
    console.log(credentials)
  //   return fetch(`${config.API_ENDPOINT}/auth/login`, {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //      //needs bearer token auth
  //     },
  //     body: JSON.stringify(credentials)
  //   })
  //   .then(res =>
  //     (!res.ok)
  //     ? res.json().then(e => Promise.reject(e))
  //     : res.json()
  //     )
  },
  register(newUser) {
    console.log(newUser)
    // fetch(`${config.API_ENDPOINT}/register`, {
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/json' 
    //   },
    //   body: JSON.stringify(newUser)
    // })
    // .then(res =>
    //   (!res.ok)
    //   ? res.json().then(e => Promise.reject(e))
    //   : res.json()
    // )
  },

}
export default {
  JournalServices,
  analyticsData,
  AuthServices
  
}