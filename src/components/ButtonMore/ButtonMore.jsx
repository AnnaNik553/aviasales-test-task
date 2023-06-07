import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { showMoreTickets } from '../../actions'
import './ButtonMore.module.scss'

const ButtonMore = ({ classNames, text }) => {
  const dispatch = useDispatch()

  return (
    <button type="button" className={classNames} onClick={() => dispatch(showMoreTickets())}>
      {text}
    </button>
  )
}

export default ButtonMore

ButtonMore.propTypes = {
  classNames: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}
