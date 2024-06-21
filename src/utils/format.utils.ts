export const wordEndings: Record<string, string[]> = {
    hour: ['час', 'часа', 'часов'],
    minute: ['минута', 'минуты', 'минут'],
}

export const parseWordEnding = (number: number | null, stringArray: string[]) => {
    if (!number) {
      return stringArray[2]
    }
    number = Math.abs(number)
    if (Number.isInteger(number)) {
      const options = [2, 0, 1, 1, 1, 2]
      return stringArray[number % 100 > 4 && number % 100 < 20 ? 2 : options[number % 10 < 5 ? number % 10 : 5]]
    }
    return stringArray[1]
  }

export const formatSecondsToTime = (seconds?: number | null, isTimer?: boolean, isNumbersOnly?: boolean): string => {
    const hours = Math.floor((seconds ?? 0) / 3600)
    const minutes = Math.floor(((seconds ?? 0) % 3600) / 60)
    const remainingSeconds = (seconds ?? 0) % 60
  
    if (isTimer) {
      if (hours > 0) {
        if (isNumbersOnly) {
          return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
        } else {
          return `${hours} ч ${minutes < 10 ? '0' : ''}${minutes} мин`
        }
      } else {
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
      }
    }
  
    if (hours > 0) {
      return `${hours} ч ${minutes} мин`
    } else {
      return `${minutes} мин`
    }
  }

export const formatSecondsToHours = (seconds?: number | null): number => (seconds ? Math.floor(seconds / 3600) : 0)
export const formatSecondsToMinutes = (seconds?: number | null): number => (seconds ? Math.floor(seconds / 60) : 0)

export const formatSecondsToTimeWithTitles = (seconds?: number | null) => {
  let time = 0
  let timeTitle = wordEndings.hour[0]

  if (typeof seconds === 'number') {
    const isTimeInHours = seconds >= 3600 || seconds === 0
    time = isTimeInHours ? formatSecondsToHours(seconds) : formatSecondsToMinutes(seconds)
    timeTitle = parseWordEnding(time, isTimeInHours ? wordEndings.hour : wordEndings.minute)
  }

  return { time, timeTitle }
}
  