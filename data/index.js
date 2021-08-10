// must be in rgba fromat
export const graphColors = [
  "rgba(162, 207, 110, 1)",
  "rgba(255, 99, 132, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(131, 75, 255, 1)",
  "rgba(51, 191, 255, 1)",
  "rgba(255, 159, 64, 1)"
]

export const fakeToDos = [
  {
    title: 'Upload Notes',
    message: 'You forgot to upload notes for the meeting at 2021-06-28 14:00.',
    date: new Date(2021, 6, 28)
  },
  {
    title: 'Upload Notes',
    message: 'You forgot to upload notes for the meeting at 2021-06-20 14:00.',
    date: new Date(2021, 6, 22)
  },
  {
    title: 'Upload Notes',
    message: 'You forgot to upload notes for the meeting at 2021-05-21 16:00.',
    date: new Date(2021, 5, 21)
  }
]

export const fakeNotifications = [
  {
    type: 'reminder',
    title: 'Reminder',
    message: 'You have 10 meetings tomorrow. Have you input necessary information for them?',
    date: new Date(2021, 6, 22, 8)
  },
  {
    type: 'error',
    title: 'Upload Notes',
    message: 'You forgot to upload notes for the meeting at 2021-06-20 14:00.',
    date: new Date(2021, 5, 22, 8)
  },
]