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

function AutoAvaliacao() {

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
          periodo_inicio: '',
          periodo_fim: '',
          assiduidade: '',
          disciplina: '',
          produtividade: '',
          iniciativa: '',
          responsabilidade: '',
        },
        validationSchema: Yup.object({
          periodo_inicio: Yup.date().required('Campo obrigatório'),
          periodo_fim: Yup.date().required('Campo obrigatório'),
          assiduidade: Yup.string().required('Campo obrigatório'),
          disciplina: Yup.string().required('Campo obrigatório'),
          produtividade: Yup.string().required('Campo obrigatório'),
          iniciativa: Yup.string().required('Campo obrigatório'),
          responsabilidade: Yup.string().required('Campo obrigatório'),
        }),
        onSubmit: async (values) => {
            try {
              // Fazer a requisição POST para o backend
              const response = await axios.post(`${API_BASE_URL}/progresso_formulario/`, values);
              // Aqui você pode tratar a resposta do servidor, por exemplo, exibir uma mensagem de sucesso, etc.
              console.log(response.data);
            } catch (error) {
              // Caso ocorra um erro na requisição, você pode tratá-lo aqui
              console.error(error);
            }
        },
    });
    
      return(
<div className={styles.avaliacao_container}>
    <form onSubmit={formik.handleSubmit}>

    <h1>Auto Avaliação</h1>
    <p>Faça sua auto avaliação</p>
    <div className={styles.form_control}>

<div className={styles.periodocontainer}>
    <div className={styles.periodoitem}>
        <label htmlFor="periodo_inicio">Início do Período:</label>
        <DatePicker
        id="periodo_inicio"
        name="periodo_inicio"
        selected={formik.values.periodo_inicio}
        onChange={(date) => formik.setFieldValue('periodo_inicio', date)}
        dateFormat="dd/MM/yyyy" // Definindo o formato de exibição da data
        />

        {formik.touched.periodo_inicio && formik.errors.periodo_inicio ? (
        <div className={styles.error}>{formik.errors.periodo_inicio}</div>
        ) : null}

    </div>
    <div className={styles.periodoitem}>
        <label htmlFor="periodo_fim">Fim do Período:</label>
        <DatePicker
        id="periodo_fim"
        name="periodo_fim"
        selected={formik.values.periodo_fim}
        onChange={(date) => formik.setFieldValue('periodo_fim', date)}
        dateFormat="dd/MM/yyyy" // Definindo o formato de exibição da data
        />

        {formik.touched.periodo_fim && formik.errors.periodo_fim ? (
        <div className={styles.error}>{formik.errors.periodo_fim}</div>
        ) : null}
    </div>
</div>

<div className={styles.form_control}>
        <label htmlFor="assiduidade">Assiduidade:</label>
        <p>Cumprimento da carga horária de trabalho estabelecida; pontualidade; comparecimento às reuniões e aos compromissos assumidos; aviso tempestivo de ausências, atrasos ou saídas antecipadas, permitindo organização do setor</p>
        <input
            type="text"
            id={styles.meuInput}
            name="assiduidade"
            value={formik.values.assiduidade}
            onChange={formik.handleChange}
        />

        {formik.touched.assiduidade && formik.errors.assiduidade ? (
        <div className={styles.error}>{formik.errors.assiduidade}</div>
        ) : null}

        <label htmlFor="disciplina">Disciplina:</label>
        <p>Conhecimento e cumprimento das leis, regulamentos e procedimentos internos; reserva sobre assuntos de interesse exclusivamente interno ou particular; cooperação e participação efetiva nos trabalhos da equipe; demonstração de respeito e atenção, assim como tratar com urbanidade (independente de nível hierárquico, profissional ou social).</p>
        <input
            type="text"
            id={styles.meuInput}
            name="disciplina"
            value={formik.values.disciplina}
            onChange={formik.handleChange}
        />

        {formik.touched.disciplina && formik.errors.disciplina ? (
        <div className={styles.error}>{formik.errors.disciplina}</div>
        ) : null}

        <label htmlFor="produtividade">Produtividade:</label>
        <p>Cumprimento dos prazos exigidos sem precisar ser cobrado e sem acúmulo de demandas; volume de trabalho produzido coerente com tempo, recursos e complexidade das atividades; tarefas desenvolvidas corretamente, com qualidade e boa apresentação.</p>
        <input
            type="text"
            id={styles.meuInput}
            name="produtividade"
            value={formik.values.produtividade}
            onChange={formik.handleChange}
        />

        {formik.touched.produtividade && formik.errors.produtividade ? (
        <div className={styles.error}>{formik.errors.produtividade}</div>
        ) : null}

        <label htmlFor="iniciativa">Iniciativa:</label>
        <p>Desenvolvimento de melhorias no trabalho que realiza; disposição espontânea para aprender outras tarefas e auxiliar o setor/colegiado; busca por orientação e por ações de desenvolvimento profissional, visando solucionar situações e/ou eliminar lacunas de desempenho; sugestões e críticas construtivas para retroalimentação, a partir de sua experiência e observações.</p>
        <input
            type="text"
            id={styles.meuInput}
            name="iniciativa"
            value={formik.values.iniciativa}
            onChange={formik.handleChange}
        />

        {formik.touched.iniciativa && formik.errors.iniciativa ? (
        <div className={styles.error}>{formik.errors.iniciativa}</div>
        ) : null}

        <label htmlFor="responsabilidade">Responsabilidade:</label>
        <p>Cumprimento de atribuições e tarefas que assume; organização de atividades de modo a garantir a continuidade do trabalho em suas ausências (previstas ou não); responsabilidade pelos resultados de suas ações ou, parcialmente, de sua equipe; exercício de funções sem usufruir de poderes/facilidades delas decorrentes em favorecimento próprio ou a terceiros; zelo pelo patrimônio público, uso adequado de materiais e otimização de gastos.</p>
        <input
            type="text"
            id={styles.meuInput}
            name="responsabilidade"
            value={formik.values.responsabilidade}
            onChange={formik.handleChange}
        />

        {formik.touched.responsabilidade && formik.errors.responsabilidade ? (
        <div className={styles.error}>{formik.errors.responsabilidade}</div>
        ) : null}
</div>
    </div>
    <button type="submit">Enviar</button>
    </form>

</div>
)
}

export default AutoAvaliacao