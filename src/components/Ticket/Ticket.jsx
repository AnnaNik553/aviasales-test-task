import { useState } from 'react'
import PropTypes from 'prop-types'

import { getNumberTransfers, getTakeoffAndLandingTimes, getInFlightTime } from '../../utils'

import logo from './noLogo.png'
import classes from './Ticket.module.scss'

const Ticket = ({ price, carrier, segments }) => {
  const [imgSrc, setImgSrc] = useState(`http://pics.avs.io/99/36/${carrier}.png`)
  const onError = () => setImgSrc(logo)

  return (
    <div className={classes.ticket} tabIndex="0">
      <div className={classes['ticket__top']}>
        <span className={classes['ticket__price']}>{price}</span>
        <img src={imgSrc} onError={onError} alt={`logo ${carrier}`} className={classes['ticket__img']} />
      </div>
      {segments.map(({ origin, destination, stops, date, duration }) => {
        return (
          <div key={origin} className={classes['ticket__info']}>
            <span className={classes['ticket__title']}>
              {origin} – {destination}
            </span>
            <span className={classes['ticket__title']}>В пути</span>
            <span className={classes['ticket__title']}>{getNumberTransfers(stops)}</span>
            <span className={classes['ticket__subtitle']}>{getTakeoffAndLandingTimes(date, duration)}</span>
            <span className={classes['ticket__subtitle']}>{getInFlightTime(duration)}</span>
            <span className={classes['ticket__subtitle']}>{stops.join(', ')}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Ticket

Ticket.propTypes = {
  price: PropTypes.number.isRequired,
  carrier: PropTypes.string.isRequired,
  segments: PropTypes.arrayOf(PropTypes.object).isRequired,
}
