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
