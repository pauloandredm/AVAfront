import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import styles from './AutoAvaliacao.module.css'
import SubmitButton from '../form/SubmitButton'
import API_BASE_URL from '../ApiConfig';
import axios from '../../axiosConfig';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function AutoAvaliacao() {

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        }
      }, []);
    
      const navigate = useNavigate();
    
    /* ---------- get ------------ */

    const [avaliado2, setAvaliado2] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/acordo-desempenho2/`)
            .then(response => {
                setAvaliado2(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    /* -------- verificar progresso -------- */

    const verificarProgresso = async (avaliadoId) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/progresso_formulario/?avaliado=${avaliadoId}&tipo_avaliacao=AA`);
    
        const progressData = response.data.find((item) => item.pagina_atual === 1);
    
        if (progressData) {

          const periodoInicio = new Date(progressData.dados_progresso.periodo_inicio);
          const periodoFim = new Date(progressData.dados_progresso.periodo_fim);


          formik.setValues({
            ...formik.values,
            avaliado: avaliadoId,
            periodo_inicio: periodoInicio,
            periodo_fim: periodoFim,
            assiduidade: progressData.dados_progresso.assiduidade,
            disciplina: progressData.dados_progresso.disciplina,
            produtividade: progressData.dados_progresso.produtividade,
            iniciativa: progressData.dados_progresso.iniciativa,
            responsabilidade: progressData.dados_progresso.responsabilidade,
          });
        } else {
        }
      } catch (error) {
        // Handle the error if needed
        console.error(error);
      }
    };

    /* -------- post -------- */
    
    const formik = useFormik({
        initialValues: {
          periodo_inicio: '',
          periodo_fim: '',
          avaliado: '',
          assiduidade: '',
          disciplina: '',
          produtividade: '',
          iniciativa: '',
          responsabilidade: '',
        },
        validationSchema: Yup.object({
          periodo_inicio: Yup.date().required('Campo obrigatório'),
          periodo_fim: Yup.date().required('Campo obrigatório'),
          avaliado: Yup.string().required('Required'),
          assiduidade: Yup.string().required('Campo obrigatório'),
          disciplina: Yup.string().required('Campo obrigatório'),
          produtividade: Yup.string().required('Campo obrigatório'),
          iniciativa: Yup.string().required('Campo obrigatório'),
          responsabilidade: Yup.string().required('Campo obrigatório'),
        }),
        onSubmit: async (values) => {
            try {
              const serializedData = {
                periodo_inicio: values.periodo_inicio,
                periodo_fim: values.periodo_fim,
                assiduidade: values.assiduidade,
                disciplina: values.disciplina,
                produtividade: values.produtividade,
                iniciativa: values.iniciativa,
                responsabilidade: values.responsabilidade,
              }

              const response = await axios.post(`${API_BASE_URL}/progresso_formulario/`, {
                avaliado: values.avaliado,
                pagina_atual: 1,
                dados_progresso: serializedData,
                tipo_avaliacao: 'AA',
            });
              navigate('/auto-avaliacao2', { state: { avaliado: values.avaliado } });
              console.log(values.avaliado);
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

    <div>
      <label className={styles.servidor2} htmlFor="avaliado">Servidor:</label>
      <select
          className={styles.servidor}
          id="avaliado"
          name="avaliado"
          onChange={formik.handleChange}
          value={formik.values.avaliado}
          onBlur={(event) => {
            verificarProgresso(event.target.value);
          }}
      >
          <option value="">Selecione um servidor</option>
          {avaliado2.sort((a, b) => a.nome.localeCompare(b.nome)).map((user) => (
              <option key={user.id} value={user.id}>
              {user.nome}
              </option>
          ))}
      </select>
    

      {formik.touched.avaliado && formik.errors.avaliado ? (
          <div className={styles.error}>{formik.errors.avaliado}</div>
      ) : null}
    </div>

<div className={styles.periodocontainer}>
  

    {/* <div className={styles.periodoitem2}> */}
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
    {/* </div> */}
</div>

<div className={styles.form_control}>
        <label htmlFor="assiduidade">Assiduidade:</label>
        <p>Cumprimento da carga horária de trabalho estabelecida; pontualidade; comparecimento às reuniões e aos compromissos assumidos; aviso tempestivo de ausências, atrasos ou saídas antecipadas, permitindo organização do setor</p>
        <textarea
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
        <textarea
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
        <textarea
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
        <textarea
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
        <textarea
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
    <SubmitButton text="Enviar" />
    </form>

</div>
)
}

export default AutoAvaliacao