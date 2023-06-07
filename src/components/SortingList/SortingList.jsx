import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../../actions'

import classes from './SortingList.module.scss'

const SortingList = ({ sortButtonsData, sortingBy, sorting }) => {
  return (
    <div className={classes.sort}>
      {sortButtonsData.map(([text, value]) => {
        let classNames = classes['sort__btn']
        if (value === sortingBy) classNames += ` ${classes['sort__btn--active']}`
        return (
          <button type="button" key={value} className={classNames} value={value} onClick={() => sorting(value)}>
            {text}
          </button>
        )
      })}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    sortButtonsData: state.sortButtonsData,
    sortingBy: state.sortingBy,
  }
}

export default connect(mapStateToProps, actions)(SortingList)

SortingList.propTypes = {
  sortButtonsData: PropTypes.arrayOf(PropTypes.array).isRequired,
  sortingBy: PropTypes.string.isRequired,
  sorting: PropTypes.func.isRequired,
}
