export const getCurrentDate = (): string => {
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'
  ]

  const date = new Date()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `${months[month]} ${day} | ${format(hours)}:${format(minutes)}`
}

const format = (num: number): string | number => {
  return num < 10 ? `0${num}` : num
}