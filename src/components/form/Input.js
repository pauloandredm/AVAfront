import styles from './Input.module.css'

function Input({ type, text, text2, name, placeholder, handleOnChange, value }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <p htmlFor={name}>{text2}</p>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
      />
    </div>
  )
}

export default Input