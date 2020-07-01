import config from '../config';
import { v4 as uuidv4 } from 'uuid';

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

    const id = uuidv4()
    console.log(id, text)
    
    // return fetch(`${config.API_ENDPOINT}/journalEntry`, {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json',
    //     //authorization pending
    //   },
    //   body: JSON.stringify({
    //     id: id,
    //     text: text,
    //   })
    // })
  }
}

export default {
  JournalServices,
  analyticsData,
  
}