import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import styles from './AutoAvaliacao.module.css'
import SubmitButton from '../form/SubmitButton'
import API_BASE_URL from '../ApiConfig';
import axios from '../../axiosConfig';

import moment from 'moment';

import { useFormik } from 'formik';
import * as Yup from 'yup';

function AutoAvaliacao4() {

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        }
    }, []);

    const location = useLocation();
    const avaliado = location.state && location.state.avaliado ? location.state.avaliado : null;

    /* -------- get/progresso_formulario -------- */
    const [progresso, setProgresso] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/progresso_formulario/?avaliado=${avaliado}`)
            .then(response => {
                setProgresso(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    /* -------- post -------- */

    const navigate = useNavigate();
    
    const formik = useFormik({
        initialValues: {
            avaliado: avaliado,
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
            periodo_inicio: Yup.string().required('Campo obrigatório'),
            periodo_fim: Yup.string().required('Campo obrigatório'),
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
                const serializedData = {
                    ...progresso.find(item => item.pagina_atual === 1).dados_progresso,
                    ...progresso.find(item => item.pagina_atual === 2).dados_progresso,
                    ...progresso.find(item => item.pagina_atual === 3).dados_progresso,
                    periodo_inicio: moment(values.periodo_inicio).format('YYYY-MM-DD'),
                    periodo_fim: moment(values.periodo_fim).format('YYYY-MM-DD'),
                    BNum_1: values.BNum_1,
                    BNum_2: values.BNum_2,
                    BNum_3: values.BNum_3,
                    BNum_4: values.BNum_4,
                    BNum_5: values.BNum_5,
                    BNum_6: values.BNum_6,
                    BNum_7: values.BNum_7,
                    BNum_8: values.BNum_8,
                    BNum_9: values.BNum_9,
                    BNum_10: values.BNum_10,
                    BNum_11: values.BNum_11,
                    BNum_12: values.BNum_12,
                    avaliado: avaliado
                  };

                  const serializedData2 = {
                    BNum_1: values.BNum_1,
                    BNum_2: values.BNum_2,
                    BNum_3: values.BNum_3,
                    BNum_4: values.BNum_4,
                    BNum_5: values.BNum_5,
                    BNum_6: values.BNum_6,
                    BNum_7: values.BNum_7,
                    BNum_8: values.BNum_8,
                    BNum_9: values.BNum_9,
                    BNum_10: values.BNum_10,
                    BNum_11: values.BNum_11,
                    BNum_12: values.BNum_12,
                  };

                  const response = await axios.post(`${API_BASE_URL}/avaliacao-auto-avaliacao/`, serializedData);
                  
                  const response1 = await axios.post(`${API_BASE_URL}/progresso_formulario/`, {
                    avaliado: avaliado,
                    pagina_atual: 4,
                    dados_progresso: serializedData2,
                  });
                navigate('/');

            } catch (error) {
            console.error(error);
            }
        },
    });

useEffect(() => {
    const objetoPagina4 = progresso.find(item => item.pagina_atual === 4);
    if (objetoPagina4) {
      formik.setValues(objetoPagina4.dados_progresso);
    }
}, [progresso]);


useEffect(() => {

    const pagina1Data = progresso.find(item => item.pagina_atual === 1);
    const pagina2Data = progresso.find(item => item.pagina_atual === 2);
    const pagina3Data = progresso.find(item => item.pagina_atual === 3);
  
    if (pagina1Data && pagina2Data && pagina3Data) {

      const formattedData = {
        ...pagina1Data.dados_progresso,
        ...pagina2Data.dados_progresso,
        ...pagina3Data.dados_progresso,
        periodo_inicio: new Date(pagina1Data.dados_progresso.periodo_inicio),
        periodo_fim: new Date(pagina1Data.dados_progresso.periodo_fim),
        BNum_1: formik.initialValues.BNum_1,
        BNum_2: formik.initialValues.BNum_2,
        BNum_3: formik.initialValues.BNum_3,
        BNum_4: formik.initialValues.BNum_4,
        BNum_5: formik.initialValues.BNum_5,
        BNum_6: formik.initialValues.BNum_6,
        BNum_7: formik.initialValues.BNum_7,
        BNum_8: formik.initialValues.BNum_8,
        BNum_9: formik.initialValues.BNum_9,
        BNum_10: formik.initialValues.BNum_10,
        BNum_11: formik.initialValues.BNum_11,
        BNum_12: formik.initialValues.BNum_12,
      };
  
      formik.setValues(formattedData);
    }
}, [progresso]);
    
return(
<div className={styles.avaliacao_container}>
    <form onSubmit={formik.handleSubmit}>
        <h3 className={styles.aspectos2}>Durante esse período, você apresentou os seguintes comportamentos ou atitudes?</h3>
        <div className={styles.form_control}>
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
        <SubmitButton text="Enviar" />
    </form>
</div>
)
}

export default AutoAvaliacao4