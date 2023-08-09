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

function ColegasAvaliacao2() {

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        }
    }, []);

     /* ---------- get ------------ */

    const location = useLocation();
    const avaliado = location.state && location.state.avaliado ? location.state.avaliado : null;

    /* -------- get/progresso_formulario -------- */
    const [progresso, setProgresso] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/progresso_formulario/?avaliado=${avaliado}&tipo_avaliacao=CA`)
            .then(response => {
                setProgresso(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [avaliado])

    /* -------- post -------- */

    const navigate = useNavigate();
    
    const formik = useFormik({
        initialValues: {
            Num_11: 'N',
            Num_12: 'N',
            Num_13: 'N',
            Num_14: 'N',
            Num_15: 'N',
            Num_16: 'N',
            Num_17: 'N',
            Num_18: 'N',
            Num_19: 'N',
            Num_20: 'N',
        },
        validationSchema: Yup.object({
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
            
        }),
        onSubmit: async (values) => {
            try {
                const serializedData = {
                    Num_11: values.Num_11,
                    Num_12: values.Num_12,
                    Num_13: values.Num_13,
                    Num_14: values.Num_14,
                    Num_15: values.Num_15,
                    Num_16: values.Num_16,
                    Num_17: values.Num_17,
                    Num_18: values.Num_18,
                    Num_19: values.Num_19,
                    Num_20: values.Num_20,
                  };

                  const response = await axios.post(`${API_BASE_URL}/progresso_formulario/`, {
                    avaliado: avaliado,
                    pagina_atual: 2,
                    dados_progresso: serializedData,
                    tipo_avaliacao: 'CA',
                  });
                navigate('/colegas-avaliacao3', { state: { avaliado: avaliado } });

            } catch (error) {
            console.error(error);
            }
        },
    });

    useEffect(() => {
        const objetoPagina2 = progresso.find(item => item.pagina_atual === 2);
        if (objetoPagina2) {
          formik.setValues(objetoPagina2.dados_progresso);
        }
    }, [progresso]);      
    
return(
<div className={styles.avaliacao_container}>
    <form onSubmit={formik.handleSubmit}>
        
    <h1>Avaliação de Desempenho</h1>
    <p>Faça a avaliação dos seus colegas de trabalho</p>
    <h3 className={styles.titulo}>Disciplina:</h3>

        <div className={styles.form_control}>
            <label htmlFor="Num_11" className={styles.block}>11)</label>
            <p>Evita comentários comprometedores à imagem dos servidores, prejudiciais ao ambiente de trabalho.</p>

            <select
                className={styles.blockd}
                id="Num_11"
                name="Num_11"
                onChange={formik.handleChange}
                value={formik.values.Num_11}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_11 && formik.errors.Num_11 ? (
            <div className={styles.error}>{formik.errors.Num_11}</div>
            ) : null}

            <label htmlFor="Num_12" className={styles.block}>12)</label>
            <p>Conhece e observa a hierarquia funcional, cumprindo com presteza as ordens recebidas.</p>

            <select
                className={styles.blockd}
                id="Num_12"
                name="Num_12"
                onChange={formik.handleChange}
                value={formik.values.Num_12}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_12 && formik.errors.Num_12 ? (
            <div className={styles.error}>{formik.errors.Num_12}</div>
            ) : null}

            <label htmlFor="Num_13" className={styles.block}>13)</label>
            <p>Conhece e observa as atribuições de seu cargo.</p>

            <select
                className={styles.blockd}
                id="Num_13"
                name="Num_13"
                onChange={formik.handleChange}
                value={formik.values.Num_13}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_13 && formik.errors.Num_13 ? (
            <div className={styles.error}>{formik.errors.Num_13}</div>
            ) : null}

            <label htmlFor="Num_14" className={styles.block}>14)</label>
            <p>Ajusta-se às situações ambientais. Sabe receber e acatar críticas e aceitar mudanças.</p>

            <select
                className={styles.blockd}
                id="Num_14"
                name="Num_14"
                onChange={formik.handleChange}
                value={formik.values.Num_14}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_14 && formik.errors.Num_14 ? (
            <div className={styles.error}>{formik.errors.Num_14}</div>
            ) : null}

            <label htmlFor="Num_15" className={styles.block}>15)</label>
            <p>Coopera e participa efetivamente dos trabalhos em equipe, revelando consciência de grupo e harmonia coletiva.</p>

            <select
                className={styles.blockd}
                id="Num_15"
                name="Num_15"
                onChange={formik.handleChange}
                value={formik.values.Num_15}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_15 && formik.errors.Num_15 ? (
            <div className={styles.error}>{formik.errors.Num_15}</div>
            ) : null}

            <label htmlFor="Num_16" className={styles.block}>16)</label>
            <p>Demonstra zelo pelo trabalho. Comporta-se com reserva sobre o assunto de interesse exclusivamente interno.</p>

            <select
                className={styles.blockd}
                id="Num_16"
                name="Num_16"
                onChange={formik.handleChange}
                value={formik.values.Num_16}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_16 && formik.errors.Num_16 ? (
            <div className={styles.error}>{formik.errors.Num_16}</div>
            ) : null}

            <label htmlFor="Num_17" className={styles.block}>17)</label>
            <p>Mantém assuntos particulares fora do ambiente de trabalho, evitando resolver problemas pessoais na hora de expediente.</p>

            <select
                className={styles.blockd}
                id="Num_17"
                name="Num_17"
                onChange={formik.handleChange}
                value={formik.values.Num_17}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_17 && formik.errors.Num_17 ? (
            <div className={styles.error}>{formik.errors.Num_17}</div>
            ) : null}

            <label htmlFor="Num_18" className={styles.block}>18)</label>
            <p>Demonstra disciplina em seus atos, comportamentos e atitudes, cumprindo e aceitando as normas e regulamentos estabelecidos.</p>

            <select
                className={styles.blockd}
                id="Num_18"
                name="Num_18"
                onChange={formik.handleChange}
                value={formik.values.Num_18}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_18 && formik.errors.Num_18 ? (
            <div className={styles.error}>{formik.errors.Num_18}</div>
            ) : null}

            <label htmlFor="Num_19" className={styles.block}>19)</label>
            <p>Cumpre	e	não	tenta	burlar	as	normas	e	regulamentos estabelecidos</p>

            <select
                className={styles.blockd}
                id="Num_19"
                name="Num_19"
                onChange={formik.handleChange}
                value={formik.values.Num_19}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_19 && formik.errors.Num_19 ? (
            <div className={styles.error}>{formik.errors.Num_19}</div>
            ) : null}

            <label htmlFor="Num_20" className={styles.block}>20)</label>
            <p>Trata a todos com cortesia e educação, evitando tratamentos e posturas discriminatórias e empenhando-se em ser prestativo.</p>

            <select
                className={styles.blockd}
                id="Num_20"
                name="Num_20"
                onChange={formik.handleChange}
                value={formik.values.Num_20}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_20 && formik.errors.Num_20 ? (
            <div className={styles.error}>{formik.errors.Num_20}</div>
            ) : null}
        </div>
        <SubmitButton text="Enviar" />
    </form>
</div>
)
}

export default ColegasAvaliacao2