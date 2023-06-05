export const getNumberTransfers = (stops) => {
  if (stops.length > 0) {
    return stops.length === 1 ? '1 пересадка' : `${stops.length} пересадки`
  }
  return 'без пересадок'
}

export const getFormatTime = (date) => {
  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

export const getTakeoffAndLandingTimes = (date, duration) => {
  const startDate = new Date(date)
  const finishDate = new Date(startDate.getTime() + duration * 60 * 1000)
  return `${getFormatTime(startDate)} - ${getFormatTime(finishDate)}`
}

export const getInFlightTime = (duration) => {
  const hours = Math.floor(duration / 60)
  const minutes = duration - hours * 60
  return `${hours}Ч ${minutes}М`
}

export const sortTickets = (tickets, sortingBy) => {
  if (tickets.length > 0 && sortingBy === 'cheapest') {
    return tickets.sort((t1, t2) => t1.price - t2.price)
  }
  if (tickets.length > 0 && sortingBy === 'fastest') {
    return tickets.sort(
      (t1, t2) =>
        t1.segments.reduce((sum, cur) => sum + cur.duration, 0) -
        t2.segments.reduce((sum, cur) => sum + cur.duration, 0)
    )
  }
  if (tickets.length > 0 && sortingBy === 'optimal') {
    return tickets.sort((t1, t2) => {
      const t1Duration = t1.segments.reduce((sum, cur) => sum + cur.duration, 0)
      const t2Duration = t2.segments.reduce((sum, cur) => sum + cur.duration, 0)
      return t1.price < t2.price && t1Duration < t2Duration
        ? -1
        : t1.price < t2.price * 1.2 && t1Duration < t2Duration
        ? -1
        : t1.price < t2.price && t1Duration < t2Duration * 1.2
        ? -1
        : 1
    })
  }
  return null
}

export const filterTickets = (tickets, filters) => {
  if (filters.find((f) => f.inputId === 'all').checked) return tickets
  if (filters.filter((f) => f.checked).length === 0) return []
  const transfers = filters.filter((f) => f.checked).map((f) => Number(f.inputId))
  return tickets.filter(({ segments }) => {
    return segments.filter((s) => transfers.includes(s.stops.length)).length > 0
  })
}
