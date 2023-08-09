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

function ColegasAvaliacao3() {

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
            Num_21: 'N',
            Num_22: 'N',
            Num_23: 'N',
            Num_24: 'N',
            Num_25: 'N',
            Num_26: 'N',
            Num_27: 'N',
            Num_28: 'N',
            Num_29: 'N',
            Num_30: 'N',
        },
        validationSchema: Yup.object({
            Num_21: Yup.string().required('Campo obrigatório'),
            Num_22: Yup.string().required('Campo obrigatório'),
            Num_23: Yup.string().required('Campo obrigatório'),
            Num_24: Yup.string().required('Campo obrigatório'),
            Num_25: Yup.string().required('Campo obrigatório'),
            Num_26: Yup.string().required('Campo obrigatório'),
            Num_27: Yup.string().required('Campo obrigatório'),
            Num_28: Yup.string().required('Campo obrigatório'),
            Num_29: Yup.string().required('Campo obrigatório'),
            Num_30: Yup.string().required('Campo obrigatório'),
            
        }),
        onSubmit: async (values) => {
            try {
                const serializedData = {
                    Num_21: values.Num_21,
                    Num_22: values.Num_22,
                    Num_23: values.Num_23,
                    Num_24: values.Num_24,
                    Num_25: values.Num_25,
                    Num_26: values.Num_26,
                    Num_27: values.Num_27,
                    Num_28: values.Num_28,
                    Num_29: values.Num_29,
                    Num_30: values.Num_30,
                  };

                  const response = await axios.post(`${API_BASE_URL}/progresso_formulario/`, {
                    avaliado: avaliado,
                    pagina_atual: 3,
                    dados_progresso: serializedData,
                    tipo_avaliacao: 'CA',
                  });
                navigate('/colegas-avaliacao4', { state: { avaliado: avaliado } });

            } catch (error) {
            console.error(error);
            }
        },
    });

    useEffect(() => {
        const objetoPagina2 = progresso.find(item => item.pagina_atual === 3);
        if (objetoPagina2) {
          formik.setValues(objetoPagina2.dados_progresso);
        }
    }, [progresso]);      
    
return(
<div className={styles.avaliacao_container}>
    <form onSubmit={formik.handleSubmit}>
        
    <h1>Avaliação de Desempenho</h1>
    <p>Faça a avaliação dos seus colegas de trabalho</p>
    <h3 className={styles.titulo}>Capacidade de Iniciativa:</h3>

        <div className={styles.form_control}>
            <label htmlFor="Num_21" className={styles.block}>21)</label>
            <p>Sempre inicia ações necessárias ao bom desenvolvimento do trabalho na falta de instruções detalhadas por parte da chefia.</p>

            <select
                className={styles.blockd}
                id="Num_21"
                name="Num_21"
                onChange={formik.handleChange}
                value={formik.values.Num_21}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_21 && formik.errors.Num_21 ? (
            <div className={styles.error}>{formik.errors.Num_21}</div>
            ) : null}

            <label htmlFor="Num_22" className={styles.block}>22)</label>
            <p>Apresenta iniciativa e capacidade para resolver problemas e busca maximizar resultados através de sua criatividade.</p>

            <select
                className={styles.blockd}
                id="Num_22"
                name="Num_22"
                onChange={formik.handleChange}
                value={formik.values.Num_22}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_22 && formik.errors.Num_22 ? (
            <div className={styles.error}>{formik.errors.Num_22}</div>
            ) : null}

            <label htmlFor="Num_23" className={styles.block}>23)</label>
            <p>Apresenta capacidade para resolver problemas do dia-a-dia, buscando atender às necessidades do setor.</p>

            <select
                className={styles.blockd}
                id="Num_23"
                name="Num_23"
                onChange={formik.handleChange}
                value={formik.values.Num_23}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_23 && formik.errors.Num_23 ? (
            <div className={styles.error}>{formik.errors.Num_23}</div>
            ) : null}

            <label htmlFor="Num_24" className={styles.block}>24)</label>
            <p>Procura conhecer a instituição, inteirando-se da sua estrutura e funcionamento e da função para qual foi designado(a).</p>

            <select
                className={styles.blockd}
                id="Num_24"
                name="Num_24"
                onChange={formik.handleChange}
                value={formik.values.Num_24}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_24 && formik.errors.Num_24 ? (
            <div className={styles.error}>{formik.errors.Num_24}</div>
            ) : null}

            <label htmlFor="Num_25" className={styles.block}>25)</label>
            <p>Investe no autodesenvolvimento, procura atualizar-se, conhecer a legislação, instruções, manuais e outras normativas.</p>

            <select
                className={styles.blockd}
                id="Num_25"
                name="Num_25"
                onChange={formik.handleChange}
                value={formik.values.Num_25}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_25 && formik.errors.Num_25 ? (
            <div className={styles.error}>{formik.errors.Num_25}</div>
            ) : null}

            <label htmlFor="Num_26" className={styles.block}>26)</label>
            <p>Busca orientação para solucionar problemas/dúvidas do dia-a-dia e resolver situações imprevistas.</p>

            <select
                className={styles.blockd}
                id="Num_26"
                name="Num_26"
                onChange={formik.handleChange}
                value={formik.values.Num_26}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_26 && formik.errors.Num_26 ? (
            <div className={styles.error}>{formik.errors.Num_26}</div>
            ) : null}

            <label htmlFor="Num_27" className={styles.block}>27)</label>
            <p>Faz sugestões e críticas construtivas para retroalimentação, com criatividade.</p>

            <select
                className={styles.blockd}
                id="Num_27"
                name="Num_27"
                onChange={formik.handleChange}
                value={formik.values.Num_27}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_27 && formik.errors.Num_27 ? (
            <div className={styles.error}>{formik.errors.Num_27}</div>
            ) : null}

            <label htmlFor="Num_28" className={styles.block}>28)</label>
            <p>Auxilia os colegas na busca de soluções com relação aos problemas de trabalho.</p>

            <select
                className={styles.blockd}
                id="Num_28"
                name="Num_28"
                onChange={formik.handleChange}
                value={formik.values.Num_28}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_28 && formik.errors.Num_28 ? (
            <div className={styles.error}>{formik.errors.Num_28}</div>
            ) : null}

            <label htmlFor="Num_29" className={styles.block}>29)</label>
            <p>Adota medidas adequadas, de modo a atender às necessidades da unidade de lotação.</p>

            <select
                className={styles.blockd}
                id="Num_29"
                name="Num_29"
                onChange={formik.handleChange}
                value={formik.values.Num_29}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_29 && formik.errors.Num_29 ? (
            <div className={styles.error}>{formik.errors.Num_29}</div>
            ) : null}

            <label htmlFor="Num_30" className={styles.block}>30)</label>
            <p>Adota medidas adequadas, de modo a atender às necessidades da unidade de lotação.</p>

            <select
                className={styles.blockd}
                id="Num_30"
                name="Num_30"
                onChange={formik.handleChange}
                value={formik.values.Num_30}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_30 && formik.errors.Num_30 ? (
            <div className={styles.error}>{formik.errors.Num_30}</div>
            ) : null}
        </div>
        <SubmitButton text="Enviar" />
    </form>
</div>
)
}

export default ColegasAvaliacao3