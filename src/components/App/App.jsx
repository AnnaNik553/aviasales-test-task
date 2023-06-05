import { useEffect } from 'react'
import { useDispatch, connect } from 'react-redux'

import Filters from '../Filters'
import SortingList from '../SortingList'
import TicketsList from '../TicketsList'
import ButtonMore from '../ButtonMore'
import ErrorMessage from '../ErrorMessage'
import Loader from '../Loader'
import * as actions from '../../actions'
import { NUMBER_TICKETS_ON_PAGE } from '../../reducer'

import './zeroes.scss'
import classes from './App.module.scss'
import plane from './Plane.svg'

const App = ({ fetchSearchId, searchId, fetchTickets, isLoading, hasError }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!searchId) dispatch(fetchSearchId())
    if (searchId) dispatch(fetchTickets(searchId))
  }, [searchId])

  return (
    <div className={classes.container}>
      {isLoading && <Loader />}
      <img src={plane} alt="" className={classes['page_logo']} />
      <main className={classes.main}>
        <Filters />
        <div className={classes.content}>
          <SortingList />
          {!hasError ? (
            <TicketsList>
              <ButtonMore classNames={classes['more__btn']} text={`Показать еще ${NUMBER_TICKETS_ON_PAGE} билетов!`} />
            </TicketsList>
          ) : (
            <ErrorMessage />
          )}
        </div>
      </main>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    searchId: state.searchId,
    hasError: state.hasError,
    isLoading: state.isLoading,
  }
}

export default connect(mapStateToProps, actions)(App)
