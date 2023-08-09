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

function ColegasAvaliacao5() {

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
            Num_41: 'N',
            Num_42: 'N',
            Num_43: 'N',
            Num_44: 'N',
            Num_45: 'N',
            Num_46: 'N',
            Num_47: 'N',
            Num_48: 'N',
            Num_49: 'N',
            Num_50: 'N',
        },
        validationSchema: Yup.object({
            Num_41: Yup.string().required('Campo obrigatório'),
            Num_42: Yup.string().required('Campo obrigatório'),
            Num_43: Yup.string().required('Campo obrigatório'),
            Num_44: Yup.string().required('Campo obrigatório'),
            Num_45: Yup.string().required('Campo obrigatório'),
            Num_46: Yup.string().required('Campo obrigatório'),
            Num_47: Yup.string().required('Campo obrigatório'),
            Num_48: Yup.string().required('Campo obrigatório'),
            Num_49: Yup.string().required('Campo obrigatório'),
            Num_50: Yup.string().required('Campo obrigatório'),
            
        }),
        onSubmit: async (values) => {
            try {
                const serializedData = {
                    Num_41: values.Num_41,
                    Num_42: values.Num_42,
                    Num_43: values.Num_43,
                    Num_44: values.Num_44,
                    Num_45: values.Num_45,
                    Num_46: values.Num_46,
                    Num_47: values.Num_47,
                    Num_48: values.Num_48,
                    Num_49: values.Num_49,
                    Num_50: values.Num_50,
                  };

                  const response = await axios.post(`${API_BASE_URL}/progresso_formulario/`, {
                    avaliado: avaliado,
                    pagina_atual: 5,
                    dados_progresso: serializedData,
                    tipo_avaliacao: 'CA',
                  });
                  navigate('/');

            } catch (error) {
            console.error(error);
            }
        },
    });

    useEffect(() => {
        const objetoPagina2 = progresso.find(item => item.pagina_atual === 5);
        if (objetoPagina2) {
          formik.setValues(objetoPagina2.dados_progresso);
        }
    }, [progresso]);      
    
return(
<div className={styles.avaliacao_container}>
    <form onSubmit={formik.handleSubmit}>
        
    <h1>Avaliação de Desempenho</h1>
    <p>Faça a avaliação dos seus colegas de trabalho</p>
    <h3 className={styles.titulo}>Responsabilidade:</h3>

        <div className={styles.form_control}>
            <label htmlFor="Num_41" className={styles.block}>41)</label>
            <p>O servidor respeita os colegas de trabalho, sempre contribuindo com a harmonia da universidade.</p>

            <select
                className={styles.blockd}
                id="Num_41"
                name="Num_41"
                onChange={formik.handleChange}
                value={formik.values.Num_41}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_41 && formik.errors.Num_41 ? (
            <div className={styles.error}>{formik.errors.Num_41}</div>
            ) : null}

            <label htmlFor="Num_42" className={styles.block}>42)</label>
            <p>Desempenha	perfeitamente	suas	tarefas	sem	precisar	ser lembrado pela chefia.</p>

            <select
                className={styles.blockd}
                id="Num_42"
                name="Num_42"
                onChange={formik.handleChange}
                value={formik.values.Num_42}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_42 && formik.errors.Num_42 ? (
            <div className={styles.error}>{formik.errors.Num_42}</div>
            ) : null}

            <label htmlFor="Num_43" className={styles.block}>43)</label>
            <p>Procura ser fiel aos seus compromissos e assume as suas obrigações.</p>

            <select
                className={styles.blockd}
                id="Num_43"
                name="Num_43"
                onChange={formik.handleChange}
                value={formik.values.Num_43}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_43 && formik.errors.Num_43 ? (
            <div className={styles.error}>{formik.errors.Num_43}</div>
            ) : null}

            <label htmlFor="Num_44" className={styles.block}>44)</label>
            <p>Age com firmeza, discrição e coerência de atitudes compatíveis com o trabalho.</p>

            <select
                className={styles.blockd}
                id="Num_44"
                name="Num_44"
                onChange={formik.handleChange}
                value={formik.values.Num_44}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_44 && formik.errors.Num_44 ? (
            <div className={styles.error}>{formik.errors.Num_44}</div>
            ) : null}

            <label htmlFor="Num_45" className={styles.block}>45)</label>
            <p>Respeita	e	obedece	à	legislação,	utilizando-se	do	poder discricionário de forma consciente e justa.</p>

            <select
                className={styles.blockd}
                id="Num_45"
                name="Num_45"
                onChange={formik.handleChange}
                value={formik.values.Num_45}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_45 && formik.errors.Num_45 ? (
            <div className={styles.error}>{formik.errors.Num_45}</div>
            ) : null}

            <label htmlFor="Num_46" className={styles.block}>46)</label>
            <p>É responsável e zeloso pelo patrimônio da Instituição, evita desperdícios de materiais e gastos excessivos.</p>

            <select
                className={styles.blockd}
                id="Num_46"
                name="Num_46"
                onChange={formik.handleChange}
                value={formik.values.Num_46}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_46 && formik.errors.Num_46 ? (
            <div className={styles.error}>{formik.errors.Num_46}</div>
            ) : null}

            <label htmlFor="Num_47" className={styles.block}>47)</label>
            <p>Corresponde à confiança que lhe é dada no trabalho.</p>

            <select
                className={styles.blockd}
                id="Num_47"
                name="Num_47"
                onChange={formik.handleChange}
                value={formik.values.Num_47}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_47 && formik.errors.Num_47 ? (
            <div className={styles.error}>{formik.errors.Num_47}</div>
            ) : null}

            <label htmlFor="Num_48" className={styles.block}>48)</label>
            <p>Assume as consequências de suas próprias atitudes e procura corrigir eventuais falhas, seja de produção ou comunicação.</p>

            <select
                className={styles.blockd}
                id="Num_48"
                name="Num_48"
                onChange={formik.handleChange}
                value={formik.values.Num_48}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_48 && formik.errors.Num_48 ? (
            <div className={styles.error}>{formik.errors.Num_48}</div>
            ) : null}

            <label htmlFor="Num_49" className={styles.block}>49)</label>
            <p>Revê e aperfeiçoa o trabalho que executa, demonstrando seriedade e preocupação com o êxito dos trabalhos da Instituição.</p>

            <select
                className={styles.blockd}
                id="Num_49"
                name="Num_49"
                onChange={formik.handleChange}
                value={formik.values.Num_49}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_49 && formik.errors.Num_49 ? (
            <div className={styles.error}>{formik.errors.Num_49}</div>
            ) : null}

            <label htmlFor="Num_50" className={styles.block}>50)</label>
            <p>Cumpre suas tarefas nos prazos e condições estipulados</p>

            <select
                className={styles.blockd}
                id="Num_50"
                name="Num_50"
                onChange={formik.handleChange}
                value={formik.values.Num_50}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_50 && formik.errors.Num_50 ? (
            <div className={styles.error}>{formik.errors.Num_50}</div>
            ) : null}
        </div>
        <SubmitButton text="Enviar" />
    </form>
</div>
)
}

export default ColegasAvaliacao5