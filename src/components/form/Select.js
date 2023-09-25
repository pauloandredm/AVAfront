import styles from './Select.module.css'

function Select({ text, name, options, handleOnChange, value }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <select 
        name={name} 
        id={name}
        onChange={handleOnChange}
        value={value || ''}
      >
        <option>Selecione uma opção</option>
        {options.sort((a, b) => (a.Servidor_Nome || "").localeCompare(b.Servidor_Nome || "")).map(option => (
          <option key={option.id} value={option.id}>
            {option.Servidor_Nome}
          </option>
        ))}
      </select>
    </div>
  )
}


export default Select