import styles from './Tabela.module.css'

function Input({ type, text, text2, name, placeholder, handleOnChange, value }) {
    return (
      <table className={styles.table}>
      <thead>
        <tr>
          <th colSpan="4">Fraco</th>
          <th colSpan="3">Regular</th>
          <th colSpan="3">Bom</th>
          <th colSpan="2">Ótimo</th>
        </tr>
        <tr>
          <th></th>
          <th>0</th>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>5</th>
          <th>6</th>
          <th>7</th>
          <th>8</th>
          <th>9</th>
          <th>10</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cooperação</td>
          <td><input type="radio" name="Cooperacao" value="0" /></td>
          <td><input type="radio" name="Cooperacao" value="1" /></td>
          <td><input type="radio" name="Cooperacao" value="2" /></td>
          <td><input type="radio" name="Cooperacao" value="3" /></td>
          <td><input type="radio" name="Cooperacao" value="4" /></td>
          <td><input type="radio" name="Cooperacao" value="5" /></td>
          <td><input type="radio" name="Cooperacao" value="6" /></td>
          <td><input type="radio" name="Cooperacao" value="7" /></td>
          <td><input type="radio" name="Cooperacao" value="8" /></td>
          <td><input type="radio" name="Cooperacao" value="9" /></td>
          <td><input type="radio" name="Cooperacao" value="10" /></td>
        </tr>
        <tr>
          <td>Iniciativa</td>
          <td><input type="radio" name="Iniciativa" value="0" /></td>
          <td><input type="radio" name="Iniciativa" value="1" /></td>
          <td><input type="radio" name="Iniciativa" value="2" /></td>
          <td><input type="radio" name="Iniciativa" value="3" /></td>
          <td><input type="radio" name="Iniciativa" value="4" /></td>
          <td><input type="radio" name="Iniciativa" value="5" /></td>
          <td><input type="radio" name="Iniciativa" value="6" /></td>
          <td><input type="radio" name="Iniciativa" value="7" /></td>
          <td><input type="radio" name="Iniciativa" value="8" /></td>
          <td><input type="radio" name="Iniciativa" value="9" /></td>
          <td><input type="radio" name="Iniciativa" value="10" /></td>
        </tr>
        <tr>
          <td>Assiduidade</td>
          <td><input type="radio" name="Assiduidade" value="0" /></td>
          <td><input type="radio" name="Assiduidade" value="1" /></td>
          <td><input type="radio" name="Assiduidade" value="2" /></td>
          <td><input type="radio" name="Assiduidade" value="3" /></td>
          <td><input type="radio" name="Assiduidade" value="4" /></td>
          <td><input type="radio" name="Assiduidade" value="5" /></td>
          <td><input type="radio" name="Assiduidade" value="6" /></td>
          <td><input type="radio" name="Assiduidade" value="7" /></td>
          <td><input type="radio" name="Assiduidade" value="8" /></td>
          <td><input type="radio" name="Assiduidade" value="9" /></td>
          <td><input type="radio" name="Assiduidade" value="10" /></td>
        </tr>
      </tbody>
    </table>
        )
    }
    
    export default Input
