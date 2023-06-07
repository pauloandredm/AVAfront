import SubmitButton from '../form/SubmitButton'

import API_BASE_URL from '../ApiConfig';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import styles from './AcordoDesempenho.module.css'

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
    const [chefia, setChefia] = useState([]);

    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    /*----------- get lista de servidores para acordo do back -------------*/
    useEffect(() => {
        axios.get(`${API_BASE_URL}/acordo-desempenho/`)
            .then(response => {
                setAvaliado(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

/*----------- atualizar lista de servidores para acordo do back -------------*/
    
    useEffect(() => {
    if (submitted) {
        const getUsers = async () => {
        const response = await axios.get(`${API_BASE_URL}/acordo-desempenho/`);
        setAvaliado(response.data);
        setSubmitted(false);
        };

        getUsers();
    }
    }, [submitted]);

    /*----------- get lista de usuarios chefia imediata do back -------------*/
    
    useEffect(() => {
        axios.get(`${API_BASE_URL}/acordo-desempenho2/`)
            .then(response => {
                setChefia(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

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
          chefia_imediata: '',
          funcao_confianca: false,
          atividades: [{ descricao_atividade: "", desempenho_esperado: "" }],
        },
        validationSchema: Yup.object({
          avaliado: Yup.string()
            .required('Required'),
          chefia_imediata: Yup.string()
            .required('Required'),
          funcao_confianca: Yup.string()
            .required('Required'),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {      
            try {
              // Atualizando a serialização dos dados
              const serializedData = {
                avaliado: values.avaliado,
                chefia_imediata: values.chefia_imediata,
                funcao_confianca: values.funcao_confianca,
                atividades: values.atividades.map((atividade) => ({
                  descricao_atividade: atividade.descricao_atividade,
                  desempenho_esperado: atividade.desempenho_esperado,
                })),
              };
        
              const response = await axios.post(`${API_BASE_URL}/acordo-desempenho/`, serializedData);
              /* navigate('/acordo-desempenho'); */
              // Processar a resposta, exibir mensagem de sucesso para o usuário
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
                        {avaliado.map((user) => (
                            <option key={user.id} value={user.id}>
                            {user.nome}
                            </option>
                        ))}
                    </select>

                    {formik.touched.avaliado && formik.errors.avaliado ? (
                        <div className={styles.error}>{formik.errors.avaliado}</div>
                    ) : null}


                    <label htmlFor="chefia_imediata">Chefia imediata:</label>
                    <select
                        id="chefia_imediata"
                        name="chefia_imediata"
                        onChange={formik.handleChange}
                        value={formik.values.chefia_imediata}
                    >
                        <option value="">Selecione um servidor</option>
                        {chefia.map((user) => (
                            <option key={user.id} value={user.id}>
                            {user.nome}
                            </option>
                        ))}
                    </select>

                    {formik.touched.chefia_imediata && formik.errors.chefia_imediata ? (
                        <div className={styles.error}>{formik.errors.chefia_imediata}</div>
                    ) : null}

                    <label htmlFor="funcao_confianca" id={styles.checkboxLabel}>Função de Confiança:</label>
                    <input
                    id={styles.checkbox}
                    type="checkbox"
                    name="funcao_confianca"
                    checked={formik.values.funcao_confianca}
                    onChange={formik.handleChange}
                    />

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

                        <label htmlFor={`desempenho_esperado_${index}`}>Desempenho esperado:</label>
                        <textarea 
                            type="text"
                            id={styles.meuInput}
                            name={`atividades[${index}].desempenho_esperado`}
                            value={atividade.desempenho_esperado}
                            onChange={formik.handleChange}
                        />

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
                </div>
                {/* <button type="submit">Submit</button> */}
                <SubmitButton text="Enviar" />
            </form>
            
        </div>
    )
}

export default AcordoDesempenho
