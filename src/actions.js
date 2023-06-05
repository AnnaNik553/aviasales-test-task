// сортировка
export const sorting = (value) => ({ type: 'SORT_BY', payload: value })

// фильтры
export const delCheckbox = (value) => ({ type: 'DEL_CHECKBOX', payload: value })
export const addCheckbox = (value) => ({ type: 'ADD_CHECKBOX', payload: value })
export const addAllCheckboxes = () => ({ type: 'ADD_ALL_CHECKBOXES' })
export const delAllCheckboxes = () => ({ type: 'DEL_ALL_CHECKBOXES' })

// показать еще билеты
export const showMoreTickets = () => ({ type: 'ADD_TICKETS_ON_PAGE' })

// searchId и билеты
export const isLoadingData = () => ({ type: 'IS_LOADING' })
export const hasFetchError = () => ({ type: 'HAS_ERROR' })

export const getSearchId = (value) => ({ type: 'GET_SEARCH_ID', payload: value })

export const fetchSearchId = () => (dispatch) => {
  return async () => {
    try {
      const response = await fetch('https://aviasales-test-api.kata.academy/search')
      const result = await response.json()
      dispatch(getSearchId(result.searchId))
    } catch (err) {
      dispatch(hasFetchError())
    }
  }
}

export const getTickets = (value) => ({ type: 'GET_TICKETS', payload: value })

export const fetchTickets = (searchId) => (dispatch) => {
  return async () => {
    dispatch(isLoadingData())
    let stop = false
    while (!stop) {
      try {
        const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
        if (response.ok) {
          const result = await response.json()
          const tickets = result.tickets.map((t) => {
            return { ...t, id: `id${Math.random().toString(16).slice(2)}` }
          })
          stop = result.stop
          dispatch(getTickets(tickets))
        }
      } catch (err) {
        dispatch(hasFetchError())
        dispatch(isLoadingData())
      }
    }
    dispatch(isLoadingData())
  }
}
