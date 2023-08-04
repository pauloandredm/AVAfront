
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import styles from './AutoAvaliacao.module.css'
import SubmitButton from '../form/SubmitButton'
import API_BASE_URL from '../ApiConfig';
import axios from '../../axiosConfig';

import { useFormik } from 'formik';
import * as Yup from 'yup';


function AutoAvaliacao2() {

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        }
      }, []);

    /* --------------- aaaaaa -------------------- */

  const location = useLocation();
  const avaliado = location.state && location.state.avaliado ? location.state.avaliado : null;
  console.log("avaliado:");
  console.log(avaliado);

  /* -------- get/progresso_formulario -------- */
  const [progresso, setProgresso] = useState([]);

    useEffect(() => {
        axios
        .get(`${API_BASE_URL}/progresso_formulario/?avaliado=${avaliado}`)
        .then(response => {
            setProgresso(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [avaliado]);
    
    /* -------- post -------- */
    
    const navigate = useNavigate();
    
    const formik = useFormik({
        initialValues: {
          letra_A: '',
          letra_B: '',
          letra_C: 'T',
          comentario_letra_C: '',
          Fatores_intervenientes_A: 'S',
          Fatores_intervenientes_B: 'S',
          Fatores_intervenientes_C: 'S',
          letra_D: 'T',
          letra_E: '',
          letra_F: '',
        },
        validationSchema: Yup.object({
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
        }),
        onSubmit: async (values) => {
            try {
              const serializedData = {
                letra_A: values.letra_A,
                letra_B: values.letra_B,
                letra_C: values.letra_C,
                comentario_letra_C: values.comentario_letra_C,
                Fatores_intervenientes_A: values.Fatores_intervenientes_A,
                Fatores_intervenientes_B: values.Fatores_intervenientes_B,
                Fatores_intervenientes_C: values.Fatores_intervenientes_C,
                letra_D: values.letra_D,
                letra_E: values.letra_E,
                letra_F: values.letra_F,
              }

              const response = await axios.post(`${API_BASE_URL}/progresso_formulario/`, {
                avaliado: avaliado,
                pagina_atual: 2,
                dados_progresso: serializedData,
            });
              navigate('/auto-avaliacao3', { state: { avaliado: avaliado } });
              console.log(response.data);
            } catch (error) {
              // Caso ocorra um erro na requisição, você pode tratá-lo aqui
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
  
  <h2 className={styles.aspectos}>Aspectos Gerais:</h2>
  <div className={styles.form_control}>
      <label htmlFor="letra_A">A)</label>
      <p>Você apresentou dificuldade para executar alguma tarefa inerente ao cargo que exerce? Se sim, qual(is)?</p>
      <textarea
          type="text"
          id={styles.meuInput}
          name="letra_A"
          value={formik.values.letra_A}
          onChange={formik.handleChange}
      />

      {formik.touched.letra_A && formik.errors.letra_A ? (
      <div className={styles.error}>{formik.errors.letra_A}</div>
      ) : null}

      <label htmlFor="letra_B" className={styles.letra}>B)</label>
      <p>Hoje, você desempenha com dificuldade alguma(s) tarefa(s) que já executou bem no passado? Se sim, qual(is)?</p>
      <textarea
          type="text"
          id={styles.meuInput}
          name="letra_B"
          value={formik.values.letra_B}
          onChange={formik.handleChange}
      />

      {formik.touched.letra_B && formik.errors.letra_B ? (
      <div className={styles.error}>{formik.errors.letra_B}</div>
      ) : null}

      <label htmlFor="letra_C" className={styles.letra}>C)</label>
      <p>Você cumpriu os deveres e as obrigações do servidor público, com estrita observância da ética profissional?</p>

      <select
          className={styles.letra_C}
          id="letra_C"
          name="letra_C"
          onChange={formik.handleChange}
          value={formik.values.letra_C}
      >
          <option value="T">Totalmente</option>
          <option value="A">Às vezes</option>
          <option value="I">De forma insatisfatória</option>
      </select>

      {formik.touched.letra_C && formik.errors.letra_C ? (
      <div className={styles.error}>{formik.errors.letra_C}</div>
      ) : null}

      <textarea
          type="text"
          id={styles.meuInput}
          name="comentario_letra_C"
          value={formik.values.comentario_letra_C}
          onChange={formik.handleChange}
          placeholder='Comentários e outros aspectos gerais'
      />

      {formik.touched.comentario_letra_C && formik.errors.comentario_letra_C ? (
      <div className={styles.error}>{formik.errors.comentario_letra_C}</div>
      ) : null}

      <div className={styles.Fatores_intervenientes}>
          <h3 className={styles.fatores}>Fatores intervenientes:</h3>

          <label htmlFor="Fatores_intervenientes_A">A)</label>
          <p>concluiu participação em evento de iniciação ao serviço público?</p>
          <select
              id="Fatores_intervenientes_A"
              name="Fatores_intervenientes_A"
              onChange={formik.handleChange}
              value={formik.values.Fatores_intervenientes_A}
          >
              <option value="S">Sim</option>
              <option value="N">Não</option>
              <option value="A">N/A</option>
          </select>

          {formik.touched.Fatores_intervenientes_A && formik.errors.Fatores_intervenientes_A ? (
              <div className={styles.error}>{formik.errors.Fatores_intervenientes_A}</div>
          ) : null}

          <label htmlFor="Fatores_intervenientes_B" className={styles.block}>B)</label>
          <p>possui formação exigida para o cargo?</p>
          <select
              id="Fatores_intervenientes_B"
              name="Fatores_intervenientes_B"
              onChange={formik.handleChange}
              value={formik.values.Fatores_intervenientes_B}
          >
              <option value="S">Sim</option>
              <option value="N">Não</option>
              <option value="A">N/A</option>
          </select>

          {formik.touched.Fatores_intervenientes_B && formik.errors.Fatores_intervenientes_B ? (
              <div className={styles.error}>{formik.errors.Fatores_intervenientes_B}</div>
          ) : null}

          <label htmlFor="Fatores_intervenientes_C" className={styles.block}>C)</label>
          <p>tem apresentado problemas de saúde?</p>
          <select
              id="Fatores_intervenientes_C"
              name="Fatores_intervenientes_C"
              onChange={formik.handleChange}
              value={formik.values.Fatores_intervenientes_C}
          >
              <option value="S">Sim</option>
              <option value="N">Não</option>
              <option value="A">N/A</option>
          </select>

          {formik.touched.Fatores_intervenientes_C && formik.errors.Fatores_intervenientes_C ? (
              <div className={styles.error}>{formik.errors.Fatores_intervenientes_C}</div>
          ) : null}

      </div>

      <label htmlFor="letra_D" className={styles.block}>D)</label>
      <p>Solicita avaliação, parecer e/ou apoio da equipe multiprofissional de saúde?</p>

      <select
          className={styles.blockd}
          id="letra_D"
          name="letra_D"
          onChange={formik.handleChange}
          value={formik.values.letra_D}
      >
          <option value="S">Totalmente</option>
          <option value="N">Às vezes</option>
      </select>

      {formik.touched.letra_D && formik.errors.letra_D ? (
      <div className={styles.error}>{formik.errors.letra_D}</div>
      ) : null}

      <label htmlFor="letra_E" className={styles.block}>E)</label>
      <p>Hoje, você desempenha com dificuldade alguma(s) tarefa(s) que já executou bem no passado? Se sim, qual(is)?</p>
      <textarea
          type="text"
          id={styles.meuInput2}
          name="letra_E"
          value={formik.values.letra_E}
          onChange={formik.handleChange}
      />

      {formik.touched.letra_E && formik.errors.letra_E ? (
      <div className={styles.error}>{formik.errors.letra_E}</div>
      ) : null}

      <label htmlFor="letra_F" className={styles.block}>F)</label>
      <p>Hoje, você desempenha com dificuldade alguma(s) tarefa(s) que já executou bem no passado? Se sim, qual(is)?</p>
      <textarea
          type="text"
          id={styles.meuInput}
          name="letra_F"
          value={formik.values.letra_F}
          onChange={formik.handleChange}
      />

      {formik.touched.letra_F && formik.errors.letra_F ? (
      <div className={styles.error}>{formik.errors.letra_F}</div>
      ) : null}
  </div>
  <SubmitButton text="Enviar" />
</form>
</div>
)
}

export default AutoAvaliacao2
