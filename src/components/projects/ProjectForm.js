import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import { BiHelpCircle } from "react-icons/bi";
import styles from './ProjectForm.module.css'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import API_BASE_URL from '../ApiConfig';

import axios from '../../axiosConfig';

function ProjectForm(){

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    }
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

/* ---------- get ------------ */
  const [servidorId, setServidorId] = useState('');

/*----------- get lista de usuarios do back /avaliacao2 -------------*/
const [avaliacoes2, setAvaliacoes2] = useState([])

useEffect(() => {
  axios.get(`${API_BASE_URL}/avaliacao`)
      .then(response => {
          setAvaliacoes2(response.data)
      })
      .catch(error => {
          console.log(error)
      })
}, [])

/*----------- atualizar lista de usuarios do back /avaliacao2 -------------*/

useEffect(() => {
  if (submitted) {
    const getUsers = async () => {
      const response = await axios.get(`${API_BASE_URL}/avaliacao`);
      setAvaliacoes2(response.data);
      setSubmitted(false);
    };

    getUsers();
  }
}, [submitted]);

/* ---------- get dados do usuario logado, para poder enviar o post ------------ */
  function handleSelectChange(event) {
    setServidorId(event.target.value);
    console.log(setServidorId)
  }

/* -------- mensagem --------- */
const [showMessage, setShowMessage] = useState('');

useEffect(() => {
  let timer;
  if (showMessage) {
    timer = setTimeout(() => {
      setShowMessage(false);
      setShowMessage('');
    }, 4000);
  }
  return () => {
    clearTimeout(timer);
  };
}, [showMessage]);


const [showMessage2, setShowMessage2] = useState('');

useEffect(() => {
  let timer;
  if (showMessage2) {
    timer = setTimeout(() => {
      setShowMessage2(false);
      setShowMessage2('');
    }, 3000);
  }
  return () => {
    clearTimeout(timer);
  };
}, [showMessage2])

/* -------- post -------- */

/* const navigate = useNavigate(); */

const handleSubmit = (event) => {
  event.preventDefault();

  const errorMessages = [];

  if (!document.querySelector('input[name="Cooperacao"]:checked')) {
    errorMessages.push('O campo Cooperacao precisa ser preenchido');
  }
  if (!document.querySelector('input[name="Iniciativa"]:checked')) {
    errorMessages.push('O campo Iniciativa precisa ser preenchido');
  }
  if (!document.querySelector('input[name="Assiduidade"]:checked')) {
    errorMessages.push('O campo Assiduidade precisa ser preenchido');
  }
  if (!document.querySelector('input[name="Pontualidade"]:checked')) {
    errorMessages.push('O campo Pontualidade precisa ser preenchido');
  }
  if (!document.querySelector('input[name="Eficiencia"]:checked')) {
    errorMessages.push('O campo Eficiencia precisa ser preenchido');
  }
  if (!document.querySelector('input[name="Responsabilidade"]:checked')) {
    errorMessages.push('O campo Responsabilidade precisa ser preenchido');
  }


  if (errorMessages.length > 0) {
    console.error('Erros encontrados:', errorMessages);
    setShowMessage(errorMessages.join(', '));
    return;
  }

  const servidorSelecionado = avaliacoes2.find(avaliacao => avaliacao.Servidor_Nome === servidorId);
  const avaliado_matricula = servidorSelecionado ? `${servidorSelecionado.S_Matricula}-${servidorSelecionado.S_Digito}` : '';

  axios.post(`${API_BASE_URL}/avaliacao_post/`, {
    avaliado: servidorId,
    avaliado_matricula,
    coop: document.querySelector('input[name=Cooperacao]:checked').value,
    iniciativa: document.querySelector('input[name=Iniciativa]:checked').value,
    assiduidade: document.querySelector('input[name=Assiduidade]:checked').value,
    pontualidade: document.querySelector('input[name=Pontualidade]:checked').value,
    eficiencia: document.querySelector('input[name=Eficiencia]:checked').value,
    responsabilidade: document.querySelector('input[name=Responsabilidade]:checked').value
  })
  .then(response => {
    console.log(response);
    setServidorId('');
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.checked = false;
    });
    setSubmitted(true);
    /* navigate('/acordo-desempenho'); */
  })
  .catch(error => {
    console.log(error);
  });
  setShowMessage2(true);
};

  return(
      <div>

        {showMessage && (
          <div className={styles.error_message}>
            {showMessage}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <Select 
            text='Servidor' 
            name='Servidor_id'
            options={avaliacoes2}
            value={servidorId}
            handleOnChange={handleSelectChange}
          />
          
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th colSpan="4">Fraco</th>
                <th colSpan="3">Regular</th>
                <th colSpan="3">Bom</th>
                <th>Ótimo</th>
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
            <tbody className={styles.tbody}>
              <tr>
                <td className={styles.topicos}>
                  Cooperação
                  <div className={styles.tooltip}><BiHelpCircle/>
                    <span className={styles.tooltiptext}>Fraco: <p>Reluta em colaborar e demontra insubordinação com certa frequencia</p> <br/>
                    Regular: <p>Colabora quando determinado pela chefia</p> <br/>
                    Bom: <p>Colabora sempre que necessario</p> <br/>
                    Otimo: <p>Colabora sempre, mesmo voluntariamente, e se esforça ao maximo</p>
                    </span>
                  </div>
                </td>
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
                <td className={styles.topicos}>Iniciativa
                  <div className={styles.tooltip}><BiHelpCircle/>
                    <span className={styles.tooltiptext}>Fraco: <p>Incapaz de apresentar ideias e tomar a frente em situações incomuns</p> <br/>
                    Regular: <p>Demonstra pouca habilidade em inovar e decidir</p> <br/>
                    Bom: <p>Apresenta ideias e procura resolver os problemas que surgem</p> <br/>
                    Otimo: <p>Está sempre a frente em situações incomuns toma decisões e resolve problemas</p>
                    </span>
                  </div>
                </td>
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
                <td className={styles.topicos}>Assiduidade
                  <div className={styles.tooltip}><BiHelpCircle/>
                    <span className={styles.tooltiptext}>Fraco: <p>Sempre chega atrasado ao trabalho ou compromissos</p> <br/>
                    Regular: <p>Chega atrasado com alguma frequencia ao trabalho ou compromissos</p> <br/>
                    Bom: <p>Eventualmente se atrasa na chegada ao trabalho ou a algum compromisso</p> <br/>
                    Otimo: <p>Nunca ou raramente se atrasa</p>
                    </span>
                  </div>
                </td>
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
              <tr>
                <td className={styles.topicos}>Pontualidade
                  <div className={styles.tooltip}><BiHelpCircle/>
                    <span className={styles.tooltiptext}>Fraco: <p>Sempre chega atrasado ao trabalho ou compromissos</p> <br/>
                    Regular: <p>Chega atrasado com alguma frequencia ao trabalho ou compromissos</p> <br/>
                    Bom: <p>Eventualmente se atrasa na chegada ao trabalho ou a algum compromisso</p> <br/>
                    Otimo: <p>Nunca ou raramente se atrasa</p>
                    </span>
                  </div>
                </td>
                <td><input type="radio" name="Pontualidade" value="0" /></td>
                <td><input type="radio" name="Pontualidade" value="1" /></td>
                <td><input type="radio" name="Pontualidade" value="2" /></td>
                <td><input type="radio" name="Pontualidade" value="3" /></td>
                <td><input type="radio" name="Pontualidade" value="4" /></td>
                <td><input type="radio" name="Pontualidade" value="5" /></td>
                <td><input type="radio" name="Pontualidade" value="6" /></td>
                <td><input type="radio" name="Pontualidade" value="7" /></td>
                <td><input type="radio" name="Pontualidade" value="8" /></td>
                <td><input type="radio" name="Pontualidade" value="9" /></td>
                <td><input type="radio" name="Pontualidade" value="10" /></td>
              </tr>
              <tr>
                <td className={styles.topicos}>Eficiencia
                  <div className={styles.tooltip}><BiHelpCircle/>
                    <span className={styles.tooltiptext}>Fraco: <p>Comete muitos erros e não cuida da apresentação do trabalho executado</p> <br/>
                    Regular: <p>Algumas vezes satisfaz</p> <br/>
                    Bom: <p>O trabalho é bem realizado e com boa apresentação</p> <br/>
                    Otimo: <p>O trabalho é sempre muito bem feito e demonstra cuidado excepcional</p>
                    </span>
                  </div>
                </td>
                <td><input type="radio" name="Eficiencia" value="0" /></td>
                <td><input type="radio" name="Eficiencia" value="1" /></td>
                <td><input type="radio" name="Eficiencia" value="2" /></td>
                <td><input type="radio" name="Eficiencia" value="3" /></td>
                <td><input type="radio" name="Eficiencia" value="4" /></td>
                <td><input type="radio" name="Eficiencia" value="5" /></td>
                <td><input type="radio" name="Eficiencia" value="6" /></td>
                <td><input type="radio" name="Eficiencia" value="7" /></td>
                <td><input type="radio" name="Eficiencia" value="8" /></td>
                <td><input type="radio" name="Eficiencia" value="9" /></td>
                <td><input type="radio" name="Eficiencia" value="10" /></td>
              </tr>
              <tr>
                <td className={styles.topicos}>Responsabilidade
                <div className={styles.tooltip}><BiHelpCircle/>
                    <span className={styles.tooltiptext}>Fraco: <p>Raramente cumpre os prazos e necessita de supervisão constante</p> <br/>
                    Regular: <p>Atende aos prazos previstos, mas necessita de permanente supervisão</p> <br/>
                    Bom: <p>Cumpre os prazos, bastando algumas diretrizes e supervisão</p> <br/>
                    Otimo: <p>Quase sempre conclui o trabalho antes do prazo e sem necessidade de supervisão</p>
                    </span>
                  </div>
                </td>
                <td><input type="radio" name="Responsabilidade" value="0" /></td>
                <td><input type="radio" name="Responsabilidade" value="1" /></td>
                <td><input type="radio" name="Responsabilidade" value="2" /></td>
                <td><input type="radio" name="Responsabilidade" value="3" /></td>
                <td><input type="radio" name="Responsabilidade" value="4" /></td>
                <td><input type="radio" name="Responsabilidade" value="5" /></td>
                <td><input type="radio" name="Responsabilidade" value="6" /></td>
                <td><input type="radio" name="Responsabilidade" value="7" /></td>
                <td><input type="radio" name="Responsabilidade" value="8" /></td>
                <td><input type="radio" name="Responsabilidade" value="9" /></td>
                <td><input type="radio" name="Responsabilidade" value="10" /></td>
              </tr>
            </tbody>
          </table>
          <SubmitButton text='Submit'/>
        </form>
        {showMessage2 && <div className={styles.success}>Avaliação realizada com sucesso!</div>}
      </div>
    )
}

export default ProjectForm