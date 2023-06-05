import React from 'react'
import { connect } from 'react-redux'

import Ticket from '../Ticket'
import * as actions from '../../actions'
import { sortTickets, filterTickets } from '../../utils'
import classes from './TicketsList.module.scss'

const TicketsList = ({ ticketsOnPage, tickets, sortingBy, filtersData, children }) => {
  if (tickets.length > 0) {
    const filteredTickets = filterTickets([...tickets], filtersData)
    if (filteredTickets.length === 0) {
      return <div className={classes.noTickets}>Рейсов, подходящих под заданные фильтры, не найдено</div>
    }
    const sortedTickets = sortTickets(filteredTickets, sortingBy)
    return (
      <React.Fragment>
        {sortedTickets.slice(0, ticketsOnPage).map((t) => (
          <Ticket key={t.id} {...t} />
        ))}
        {children}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ticketsOnPage: state.ticketsOnPage,
    tickets: state.tickets,
    sortingBy: state.sortingBy,
    filtersData: state.filtersData,
  }
}

export default connect(mapStateToProps, actions)(TicketsList)
