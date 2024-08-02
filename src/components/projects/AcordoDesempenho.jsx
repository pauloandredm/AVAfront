import SubmitButton from '../form/SubmitButton'

import API_BASE_URL from '../ApiConfig';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import styles from './AcordoDesempenho.module.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import { useState, useEffect } from 'react'
import { useSearchParams, useLocation } from "react-router-dom";
import axios from '../../axiosConfig';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import 'bootstrap/dist/css/bootstrap.min.css';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  accordionDetails: {
    padding: 0,
  },
  container: {
    padding: 0,
    maxWidth: 'none',
  },
}));


function AcordoDesempenho() {
  
  const classes = useStyles();

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    }
  }, []);

  const [avaliado2, setAvaliado2] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [selectedServidor, setSelectedServidor] = useState(null);
  const [periodoInicio, setPeriodoInicio] = useState(null);
  const [periodoFim, setPeriodoFim] = useState(null);

  const formik = useFormik({
    initialValues: {
      avaliado: '',
      periodo_inicio: '',
      periodo_fim: '',
      atividades: [{ descricao_atividade: "", desempenho_esperado: "" }],
    },
    validationSchema: Yup.object({
      avaliado: Yup.string().required("Necessario preencher o campo 'avaliado'"),
      periodo_inicio: Yup.date().required("Necessario preencher o campo 'inicio do periodo'"),
      periodo_fim: Yup.date().required("Necessario preencher o campo 'fim do periodo'"),
      atividades: Yup.array().of(
        Yup.object().shape({
          descricao_atividade: Yup.string().required("Necessario preencher o campo 'descrição da atividade'"),
          desempenho_esperado: Yup.string().required("Necessario preencher o campo 'desempenho esperado'"),
        })
      ),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (!selectedServidor) {
          return;
        }

        const serializedData = {
          avaliado: values.avaliado,
          avaliado_matricula: selectedServidor.matricula,
          chefia_imediata: selectedServidor.chefia,
          funcao_confianca: selectedServidor.funcao_confianca,
          periodo_inicio: moment(values.periodo_inicio).format('YYYY-MM-DD'),
          periodo_fim: moment(values.periodo_fim).format('YYYY-MM-DD'),
          atividades: values.atividades.map((atividade) => ({
            descricao_atividade: atividade.descricao_atividade,
            desempenho_esperado: atividade.desempenho_esperado,
          })),
        };

        await axios.post(`${API_BASE_URL}/acordo_desempenho/`, serializedData);

        resetForm();
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
        setSubmitted(true);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await axios.get(`${API_BASE_URL}/acordo_desempenho/`);
        console.log("Response data:", response.data);
        setAvaliado2(response.data);

        const servidorMatricula = searchParams.get('servidorMatricula');
        console.log("Servidor matricula from URL:", servidorMatricula);
        if (servidorMatricula) {
          const selected = response.data.find(servidor => servidor.matricula === servidorMatricula);
          console.log("Selected servidor:", selected);
          if (selected) {
            setSelectedServidor(selected);
            formik.setFieldValue('avaliado', selected.id, false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [searchParams]);

  const handleChangeServidor = (e) => {
    formik.handleChange(e);
    const selectedId = e.target.value;
    const selected = avaliado2.find(servidor => servidor.id.toString() === selectedId);
    setSelectedServidor(selected);
  };

  useEffect(() => {
    if (selectedServidor) {
      console.log("Setting field value for 'avaliado' to:", selectedServidor.nome);
      formik.setFieldValue('avaliado', selectedServidor.nome);
    }
  }, [selectedServidor]);

  const handlePeriodoInicioChange = (date) => {
    setPeriodoInicio(date);
    const newPeriodoFim = new Date(date);
    newPeriodoFim.setFullYear(newPeriodoFim.getFullYear() + 1);
    setPeriodoFim(newPeriodoFim);

    formik.setFieldValue('periodo_inicio', date);
    formik.setFieldValue('periodo_fim', newPeriodoFim);
  };

  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;



  const handleAddAtividade = () => {
    const atividades = [...formik.values.atividades];
    atividades.push({ descricao_atividade: '', desempenho_esperado: '' });
    formik.setFieldValue('atividades', atividades);
  };

  const handleRemoveAtividade = (index) => {
    const atividades = [...formik.values.atividades];
    atividades.splice(index, 1);
    formik.setFieldValue('atividades', atividades);
  };


  return (
    <div className={styles.avaliacao_container}>
      <form className={styles.form_control} onSubmit={formik.handleSubmit}>
        <h1>Acordo de Desempenho</h1>
        <p className={styles.p_data}>Acordo de desempenho referente aos últimos 12 meses ({lastYear} - {currentYear})</p>
        <p>Planeje as Atividade dos servidores</p>

        {avaliado2.length > 0 ? (
          <div className={styles.div_form_control}>
            <label htmlFor="avaliado">Servidor:</label>
            <select
              className={styles.select_servidor}
              id="avaliado"
              name="avaliado"
              onChange={(e) => {
                formik.handleChange(e);
                const selectedId = e.target.value;
                const selected = avaliado2.find(servidor => servidor.id.toString() === selectedId);
                setSelectedServidor(selected);
              }}
              value={formik.values.avaliado}
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

            <div className={styles.periodocontainer}>
              <div className={styles.periodoitem}>
                <label htmlFor="periodo_inicio">Início do Período:</label>
                <DatePicker
                  className={styles.date_picker}
                  id="periodo_inicio"
                  name="periodo_inicio"
                  selected={periodoInicio}
                  onChange={handlePeriodoInicioChange}
                  dateFormat="dd/MM/yyyy"
                  isClearable
                />
                {formik.touched.periodo_inicio && formik.errors.periodo_inicio ? (
                  <div className={styles.error}>{formik.errors.periodo_inicio}</div>
                ) : null}
              </div>
              <div className={styles.periodoitem}>
                <label htmlFor="periodo_fim">Fim do Período:</label>
                <DatePicker
                  className={styles.date_picker}
                  id="periodo_fim"
                  name="periodo_fim"
                  selected={periodoFim}
                  onChange={(date) => {
                    setPeriodoFim(date);
                    formik.setFieldValue('periodo_fim', date);
                  }}
                  dateFormat="dd/MM/yyyy"
                  isClearable
                />
                {formik.touched.periodo_fim && formik.errors.periodo_fim ? (
                  <div className={styles.error}>{formik.errors.periodo_fim}</div>
                ) : null}
              </div>
            </div>

            <Container className={classes.container}>
            {formik.values.atividades.map((atividade, index) => (
              <Accordion key={index} defaultExpanded={index === 0}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >
                  <Typography>
                    {index === 0 ? 'Atividade 1' : `Atividade ${index + 1}`}
                    {index === formik.values.atividades.length - 1 && formik.values.atividades.length < 3 && (
                      <Button variant="text" onClick={handleAddAtividade}>
                        + Adicionar Atividade
                      </Button>
                    )}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                  <div>
                    <TextField
                      label="Descrição da atividade"
                      name={`atividades[${index}].descricao_atividade`}
                      value={atividade.descricao_atividade}
                      onChange={formik.handleChange}
                      error={formik.touched.atividades && Boolean(formik.errors.atividades?.[index]?.descricao_atividade)}
                      helperText={formik.touched.atividades && formik.errors.atividades?.[index]?.descricao_atividade}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Desempenho esperado"
                      name={`atividades[${index}].desempenho_esperado`}
                      value={atividade.desempenho_esperado}
                      onChange={formik.handleChange}
                      error={formik.touched.atividades && Boolean(formik.errors.atividades?.[index]?.desempenho_esperado)}
                      helperText={formik.touched.atividades && formik.errors.atividades?.[index]?.desempenho_esperado}
                      fullWidth
                      margin="normal"
                      multiline
                    />
                    {index > 0 && (
                      <Button variant="contained" color="secondary" onClick={() => handleRemoveAtividade(index)}>
                        Remover Atividade
                      </Button>
                    )}
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </Container>
            
          </div>
        ) : (
          <h1 className={styles.h1_sem_servidor}>Você não tem mais nenhum acordo de desempenho a ser feito</h1>
        )}
        <SubmitButton text="Enviar" className={styles.botao_enviar} />
      </form>
    </div>
  );
}

export default AcordoDesempenho;