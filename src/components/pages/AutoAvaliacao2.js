
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import { BiHelpCircle } from "react-icons/bi";
import styles from './AutoAvaliacao.module.css'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import API_BASE_URL from '../ApiConfig';
import axios from '../../axiosConfig';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

function AutoAvaliacao2() {

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        }
      }, []);
    
      const [submitted, setSubmitted] = useState(false);
      const navigate = useNavigate();
    
    /* ---------- get ------------ */
    
      const [avaliacoes, setAvaliacoes] = useState([])
      const [servidorId, setServidorId] = useState('');

    /* ---------- get dados do usuario logado, para poder enviar o post ------------ */
      function handleSelectChange(event) {
        setServidorId(event.target.value);
        console.log(setServidorId)
      }
    
    /* -------- mensagem --------- */
    const [showMessage, setShowMessage] = useState(false);
    
    useEffect(() => {
      let timer;
      if (showMessage) {
        timer = setTimeout(() => {
          setShowMessage(false);
          setShowMessage('');
        }, 3000);
      }
      return () => {
        clearTimeout(timer);
      };
    }, [showMessage]);
    
    /* -------- post -------- */
    
    /* const navigate = useNavigate(); */
    
    const formik = useFormik({
        initialValues: {
          letra_A: '',
          letra_B: '',
          letra_C: '',
          comentario_letra_C: '',
          Fatores_intervenientes_A: '',
          Fatores_intervenientes_B: '',
          Fatores_intervenientes_C: '',
          letra_D: '',
          letra_E: '',
          letra_F: '',
        },
        validationSchema: Yup.object({
          letra_A: Yup.string().required('Campo obrigatório'),
          letra_B: Yup.string().required('Campo obrigatório'),
          letra_C: Yup.string().required('Campo obrigatório'),
          comentario_letra_C: Yup.string(),
          Fatores_intervenientes_A: Yup.string().required('Campo obrigatório'),
          Fatores_intervenientes_B: Yup.string().required('Campo obrigatório'),
          Fatores_intervenientes_C: Yup.string().required('Campo obrigatório'),
          letra_D: Yup.string().required('Campo obrigatório'),
          letra_E: Yup.string().required('Campo obrigatório'),
          letra_F: Yup.string().required('Campo obrigatório'),
        }),
        onSubmit: async (values) => {
            try {
              // Fazer a requisição POST para o backend
              const response = await axios.post('/avaliacao-auto-avaliacao/', values);
              // Aqui você pode tratar a resposta do servidor, por exemplo, exibir uma mensagem de sucesso, etc.
              console.log(response.data);
            } catch (error) {
              // Caso ocorra um erro na requisição, você pode tratá-lo aqui
              console.error(error);
            }
        },
    });
    
return(
<div>
    <h3 className={styles.aspectos}>Aspectos Gerais:</h3>
    <label htmlFor="letra_A">A)</label>
    <p>Você apresentou dificuldade para executar alguma tarefa inerente ao cargo que exerce? Se sim, qual(is)?</p>
    <input
        type="text"
        id={styles.meuInput}
        name="letra_A"
        value={formik.values.letra_A}
        onChange={formik.handleChange}
    />

    {formik.touched.letra_A && formik.errors.letra_A ? (
    <div className={styles.error}>{formik.errors.letra_A}</div>
    ) : null}

    <label htmlFor="letra_B" className={styles.letra}>B)</label>
    <p>Hoje, você desempenha com dificuldade alguma(s) tarefa(s) que já executou bem no passado? Se sim, qual(is)?</p>
    <input
        type="text"
        id={styles.meuInput}
        name="letra_B"
        value={formik.values.letra_B}
        onChange={formik.handleChange}
    />

    {formik.touched.letra_B && formik.errors.letra_B ? (
    <div className={styles.error}>{formik.errors.letra_B}</div>
    ) : null}

    <label htmlFor="letra_C" className={styles.letra}>C)</label>
    <p>Você cumpriu os deveres e as obrigações do servidor público, com estrita observância da ética profissional?</p>

    <select
        className={styles.letra_C}
        id="letra_C"
        name="letra_C"
        onChange={formik.handleChange}
        value={formik.values.letra_C}
    >
        <option value="T">Totalmente</option>
        <option value="A">Às vezes</option>
        <option value="I">De forma insatisfatória</option>
    </select>

    {formik.touched.letra_C && formik.errors.letra_C ? (
    <div className={styles.error}>{formik.errors.letra_C}</div>
    ) : null}

    <input
        type="text"
        id={styles.meuInput}
        name="letra_C"
        value={formik.values.comentario_letra_C}
        onChange={formik.handleChange}
        placeholder='Comentários e outros aspectos gerais'
    />

    {formik.touched.comentario_letra_C && formik.errors.comentario_letra_C ? (
    <div className={styles.error}>{formik.errors.comentario_letra_C}</div>
    ) : null}

    <h3 className={styles.fatores}>Fatores intervenientes:</h3>

    <label htmlFor="Fatores_intervenientes_A">A)</label>
    <p>concluiu participação em evento de iniciação ao serviço público?</p>
    <select
        id="Fatores_intervenientes_A"
        name="Fatores_intervenientes_A"
        onChange={formik.handleChange}
        value={formik.values.Fatores_intervenientes_A}
    >
        <option value="S">Sim</option>
        <option value="N">Não</option>
        <option value="A">N/A</option>
    </select>

    {formik.touched.Fatores_intervenientes_A && formik.errors.Fatores_intervenientes_A ? (
        <div className={styles.error}>{formik.errors.Fatores_intervenientes_A}</div>
    ) : null}

    <label htmlFor="Fatores_intervenientes_B" className={styles.block}>B)</label>
    <p>possui formação exigida para o cargo?</p>
    <select
        id="Fatores_intervenientes_B"
        name="Fatores_intervenientes_B"
        onChange={formik.handleChange}
        value={formik.values.Fatores_intervenientes_B}
    >
        <option value="S">Sim</option>
        <option value="N">Não</option>
        <option value="A">N/A</option>
    </select>

    {formik.touched.Fatores_intervenientes_B && formik.errors.Fatores_intervenientes_B ? (
        <div className={styles.error}>{formik.errors.Fatores_intervenientes_B}</div>
    ) : null}

    <label htmlFor="Fatores_intervenientes_C" className={styles.block}>C)</label>
    <p>tem apresentado problemas de saúde?</p>
    <select
        id="Fatores_intervenientes_C"
        name="Fatores_intervenientes_C"
        onChange={formik.handleChange}
        value={formik.values.Fatores_intervenientes_C}
    >
        <option value="S">Sim</option>
        <option value="N">Não</option>
        <option value="A">N/A</option>
    </select>

    {formik.touched.Fatores_intervenientes_C && formik.errors.Fatores_intervenientes_C ? (
        <div className={styles.error}>{formik.errors.Fatores_intervenientes_C}</div>
    ) : null}

    <label htmlFor="letra_D" className={styles.block}>D)</label>
    <p>Solicita avaliação, parecer e/ou apoio da equipe multiprofissional de saúde?</p>

    <select
        className={styles.blockd}
        id="letra_D"
        name="letra_D"
        onChange={formik.handleChange}
        value={formik.values.letra_D}
    >
        <option value="S">Totalmente</option>
        <option value="N">Às vezes</option>
    </select>

    {formik.touched.letra_D && formik.errors.letra_D ? (
    <div className={styles.error}>{formik.errors.letra_D}</div>
    ) : null}

    <label htmlFor="letra_E" className={styles.block}>E)</label>
    <p>Hoje, você desempenha com dificuldade alguma(s) tarefa(s) que já executou bem no passado? Se sim, qual(is)?</p>
    <input
        type="text"
        id={styles.meuInput2}
        name="letra_E"
        value={formik.values.letra_E}
        onChange={formik.handleChange}
    />

    {formik.touched.letra_E && formik.errors.letra_E ? (
    <div className={styles.error}>{formik.errors.letra_E}</div>
    ) : null}

    <label htmlFor="letra_F" className={styles.block}>F)</label>
    <p>Hoje, você desempenha com dificuldade alguma(s) tarefa(s) que já executou bem no passado? Se sim, qual(is)?</p>
    <input
        type="text"
        id={styles.meuInput}
        name="letra_F"
        value={formik.values.letra_F}
        onChange={formik.handleChange}
    />

    {formik.touched.letra_F && formik.errors.letra_F ? (
    <div className={styles.error}>{formik.errors.letra_F}</div>
    ) : null}
</div>
)
}

export default AutoAvaliacao2
