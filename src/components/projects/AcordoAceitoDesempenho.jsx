import SubmitButton from '../form/SubmitButton'

import API_BASE_URL from '../ApiConfig';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import styles from './AcordoAceitoDesempenho.module.css'
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

    

    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();


    /*----------- get lista de acordo desempenho para acordo do back /AcordoAceitoDesempenho/ -------------*/
    const [acordo, setAcordo] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/ver_acordo_desempenho/`)
            .then(response => {
                setAcordo(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    /*----------- atualizar lista de acordo desempenho para acordo do back /AcordoAceitoDesempenho/ -------------*/
    
    useEffect(() => {
      if (submitted) {
          const getUsers = async () => {
          const response = await axios.get(`${API_BASE_URL}/ver_acordo_desempenho/`);
          setAcordo(response.data);
          setSubmitted(false);
          };
  
          getUsers();
      }
      }, [submitted]);

    /* -------- mensagem --------- */

    const [showMessageAprovado, setShowMessageAprovado] = useState(false);

    useEffect(() => {
    let timer;
    if (showMessageAprovado) {
        timer = setTimeout(() => {
        setShowMessageAprovado(false);
        setShowMessageAprovado('');
        }, 3000);
    }
    return () => {
        clearTimeout(timer);
    };
    }, [showMessageAprovado]);

    /* -------- mensagem --------- */

    const [showMessageRecusado, setShowMessageRecusado] = useState(false);

    useEffect(() => {
    let timer;
    if (showMessageRecusado) {
        timer = setTimeout(() => {
        setShowMessageRecusado(false);
        setShowMessageRecusado('');
        }, 3000);
    }
    return () => {
        clearTimeout(timer);
    };
    }, [showMessageRecusado]);

    /* -------- Formik --------- */

    const handleRecusar = async (id) => {
      try {
        await axios.put(`${API_BASE_URL}/ver_acordo_desempenho/${id}/`, { foi_visto_aceito: false });
        // Atualizar o estado para refletir a atualização
        setAcordo(acordo.map(item => item.id === id ? { ...item, foi_visto_aceito: false } : item));
      } catch (error) {
        // Lidar com o erro
      } finally {
        setSubmitted(true);
        setShowMessageRecusado(true);
      }
    };
  
    const handleAprovar = async (id) => {
      try {
        await axios.put(`${API_BASE_URL}/ver_acordo_desempenho/${id}/`, { foi_visto_aceito: true });
        // Atualizar o estado para refletir a atualização
        setAcordo(acordo.map(item => item.id === id ? { ...item, foi_visto_aceito: true } : item));
      } catch (error) {
        // Lidar com o erro
      } finally {
        setSubmitted(true);
        setShowMessageAprovado(true);
      }
    };
  
    const formik = useFormik({
      initialValues: {
        aceito: '',
      },
      validationSchema: Yup.object({
        aceito: Yup.string()
          .required('Required')
      }),
    });

    return(
        <div className={styles.avaliacao_container}>
            {showMessageRecusado && <div className={styles.error_message}>Acordo Desempenho Recusado!</div>}
            {showMessageAprovado && <div className={styles.success}>Acordo Desempenho Aprovado!</div>}
                <h1>Acordo Desempenho</h1>
                <p className={styles.subtitulo}>Confira ou Recuse o arcordo desempenho criado</p>
                
                {acordo.length === 0 ? (
                    <p className={styles.sem_acordo}>Você ainda não tem nenhum Acordo Desempenho</p>
                ) : (

                <div>
                    {acordo.map(ad => (
                        <div className={styles.aceito} key={ad.id}>
                          {ad.aceito === false && <p className={styles.error_message}>Acordo Recusado</p>}
                          {ad.foi_visto_aceito === true && <p className={styles.certo_message}>Acordo Aceito</p>}
                            <p><strong>Avaliador:</strong> {ad.nome_avaliador}</p>
                            <p><strong>Avaliado:</strong> {ad.avaliado}</p>
                            <p><strong>periodo:</strong> {ad.periodo_inicio} até {ad.periodo_fim}</p>
                            <p><strong>Foi aceito:</strong> {ad.aceito ? 'Sim' : 'Não'}</p>
                            
                            {ad.atividades.map((atividade, index) => (
                                <div key={index}>
                                    <h3 className={styles.atividades}>Atividade {index + 1}:</h3>
                                    <div className={styles.atividades2}> 
                                      <p> <strong>Descrição:</strong> {atividade.descricao_atividade}</p>
                                      <p> <strong>Desempenho Esperado:</strong></p>
                                      <p>{atividade.desempenho_esperado}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                )}


                <div className={styles.form_control}>
                  {acordo.map(item => (
                    <div key={item.id}>
                      {(!item.foi_visto_aceito || !item.aceito) && (
                        <>
                          <button className={styles.buttonRed} onClick={() => handleRecusar(item.id)}>Recusar</button>
                          <button className={styles.buttonGreen} onClick={() => handleAprovar(item.id)}>Aprovar</button>
                        </>
                      )}
                    </div>
                  ))}
                </div>

        </div>
    )
}

export default AcordoDesempenho
