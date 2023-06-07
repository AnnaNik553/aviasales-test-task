import PropTypes from 'prop-types'

const Filter = ({ classNameItem, classNameLabel, inputId, label, checked, onChange }) => {
  return (
    <div className={classNameItem}>
      <input type="checkbox" id={inputId} checked={checked} onChange={onChange} />
      <label htmlFor={inputId} className={classNameLabel}>
        {label}
      </label>
    </div>
  )
}

export default Filter

Filter.propTypes = {
  classNameItem: PropTypes.string.isRequired,
  classNameLabel: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}
