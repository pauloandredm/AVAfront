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

function ColegasAvaliacao() {

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        }
    }, []);

     /* ---------- get ------------ */

     const [avaliado2, setAvaliado2] = useState([]);

     useEffect(() => {
         axios.get(`${API_BASE_URL}/acordo-desempenho2/`)
             .then(response => {
                 setAvaliado2(response.data)
             })
             .catch(error => {
                 console.log(error)
             })
     }, [])

    const location = useLocation();
    const avaliado = location.state && location.state.avaliado ? location.state.avaliado : null;

    /* -------- get/progresso_formulario -------- */
    /* const [progresso, setProgresso] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/progresso_formulario/?avaliado=${avaliado}`)
            .then(response => {
                setProgresso(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
 */



    const verificarProgresso = async (avaliadoId) => {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/progresso_formulario/?avaliado=${avaliadoId}&tipo_avaliacao=CA`
          );
      
          const progressData = response.data.find((item) => item.pagina_atual === 1);
      
          if (progressData) {

            formik.setValues({
              ...formik.values,
              avaliado: avaliadoId,
              Num_1: progressData.dados_progresso.Num_1,
              Num_2: progressData.dados_progresso.Num_2,
              Num_3: progressData.dados_progresso.Num_3,
              Num_4: progressData.dados_progresso.Num_4,
              Num_5: progressData.dados_progresso.Num_5,
              Num_6: progressData.dados_progresso.Num_6,
              Num_7: progressData.dados_progresso.Num_7,
              Num_8: progressData.dados_progresso.Num_8,
              Num_9: progressData.dados_progresso.Num_9,
              Num_10: progressData.dados_progresso.Num_10,
            });
          } else {
          }
        } catch (error) {
          // Handle the error if needed
          console.error(error);
        }
      };

    /* -------- post -------- */

    const navigate = useNavigate();
    
    const formik = useFormik({
        initialValues: {
            avaliado: '',
            Num_1: 'N',
            Num_2: 'N',
            Num_3: 'N',
            Num_4: 'N',
            Num_5: 'N',
            Num_6: 'N',
            Num_7: 'N',
            Num_8: 'N',
            Num_9: 'N',
            Num_10: 'N',
        },
        validationSchema: Yup.object({
            avaliado: Yup.string().required('Required'),
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
            
        }),
        onSubmit: async (values) => {
            try {
                const serializedData = {
                    Num_1: values.Num_1,
                    Num_2: values.Num_2,
                    Num_3: values.Num_3,
                    Num_4: values.Num_4,
                    Num_5: values.Num_5,
                    Num_6: values.Num_6,
                    Num_7: values.Num_7,
                    Num_8: values.Num_8,
                    Num_9: values.Num_9,
                    Num_10: values.Num_10,
                  };

                  const response = await axios.post(`${API_BASE_URL}/progresso_formulario/`, {
                    avaliado: values.avaliado,
                    pagina_atual: 1,
                    dados_progresso: serializedData,
                    tipo_avaliacao: 'CA',
                  });
                navigate('/colegas-avaliacao2', { state: { avaliado: values.avaliado } });

            } catch (error) {
            console.error(error);
            }
        },
    });
    
return(
<div className={styles.avaliacao_container}>
    <form onSubmit={formik.handleSubmit}>
        
    <h1>Avaliação de Desempenho</h1>
    <p>Faça a avaliação dos seus colegas de trabalho</p>
    <h3 className={styles.titulo}>Assiduidade:</h3>

    <div>
      <label className={styles.servidor2} htmlFor="avaliado">Servidor:</label>
      <select
          className={styles.servidor}
          id="avaliado"
          name="avaliado"
          onChange={formik.handleChange}
          value={formik.values.avaliado}
          onBlur={(event) => {
            verificarProgresso(event.target.value);
          }}
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
    </div>
    
        <div className={styles.form_control}>
            <label htmlFor="Num_1" className={styles.block}>1)</label>
            <p>Comparece regularmente ao trabalho</p>

            <select
                className={styles.blockd}
                id="Num_1"
                name="Num_1"
                onChange={formik.handleChange}
                value={formik.values.Num_1}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_1 && formik.errors.Num_1 ? (
            <div className={styles.error}>{formik.errors.Num_1}</div>
            ) : null}

            <label htmlFor="Num_2" className={styles.block}>2)</label>
            <p>É pontual no horário.</p>

            <select
                className={styles.blockd}
                id="Num_2"
                name="Num_2"
                onChange={formik.handleChange}
                value={formik.values.Num_2}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_2 && formik.errors.Num_2 ? (
            <div className={styles.error}>{formik.errors.Num_2}</div>
            ) : null}

            <label htmlFor="Num_3" className={styles.block}>3)</label>
            <p>Permanece no trabalho durante o expediente.</p>

            <select
                className={styles.blockd}
                id="Num_3"
                name="Num_3"
                onChange={formik.handleChange}
                value={formik.values.Num_3}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_3 && formik.errors.Num_3 ? (
            <div className={styles.error}>{formik.errors.Num_3}</div>
            ) : null}

            <label htmlFor="Num_4" className={styles.block}>4)</label>
            <p>As eventuais chegadas com atraso ou saídas antecipadas realizam-se dentro dos limites de tolerância, estabelecidos pela unidade de lotação.</p>

            <select
                className={styles.blockd}
                id="Num_4"
                name="Num_4"
                onChange={formik.handleChange}
                value={formik.values.Num_4}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_4 && formik.errors.Num_4 ? (
            <div className={styles.error}>{formik.errors.Num_4}</div>
            ) : null}

            <label htmlFor="Num_5" className={styles.block}>5)</label>
            <p>Dedica-se à execução das tarefas, evitando interrupções e interferências alheias.</p>

            <select
                className={styles.blockd}
                id="Num_5"
                name="Num_5"
                onChange={formik.handleChange}
                value={formik.values.Num_5}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_5 && formik.errors.Num_5 ? (
            <div className={styles.error}>{formik.errors.Num_5}</div>
            ) : null}

            <label htmlFor="Num_6" className={styles.block}>6)</label>
            <p>Dá conhecimento ou solicita da chefia imediata permissão para ausentar-se do local de trabalho, por motivo justificado.</p>

            <select
                className={styles.blockd}
                id="Num_6"
                name="Num_6"
                onChange={formik.handleChange}
                value={formik.values.Num_6}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_6 && formik.errors.Num_6 ? (
            <div className={styles.error}>{formik.errors.Num_6}</div>
            ) : null}

            <label htmlFor="Num_7" className={styles.block}>7)</label>
            <p>Comparece assiduamente, permanece no seu local de trabalho e demonstra ser comprometido. Quando eventualmente falta, justifica.</p>

            <select
                className={styles.blockd}
                id="Num_7"
                name="Num_7"
                onChange={formik.handleChange}
                value={formik.values.Num_7}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_7 && formik.errors.Num_7 ? (
            <div className={styles.error}>{formik.errors.Num_7}</div>
            ) : null}

            <label htmlFor="Num_8" className={styles.block}>8)</label>
            <p>Quase nunca falta e nem se ausenta de seu local de trabalho para tratar de assuntos de seu interesse. Quando o faz, justifica.</p>

            <select
                className={styles.blockd}
                id="Num_8"
                name="Num_8"
                onChange={formik.handleChange}
                value={formik.values.Num_8}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_8 && formik.errors.Num_8 ? (
            <div className={styles.error}>{formik.errors.Num_8}</div>
            ) : null}

            <label htmlFor="Num_9" className={styles.block}>9)</label>
            <p>Raramente deixa de cumprir o horário de trabalho.</p>

            <select
                className={styles.blockd}
                id="Num_9"
                name="Num_9"
                onChange={formik.handleChange}
                value={formik.values.Num_9}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_9 && formik.errors.Num_9 ? (
            <div className={styles.error}>{formik.errors.Num_9}</div>
            ) : null}

            <label htmlFor="Num_10" className={styles.block}>10)</label>
            <p>É frequente ao trabalho, ausentando-se somente por motivos justos, com conhecimento e anuência da chefia imediata.</p>

            <select
                className={styles.blockd}
                id="Num_10"
                name="Num_10"
                onChange={formik.handleChange}
                value={formik.values.Num_10}
            >
                <option value="N">Nunca</option>
                <option value="R">Raramente</option>
                <option value="M">Moderadamente</option>
                <option value="F">Frequentemente</option>
                <option value="S">Sempre</option>
            </select>

            {formik.touched.Num_10 && formik.errors.Num_10 ? (
            <div className={styles.error}>{formik.errors.Num_10}</div>
            ) : null}
        </div>
        <SubmitButton text="Enviar" />
    </form>
</div>
)
}

export default ColegasAvaliacao