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

function ColegasAvaliacao4() {

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
            Num_31: 'N',
            Num_32: 'N',
            Num_33: 'N',
            Num_34: 'N',
            Num_35: 'N',
            Num_36: 'N',
            Num_37: 'N',
            Num_38: 'N',
            Num_39: 'N',
            Num_40: 'N',
        },
        validationSchema: Yup.object({
            Num_31: Yup.string().required('Campo obrigatório'),
            Num_32: Yup.string().required('Campo obrigatório'),
            Num_33: Yup.string().required('Campo obrigatório'),
            Num_34: Yup.string().required('Campo obrigatório'),
            Num_35: Yup.string().required('Campo obrigatório'),
            Num_36: Yup.string().required('Campo obrigatório'),
            Num_37: Yup.string().required('Campo obrigatório'),
            Num_38: Yup.string().required('Campo obrigatório'),
            Num_39: Yup.string().required('Campo obrigatório'),
            Num_40: Yup.string().required('Campo obrigatório'),
            
        }),
        onSubmit: async (values) => {
            try {
                const serializedData = {
                    Num_31: values.Num_31,
                    Num_32: values.Num_32,
                    Num_33: values.Num_33,
                    Num_34: values.Num_34,
                    Num_35: values.Num_35,
                    Num_36: values.Num_36,
                    Num_37: values.Num_37,
                    Num_38: values.Num_38,
                    Num_39: values.Num_39,
                    Num_40: values.Num_40,
                  };

                  const response = await axios.post(`${API_BASE_URL}/progresso_formulario/`, {
                    avaliado: avaliado,
                    pagina_atual: 4,
                    dados_progresso: serializedData,
                    tipo_avaliacao: 'CA',
                  });
                navigate('/colegas-avaliacao5', { state: { avaliado: avaliado } });

            } catch (error) {
            console.error(error);
            }
        },
    });

    useEffect(() => {
        const objetoPagina2 = progresso.find(item => item.pagina_atual === 4);
        if (objetoPagina2) {
          formik.setValues(objetoPagina2.dados_progresso);
        }
    }, [progresso]);      
    
return(
<div className={styles.avaliacao_container}>
    <form onSubmit={formik.handleSubmit}>
        
    <h1>Avaliação de Desempenho</h1>
    <p>Faça a avaliação dos seus colegas de trabalho</p>
    <h3 className={styles.titulo}>Produtividade:</h3>

        <div className={styles.form_control}>
            <label htmlFor="Num_31" className={styles.block}>31)</label>
            <p>Trabalha com zelo. A quantidade e a qualidade do trabalho em relação às expectativas e exigências do setor.</p>

            <select
                className={styles.blockd}
                id="Num_31"
                name="Num_31"
                onChange={formik.handleChange}
                value={formik.values.Num_31}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_31 && formik.errors.Num_31 ? (
            <div className={styles.error}>{formik.errors.Num_31}</div>
            ) : null}

            <label htmlFor="Num_32" className={styles.block}>32)</label>
            <p>A quantidade e a qualidade do trabalho estão adequadas às exigências do cargo.</p>

            <select
                className={styles.blockd}
                id="Num_32"
                name="Num_32"
                onChange={formik.handleChange}
                value={formik.values.Num_32}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_32 && formik.errors.Num_32 ? (
            <div className={styles.error}>{formik.errors.Num_32}</div>
            ) : null}

            <label htmlFor="Num_33" className={styles.block}>33)</label>
            <p>Racionaliza o tempo e os recursos materiais na execução das tarefas. Aproveita eventual disponibilidade e forma producente.</p>

            <select
                className={styles.blockd}
                id="Num_33"
                name="Num_33"
                onChange={formik.handleChange}
                value={formik.values.Num_33}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_33 && formik.errors.Num_33 ? (
            <div className={styles.error}>{formik.errors.Num_33}</div>
            ) : null}

            <label htmlFor="Num_34" className={styles.block}>34)</label>
            <p>Trabalha de forma regular e constante. Intensifica o ritmo de trabalho em situações excepcionais.</p>

            <select
                className={styles.blockd}
                id="Num_34"
                name="Num_34"
                onChange={formik.handleChange}
                value={formik.values.Num_34}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_34 && formik.errors.Num_34 ? (
            <div className={styles.error}>{formik.errors.Num_34}</div>
            ) : null}

            <label htmlFor="Num_35" className={styles.block}>35)</label>
            <p>Faz as tarefas corretamente, com qualidade e boa apresentação.</p>

            <select
                className={styles.blockd}
                id="Num_35"
                name="Num_35"
                onChange={formik.handleChange}
                value={formik.values.Num_35}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_35 && formik.errors.Num_35 ? (
            <div className={styles.error}>{formik.errors.Num_35}</div>
            ) : null}

            <label htmlFor="Num_36" className={styles.block}>36)</label>
            <p>Utiliza	materiais/equipamentos	dentro	de	sua	capacidade produtiva, segundo orientações técnicas.</p>

            <select
                className={styles.blockd}
                id="Num_36"
                name="Num_36"
                onChange={formik.handleChange}
                value={formik.values.Num_36}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_36 && formik.errors.Num_36 ? (
            <div className={styles.error}>{formik.errors.Num_36}</div>
            ) : null}

            <label htmlFor="Num_37" className={styles.block}>37)</label>
            <p>Dispensa atenção suficiente à execução de seu trabalho para levar a um resultado de boa qualidade, não fazendo uso da internet e outros meios de comunicação para interesses pessoais no horário de trabalho.</p>

            <select
                className={styles.blockd}
                id="Num_37"
                name="Num_37"
                onChange={formik.handleChange}
                value={formik.values.Num_37}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_37 && formik.errors.Num_37 ? (
            <div className={styles.error}>{formik.errors.Num_37}</div>
            ) : null}

            <label htmlFor="Num_38" className={styles.block}>38)</label>
            <p>Assimila com facilidade as tarefas que lhe são transmitidas, mesmo aquelas que fogem a sua rotina.</p>

            <select
                className={styles.blockd}
                id="Num_38"
                name="Num_38"
                onChange={formik.handleChange}
                value={formik.values.Num_38}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_38 && formik.errors.Num_38 ? (
            <div className={styles.error}>{formik.errors.Num_38}</div>
            ) : null}

            <label htmlFor="Num_39" className={styles.block}>39)</label>
            <p>Executa o seu trabalho sem necessidade de ordens e orientações constantes.</p>

            <select
                className={styles.blockd}
                id="Num_39"
                name="Num_39"
                onChange={formik.handleChange}
                value={formik.values.Num_39}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_39 && formik.errors.Num_39 ? (
            <div className={styles.error}>{formik.errors.Num_39}</div>
            ) : null}

            <label htmlFor="Num_40" className={styles.block}>40)</label>
            <p>Organiza as tarefas e esmera-se na execução, observando as prioridades.</p>

            <select
                className={styles.blockd}
                id="Num_40"
                name="Num_40"
                onChange={formik.handleChange}
                value={formik.values.Num_40}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_40 && formik.errors.Num_40 ? (
            <div className={styles.error}>{formik.errors.Num_40}</div>
            ) : null}
        </div>
        <SubmitButton text="Enviar" />
    </form>
</div>
)
}

export default ColegasAvaliacao4