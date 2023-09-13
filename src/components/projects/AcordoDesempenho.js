import SubmitButton from '../form/SubmitButton'

import API_BASE_URL from '../ApiConfig';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import styles from './AcordoDesempenho.module.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from '../../axiosConfig';

function AcordoDesempenho(){

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        }
      }, []);

    const [avaliado, setAvaliado] = useState([]);
    const [avaliado2, setAvaliado2] = useState([]);

    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();


    /*----------- get lista de servidores para acordo do back /acordo-desempenho2-------------*/
    useEffect(() => {
        axios.get(`${API_BASE_URL}/acordo-desempenho2/`)
            .then(response => {
                setAvaliado2(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

/*----------- atualizar lista de servidores para acordo do back /acordo-desempenho2-------------*/
    
    useEffect(() => {
    if (submitted) {
        const getUsers = async () => {
        const response = await axios.get(`${API_BASE_URL}/acordo-desempenho2/`);
        setAvaliado2(response.data);
        setSubmitted(false);
        };

        getUsers();
    }
    }, [submitted]);




    /* ----------- get lista de servidores para acordo do back -------------
     useEffect(() => {
        axios.get(`${API_BASE_URL}/acordo-desempenho/`)
            .then(response => {
                setAvaliado(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

----------- atualizar lista de servidores para acordo do back -------------
    
    useEffect(() => {
    if (submitted) {
        const getUsers = async () => {
        const response = await axios.get(`${API_BASE_URL}/acordo-desempenho/`);
        setAvaliado(response.data);
        setSubmitted(false);
        };

        getUsers();
    }
    }, [submitted]); */

    /* -------- editar data --------- */

    const [periodoInicio, setPeriodoInicio] = useState(null);
    const [periodoFim, setPeriodoFim] = useState(null);

    const handlePeriodoInicioChange = (date) => {
        setPeriodoInicio(date);
        const newPeriodoFim = new Date(date);
        newPeriodoFim.setFullYear(newPeriodoFim.getFullYear() + 1);
        setPeriodoFim(newPeriodoFim);
      
        // Atualize o valor no Formik
        formik.setFieldValue('periodo_inicio', date);
        formik.setFieldValue('periodo_fim', newPeriodoFim);
      };
      

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

    /* -------- Formik --------- */

    const formik = useFormik({
        initialValues: {
          avaliado: '',
          periodo_inicio: '', // Novo campo para o início do período
          periodo_fim: '', // Novo campo para o fim do período
          atividades: [{ descricao_atividade: "", desempenho_esperado: "" }],
        },
        validationSchema: Yup.object({
          avaliado: Yup.string()
            .required('Required'),
          periodo_inicio: Yup.date()
            .required('Required'), // Validação para o início do período
          periodo_fim: Yup.date()
            .required('Required'), // Validação para o fim do período
          atividades: Yup.array().of(
            Yup.object().shape({
                descricao_atividade: Yup.string().required('Required'),
                desempenho_esperado: Yup.string().required('Required'),
            })
          ),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {      
            try {
              // Atualizando a serialização dos dados
              const serializedData = {
                avaliado: values.avaliado,
                periodo_inicio: moment(values.periodo_inicio).format('YYYY-MM-DD'),
                periodo_fim: moment(values.periodo_fim).format('YYYY-MM-DD'),
                atividades: values.atividades.map((atividade) => ({
                  descricao_atividade: atividade.descricao_atividade,
                  desempenho_esperado: atividade.desempenho_esperado,
                })),
              };
        
              const response = await axios.post(`${API_BASE_URL}/acordo-desempenho2/`, serializedData);

              resetForm();
            } catch (error) {
              // Lidar com o erro, exibir mensagem de erro para o usuário
            } finally {
              setSubmitting(false);
              setSubmitted(true);
              setShowMessage(true);
            }
        },
      });

    return(
        <div className={styles.avaliacao_container}>
            {showMessage && <div className={styles.success}>Acordo desempenho criado com sucesso!</div>}
            <form className={styles.form_control} onSubmit={formik.handleSubmit}>
                <h1>Acordo Desempenho</h1>
                <p>Planeje as Atividade dos servidores</p>
                <div className={styles.form_control}>

                    <label htmlFor="avaliado">Servidor:</label>
                    <select
                        id="avaliado"
                        name="avaliado"
                        onChange={formik.handleChange}
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


                    {/* Campos de atividades dinâmicos */}
                    {formik.values.atividades.map((atividade, index) => (
                    <div key={index} className={styles.form_control}>
                        <label htmlFor={`descricao_atividade_${index}`}>Descrição da atividade:</label>
                        <input
                            type="text"
                            id={`descricao_atividade_${index}`}
                            name={`atividades[${index}].descricao_atividade`}
                            value={atividade.descricao_atividade}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.atividades && formik.errors.atividades && formik.errors.atividades[index] && (
                        <div className={styles.error}>{formik.errors.atividades[index].descricao_atividade}</div>
                        )}


                        <label htmlFor={`desempenho_esperado_${index}`}>Desempenho esperado:</label>
                        <textarea 
                            type="text"
                            id={styles.meuInput}
                            name={`atividades[${index}].desempenho_esperado`}
                            value={atividade.desempenho_esperado}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.atividades && formik.errors.atividades && formik.errors.atividades[index] && (
                        <div className={styles.error}>{formik.errors.atividades[index].desempenho_esperado}</div>
                        )}


                        {/* Botão para remover a atividade */}
                        {index > 0 && (
                        <button
                            type="button"
                            id={styles.botao_remover}
                            onClick={() => {
                                const atividades = [...formik.values.atividades];
                                atividades.splice(index, 1);
                                formik.setFieldValue("atividades", atividades);
                            }}
                        >
                            Remover Atividade
                        </button>
                        )}
                    </div>
                    ))}

                    {/* Botão para adicionar uma nova atividade */}
                    {formik.values.atividades.length < 3 && (
                    <button
                        type="button"
                        id={styles.botao_adicionar}
                        onClick={() => {
                        const atividades = [...formik.values.atividades];
                        atividades.push({ descricao_atividade: "", desempenho_esperado: "" });
                        formik.setFieldValue("atividades", atividades);
                        }}
                    >
                        Adicionar Atividade
                    </button>
                    )}
                </div>
                {/* <button type="submit">Submit</button> */}
                <SubmitButton text="Enviar" />
            </form>
            
        </div>
    )
}

export default AcordoDesempenho
