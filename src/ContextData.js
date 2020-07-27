export const topics = [
  "How do you feel about your sex life?",
  "How do you feel about your relationship overall",
  "How do you feel about house work",
  "How do you feel about the finances",
]



let partner = "your partner"

export const introQuestions = [
  {
    id: 1,
    question: "How do you feel mentally, today?",
    category: "you",
  },
  {
    id: 2,
    question: "How do you feel emotionally, today?",
    category: "you",
  },
  {
    id: 3,
    question: "How do you feel physically, today?",
    category: "you",
  },
]

export const relationshipQuestions = [
  {
    id: 1,
    question: `How do you feel about your relationship with ${partner}?`,
    category: 'overall',
  },
  {
    id: 2,
    question: `How do you feel about your sex life with ${partner}?`,
    category: 'sex',
  },
  {
    id: 3,
    question: `How do you feel about your emotional connection with ${partner}?`,
    category: 'friendship',
  },
  {
    id: 4,
    question: `How do you feel about the trust between you and ${partner}?`,
    category: 'trust',
  },
  {
    id: 5,
    question: `How do you feel about the honesty between you and ${partner}?`,
    category: 'communication',
  },
  {
    id: 6,
    question: `How do you feel about the communication between you and ${partner}?`,
    category: 'communication',
  },
  {
    id: 7,
    question: `How do you feel about the compromises made between you and ${partner}?`,
    category: 'compromises',
  },
  {
    id: 8,
    question: `How do you feel about your independece?`,
    category: 'you',
  },
  {
    id: 9,
    question: `How do you feel about your partnership with ${partner}?`,
    category: 'friendship'
  },
  {
    id: 10,
    question: `How do you feel about your friendship with ${partner}?`,
    category: 'friendship'
  },
  {
    id: 11,
    question: `How do you feel about parenting with ${partner}?`,
    category: 'parenting'
  },
]

export const alerts = [
  {
    id: 1,
    category: "sex",
    alert: "You and your partner have reached a threshold. This marker was reached over a period of time and indicates disatisfaction on this topic. You should talk and attune to your partner."
  },
  {
    id: 2,
    category: "chores",
    alert: "You and your partner have reached a threshold. This marker was reached over a period of time and indicates disatisfaction on this topic. You should talk and attune to your partner."
  },
  {
    id: 3,
    category: "communication",
    alert: "You and your partner have reached a threshold. This marker was reached over a period of time and indicates disatisfaction on this topic. You should talk and attune to your partner."
  },
  {
    id: 4,
    category: "parenting",
    alert: "You and your partner have reached a threshold. This marker was reached over a period of time and indicates disatisfaction on this topic. You should talk and attune to your partner."
  },

]

export const categories = [
  'Sex',
  'Chores',
  'Communication',
  'Parenting',
  'Friendship',
  'Trust'
]

export default {
  introQuestions,
  topics,
  relationshipQuestions,
  alerts,
  categories
}