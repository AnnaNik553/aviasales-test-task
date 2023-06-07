export const NUMBER_TICKETS_ON_PAGE = 5

const defaultState = {
  sortingBy: 'cheapest',
  sortButtonsData: [
    ['Самый дешевый', 'cheapest'],
    ['Самый быстрый', 'fastest'],
    ['Оптимальный', 'optimal'],
  ],
  filtersData: [
    { inputId: 'all', label: 'Все', checked: true },
    { inputId: '0', label: 'Без пересадок', checked: true },
    { inputId: '1', label: '1 пересадка', checked: true },
    { inputId: '2', label: '2 пересадки', checked: true },
    { inputId: '3', label: '3 пересадки', checked: true },
  ],
  searchId: '',
  tickets: [],
  ticketsOnPage: NUMBER_TICKETS_ON_PAGE,
  isLoading: false,
  hasError: false,
}

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    // сортировка
    case 'SORT_BY':
      return { ...state, sortingBy: action.payload }
    // фильтры
    case 'ADD_ALL_CHECKBOXES':
      return {
        ...state,
        filtersData: state.filtersData.map((filter) => {
          return { ...filter, checked: true }
        }),
      }
    case 'DEL_ALL_CHECKBOXES':
      return {
        ...state,
        filtersData: state.filtersData.map((filter) => {
          return { ...filter, checked: false }
        }),
      }
    case 'DEL_CHECKBOX':
      return {
        ...state,
        filtersData: state.filtersData.map((filter) => {
          if (filter.inputId === action.payload || filter.inputId === 'all') {
            return { ...filter, checked: false }
          }
          return filter
        }),
      }
    case 'ADD_CHECKBOX':
      return {
        ...state,
        filtersData: state.filtersData.map((filter, _, array) => {
          if (filter.inputId === action.payload) {
            return { ...filter, checked: true }
          }
          if (
            filter.inputId === 'all' &&
            array.filter((f) => f.inputId !== 'all' && f.inputId !== action.payload).every((f) => f.checked)
          ) {
            return { ...filter, checked: true }
          }
          return filter
        }),
      }
    // показать еще билеты
    case 'ADD_TICKETS_ON_PAGE':
      return {
        ...state,
        ticketsOnPage: state.ticketsOnPage + NUMBER_TICKETS_ON_PAGE,
      }
    // searchId и билеты
    case 'GET_SEARCH_ID':
      return {
        ...state,
        searchId: action.payload,
      }
    case 'GET_TICKETS':
      return {
        ...state,
        tickets: [...state.tickets, ...action.payload],
      }
    case 'IS_LOADING':
      return {
        ...state,
        isLoading: !state.isLoading,
      }
    case 'HAS_ERROR':
      return {
        ...state,
        hasError: true,
      }
    default:
      return state
  }
}
