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

function AutoAvaliacao4() {

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
          Num_1: '',
          Num_2: '',
          Num_3: '',
          Num_4: '',
          Num_5: '',
          Num_6: '',
          Num_7: '',
          Num_8: '',
          Num_9: '',
          Num_10: '',
          Num_11: '',
          Num_12: '',
          Num_13: '',
          Num_14: '',
          Num_15: '',
          Num_16: '',
          Num_17: '',
          Num_18: '',
          Num_19: '',
          Num_20: '',
          Num_21: '',
          Num_22: '',
          Num_23: '',
          BNum_1: 'N',
          BNum_2: 'N',
          BNum_3: 'N',
          BNum_4: 'N',
          BNum_5: 'N',
          BNum_6: 'N',
          BNum_7: 'N',
          BNum_8: 'N',
          BNum_9: 'N',
          BNum_10: 'N',
          BNum_11: 'N',
          BNum_12: 'N',
        },
        validationSchema: Yup.object({
          periodo_inicio: Yup.date().required('Campo obrigatório'),
          periodo_fim: Yup.date().required('Campo obrigatório'),
          assiduidade: Yup.string().required('Campo obrigatório'),
          disciplina: Yup.string().required('Campo obrigatório'),
          produtividade: Yup.string().required('Campo obrigatório'),
          iniciativa: Yup.string().required('Campo obrigatório'),
          responsabilidade: Yup.string().required('Campo obrigatório'),
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
          Num_1: Yup.string().required('Campo obrigatório'),
          Num_2: Yup.string().required('Campo obrigatório'),
          Num_3: Yup.string().required('Campo obrigatório'),
          Num_4: Yup.string().required('Campo obrigatório'),
          Num_5: Yup.string().required('Campo obrigatório'),
          Num_6: Yup.string().required('Campo obrigatório'),
          Num_7: Yup.string().required('Campo obrigatório'),
          Num_8: Yup.string().required('Campo obrigatório'),
          Num_9: Yup.string().required('Campo obrigatório'),
          Num_10: Yup.string().required('Campo obrigatório'),
          Num_11: Yup.string().required('Campo obrigatório'),
          Num_12: Yup.string().required('Campo obrigatório'),
          Num_13: Yup.string().required('Campo obrigatório'),
          Num_14: Yup.string().required('Campo obrigatório'),
          Num_15: Yup.string().required('Campo obrigatório'),
          Num_16: Yup.string().required('Campo obrigatório'),
          Num_17: Yup.string().required('Campo obrigatório'),
          Num_18: Yup.string().required('Campo obrigatório'),
          Num_19: Yup.string().required('Campo obrigatório'),
          Num_20: Yup.string().required('Campo obrigatório'),
          Num_21: Yup.string().required('Campo obrigatório'),
          Num_22: Yup.string().required('Campo obrigatório'),
          Num_23: Yup.string().required('Campo obrigatório'),
          BNum_1: Yup.string().required('Campo obrigatório'),
          BNum_2: Yup.string().required('Campo obrigatório'),
          BNum_3: Yup.string().required('Campo obrigatório'),
          BNum_4: Yup.string().required('Campo obrigatório'),
          BNum_5: Yup.string().required('Campo obrigatório'),
          BNum_6: Yup.string().required('Campo obrigatório'),
          BNum_7: Yup.string().required('Campo obrigatório'),
          BNum_8: Yup.string().required('Campo obrigatório'),
          BNum_9: Yup.string().required('Campo obrigatório'),
          BNum_10: Yup.string().required('Campo obrigatório'),
          BNum_11: Yup.string().required('Campo obrigatório'),
          BNum_12: Yup.string().required('Campo obrigatório'),
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
            <h3 className={styles.aspectos2}>Durante esse período, você apresentou os seguintes comportamentos ou atitudes?</h3>
                        
            <label htmlFor="BNum_1" className={styles.block}>1)</label>
            <p>Apresenta dificuldade de relacionamento ocasionando problemas com outras pessoas</p>
                        
            <select
                className={styles.blockd}
                id="BNum_1"
                name="BNum_1"
                onChange={formik.handleChange}
                value={formik.values.BNum_1}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.BNum_1 && formik.errors.BNum_1 ? (
            <div className={styles.error}>{formik.errors.BNum_1}</div>
            ) : null}

            <label htmlFor="BNum_2" className={styles.block}>2)</label>
            <p>Entende como pessoais as críticas que lhe são feitas no trabalho.</p>
                        
            <select
                className={styles.blockd}
                id="BNum_2"
                name="BNum_2"
                onChange={formik.handleChange}
                value={formik.values.BNum_2}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.BNum_2 && formik.errors.BNum_2 ? (
            <div className={styles.error}>{formik.errors.BNum_2}</div>
            ) : null}

            <label htmlFor="BNum_3" className={styles.block}>3)</label>
            <p>Desrespeita as opiniões de colegas quando discorda das mesmas</p>
                        
            <select
                className={styles.blockd}
                id="BNum_3"
                name="BNum_3"
                onChange={formik.handleChange}
                value={formik.values.BNum_3}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.BNum_3 && formik.errors.BNum_3 ? (
            <div className={styles.error}>{formik.errors.BNum_3}</div>
            ) : null}

            <label htmlFor="BNum_4" className={styles.block}>4)</label>
            <p>Atrasa	ou	ausenta-se	sem	justificativa,	prejudicando	o	planejamento ou atividades da unidade ou do setor.</p>
                        
            <select
                className={styles.blockd}
                id="BNum_4"
                name="BNum_4"
                onChange={formik.handleChange}
                value={formik.values.BNum_4}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.BNum_4 && formik.errors.BNum_4 ? (
            <div className={styles.error}>{formik.errors.BNum_4}</div>
            ) : null}

            <label htmlFor="BNum_5" className={styles.block}>5)</label>
            <p>Demonstra dificuldade para aceitar novos métodos e soluções, ou questiona as situações de maneira negativa. Justifica-se com expressões como: “sempre foi feito assim”</p>
            
            <select
                className={styles.blockd}
                id="BNum_5"
                name="BNum_5"
                onChange={formik.handleChange}
                value={formik.values.BNum_5}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.BNum_5 && formik.errors.BNum_5 ? (
            <div className={styles.error}>{formik.errors.BNum_5}</div>
            ) : null}

            <label htmlFor="BNum_6" className={styles.block}>6)</label>
            <p>Apresenta subterfúgios para não seguir normas e procedimentos</p>
            
            <select
                className={styles.blockd}
                id="BNum_6"
                name="BNum_6"
                onChange={formik.handleChange}
                value={formik.values.BNum_6}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.BNum_6 && formik.errors.BNum_6 ? (
            <div className={styles.error}>{formik.errors.BNum_6}</div>
            ) : null}

            <label htmlFor="BNum_7" className={styles.block}>7)</label>
            <p>Falta com o cuidado no uso e conservação de materiais e equipamentos, sem a devida atenção à eficiência e à economia dos recursos disponíveis.</p>
            
            <select
                className={styles.blockd}
                id="BNum_7"
                name="BNum_7"
                onChange={formik.handleChange}
                value={formik.values.BNum_7}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.BNum_7 && formik.errors.BNum_7 ? (
            <div className={styles.error}>{formik.errors.BNum_7}</div>
            ) : null}

            <label htmlFor="BNum_8" className={styles.block}>8)</label>
            <p>Faz somente o que lhe demandam mesmo quando possui conhecimento necessário para fazer além.</p>
            
            <select
                className={styles.blockd}
                id="BNum_8"
                name="BNum_8"
                onChange={formik.handleChange}
                value={formik.values.BNum_8}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.BNum_8 && formik.errors.BNum_8 ? (
            <div className={styles.error}>{formik.errors.BNum_8}</div>
            ) : null}

            <label htmlFor="BNum_9" className={styles.block}>9)</label>
            <p>Ocasiona sobrecarga para os outros e/ou prejudica os resultados finais ao não se empenhar como poderia nas atividades em que se envolve.</p>
            
            <select
                className={styles.blockd}
                id="BNum_9"
                name="BNum_9"
                onChange={formik.handleChange}
                value={formik.values.BNum_9}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.BNum_9 && formik.errors.BNum_9 ? (
            <div className={styles.error}>{formik.errors.BNum_9}</div>
            ) : null}

            <label htmlFor="BNum_10" className={styles.block}>10)</label>
            <p>Atende somente situações que se enquadrem na mais absoluta rotina de seu trabalho.</p>
            
            <select
                className={styles.blockd}
                id="BNum_10"
                name="BNum_10"
                onChange={formik.handleChange}
                value={formik.values.BNum_10}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.BNum_10 && formik.errors.BNum_10 ? (
            <div className={styles.error}>{formik.errors.BNum_10}</div>
            ) : null}

            <label htmlFor="BNum_11" className={styles.block}>11)</label>
            <p>Demonstra falta de autonomia no desempenho de suas tarefas.</p>
            
            <select
                className={styles.blockd}
                id="BNum_11"
                name="BNum_11"
                onChange={formik.handleChange}
                value={formik.values.BNum_11}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.BNum_11 && formik.errors.BNum_11 ? (
            <div className={styles.error}>{formik.errors.BNum_11}</div>
            ) : null}

            <label htmlFor="BNum_12" className={styles.block}>12)</label>
            <p>Sem justificativa plausível, recusa participar de representações e comissões de sua unidade ou da ALRN, sobrecarregando as atribuições dos demais</p>
            
            <select
                className={styles.blockd}
                id="BNum_12"
                name="BNum_12"
                onChange={formik.handleChange}
                value={formik.values.BNum_12}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.BNum_12 && formik.errors.BNum_12 ? (
            <div className={styles.error}>{formik.errors.BNum_12}</div>
            ) : null}
        </div>
    )
}

export default AutoAvaliacao4