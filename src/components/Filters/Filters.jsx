import { connect } from 'react-redux'

import * as actions from '../../actions'
import Filter from '../Filter'

import classes from './Filters.module.scss'

const Filters = ({ filtersData, addAllCheckboxes, delAllCheckboxes, delCheckbox, addCheckbox }) => {
  const onChange = ({ target }) => {
    if (target.id === 'all' && target.checked) {
      addAllCheckboxes()
    } else if (target.id === 'all' && !target.checked) {
      delAllCheckboxes()
    } else if (target.id !== 'all' && !target.checked) {
      delCheckbox(target.id)
    } else {
      addCheckbox(target.id)
    }
  }

  return (
    <section className={classes.filters}>
      <h2 className={classes['filters__header']}>Количество пересадок</h2>
      <form className={classes['filters__form']}>
        {filtersData.map((filter) => {
          const { inputId } = filter
          return (
            <Filter
              key={inputId}
              classNameItem={classes['filters__item']}
              classNameLabel={classes.label}
              {...filter}
              onChange={onChange}
            />
          )
        })}
      </form>
    </section>
  )
}

const mapStateToProps = (state) => {
  return {
    filtersData: state.filtersData,
  }
}

export default connect(mapStateToProps, actions)(Filters)
