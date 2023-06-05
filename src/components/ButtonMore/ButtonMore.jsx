import { useDispatch } from 'react-redux'
import { showMoreTickets } from '../../actions'
import './ButtonMore.module.scss'

const ButtonMore = ({ classNames, text, value }) => {
  const dispatch = useDispatch()

  return (
    <button type="button" className={classNames} value={value} onClick={() => dispatch(showMoreTickets())}>
      {text}
    </button>
  )
}

export default ButtonMore
