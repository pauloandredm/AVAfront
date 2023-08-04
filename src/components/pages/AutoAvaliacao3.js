import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import styles from './AutoAvaliacao.module.css'

import SubmitButton from '../form/SubmitButton'
import API_BASE_URL from '../ApiConfig';
import axios from '../../axiosConfig';

import { useFormik } from 'formik';
import * as Yup from 'yup';


function AutoAvaliacao3() {

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        }
    }, []);

    const navigate = useNavigate();
    

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
    
    /* const navigate = useNavigate(); */
    
    const formik = useFormik({
        initialValues: {
            avaliado: avaliado,
            Num_1: 'X',
            Num_2: 'X',
            Num_3: 'X',
            Num_4: 'X',
            Num_5: 'X',
            Num_6: 'X',
            Num_7: 'X',
            Num_8: 'X',
            Num_9: 'X',
            Num_10: 'X',
            Num_11: 'X',
            Num_12: 'X',
            Num_13: 'X',
            Num_14: 'X',
            Num_15: 'X',
            Num_16: 'X',
            Num_17: 'X',
            Num_18: 'X',
            Num_19: 'X',
            Num_20: 'X',
            Num_21: 'X',
            Num_22: 'X',
            Num_23: 'X',
        },
        validationSchema: Yup.object({
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
                    Num_21: values.Num_21,
                    Num_22: values.Num_22,
                    Num_23: values.Num_23,
                }
              const response = await axios.post(`${API_BASE_URL}/progresso_formulario/`, {
                avaliado: avaliado,
                pagina_atual: 3,
                dados_progresso: serializedData,
              });
              navigate('/auto-avaliacao4', { state: { avaliado: avaliado } });
              console.log(response.data);
            } catch (error) {
              console.error(error);
            }
        },
    });

    useEffect(() => {
        const objetoPagina3 = progresso.find(item => item.pagina_atual === 3);
        if (objetoPagina3) {
          formik.setValues(objetoPagina3.dados_progresso);
        }
    }, [progresso]);

return(
<div className={styles.avaliacao_container}>
<div className={styles.form_control}>

    <form onSubmit={formik.handleSubmit}>

        <h2 className={styles.aspectos}>Avalie seu desempenho conforme indicadores abaixo, a partir da estrita observância da ética profissional:</h2>
        <label htmlFor="Num_1" className={styles.block}>1)</label>
        <p>Informa tempestivamente situações que provoquem ausências, atrasos ou saídas antecipadas, permitindo organização das atividades do setor.</p>

        <select
            className={styles.blockd}
            id="Num_1"
            name="Num_1"
            onChange={formik.handleChange}
            value={formik.values.Num_1}
        >
            <option value="X">Não sei dizer / Não se aplica</option>
            <option value="I">Insuficiente</option>
            <option value="R">Razoável</option>
            <option value="B">Bom</option>
            <option value="O">Ótimo</option>

        </select>

        {formik.touched.Num_1 && formik.errors.Num_1 ? (
        <div className={styles.error}>{formik.errors.Num_1}</div>
        ) : null}

        <label htmlFor="Num_2" className={styles.block}>2)</label>
        <p>Cumpre os procedimentos sem precisar que lhe cobrem prazos, correções ou ajustes, observa os padrões e as rotinas estabelecidas</p>

        <select
            className={styles.blockd}
            id="Num_2"
            name="Num_2"
            onChange={formik.handleChange}
            value={formik.values.Num_2}
        >
            <option value="X">Não sei dizer / Não se aplica</option>
            <option value="I">Insuficiente</option>
            <option value="R">Razoável</option>
            <option value="B">Bom</option>
            <option value="O">Ótimo</option>

        </select>

        {formik.touched.Num_2 && formik.errors.Num_2 ? (
        <div className={styles.error}>{formik.errors.Num_2}</div>
        ) : null}

        <label htmlFor="Num_3" className={styles.block}>3)</label>
        <p>Apresenta impessoalidade em suas atitudes e nas decisões a seu alcance.</p>

        <select
            className={styles.blockd}
            id="Num_3"
            name="Num_3"
            onChange={formik.handleChange}
            value={formik.values.Num_3}
        >
            <option value="X">Não sei dizer / Não se aplica</option>
            <option value="I">Insuficiente</option>
            <option value="R">Razoável</option>
            <option value="B">Bom</option>
            <option value="O">Ótimo</option>

        </select>

        {formik.touched.Num_3 && formik.errors.Num_3 ? (
        <div className={styles.error}>{formik.errors.Num_3}</div>
        ) : null}

        <label htmlFor="Num_4" className={styles.block}>4)</label>
        <p>Oferece soluções viáveis e com qualidade para as demandas sob sua responsabilidade</p>

        <select
            className={styles.blockd}
            id="Num_4"
            name="Num_4"
            onChange={formik.handleChange}
            value={formik.values.Num_4}
        >
            <option value="X">Não sei dizer / Não se aplica</option>
            <option value="I">Insuficiente</option>
            <option value="R">Razoável</option>
            <option value="B">Bom</option>
            <option value="O">Ótimo</option>

        </select>

        {formik.touched.Num_4 && formik.errors.Num_4 ? (
        <div className={styles.error}>{formik.errors.Num_4}</div>
        ) : null}

        <label htmlFor="Num_5" className={styles.block}>5)</label>
        <p>Resolve ou encaminha adequadamente as situações que não são habituais</p>

        <select
            className={styles.blockd}
            id="Num_5"
            name="Num_5"
            onChange={formik.handleChange}
            value={formik.values.Num_5}
        >
            <option value="X">Não sei dizer / Não se aplica</option>
            <option value="I">Insuficiente</option>
            <option value="R">Razoável</option>
            <option value="B">Bom</option>
            <option value="O">Ótimo</option>

        </select>

        {formik.touched.Num_5 && formik.errors.Num_5 ? (
        <div className={styles.error}>{formik.errors.Num_5}</div>
        ) : null}

        <label htmlFor="Num_6" className={styles.block}>6)</label>
        <p>Assume	as	consequências	por	suas	atitudes,	mostrando disponibilidade para aprender.</p>

        <select
            className={styles.blockd}
            id="Num_6"
            name="Num_6"
            onChange={formik.handleChange}
            value={formik.values.Num_6}
        >
            <option value="X">Não sei dizer / Não se aplica</option>
            <option value="I">Insuficiente</option>
            <option value="R">Razoável</option>
            <option value="B">Bom</option>
            <option value="O">Ótimo</option>

        </select>

        {formik.touched.Num_6 && formik.errors.Num_6 ? (
        <div className={styles.error}>{formik.errors.Num_6}</div>
        ) : null}

        <label htmlFor="Num_7" className={styles.block}>7)</label>
        <p>Cuida dos bens da ALRN, conservando-os em condições de uso</p>

        <select
            className={styles.blockd}
            id="Num_7"
            name="Num_7"
            onChange={formik.handleChange}
            value={formik.values.Num_7}
        >
            <option value="X">Não sei dizer / Não se aplica</option>
            <option value="I">Insuficiente</option>
            <option value="R">Razoável</option>
            <option value="B">Bom</option>
            <option value="O">Ótimo</option>

        </select>

        {formik.touched.Num_7 && formik.errors.Num_7 ? (
        <div className={styles.error}>{formik.errors.Num_7}</div>
        ) : null}

        <label htmlFor="Num_8" className={styles.block}>8)</label>
        <p>Desliga os aparelhos disponíveis (luz, impressora, projetor, computador, etc.) quando não está usando, diminuindo o consumo  de energia.</p>

        <select
            className={styles.blockd}
            id="Num_8"
            name="Num_8"
            onChange={formik.handleChange}
            value={formik.values.Num_8}
        >
            <option value="X">Não sei dizer / Não se aplica</option>
            <option value="I">Insuficiente</option>
            <option value="R">Razoável</option>
            <option value="B">Bom</option>
            <option value="O">Ótimo</option>

        </select>

        {formik.touched.Num_8 && formik.errors.Num_8 ? (
        <div className={styles.error}>{formik.errors.Num_8}</div>
        ) : null}

        <label htmlFor="Num_9" className={styles.block}>9)</label>
        <p>Evita o desperdício de materiais de expediente (papel, caneta, pincel atômico, etc.) e gastos financeiros desnecessários</p>

        <select
            className={styles.blockd}
            id="Num_9"
            name="Num_9"
            onChange={formik.handleChange}
            value={formik.values.Num_9}
        >
            <option value="X">Não sei dizer / Não se aplica</option>
            <option value="I">Insuficiente</option>
            <option value="R">Razoável</option>
            <option value="B">Bom</option>
            <option value="O">Ótimo</option>

        </select>

        {formik.touched.Num_9 && formik.errors.Num_9 ? (
        <div className={styles.error}>{formik.errors.Num_9}</div>
        ) : null}

        <label htmlFor="Num_10" className={styles.block}>10)</label>
        <p>Demonstra transparência e coerência em suas atitudes</p>

        <select
            className={styles.blockd}
            id="Num_10"
            name="Num_10"
            onChange={formik.handleChange}
            value={formik.values.Num_10}
        >
            <option value="X">Não sei dizer / Não se aplica</option>
            <option value="I">Insuficiente</option>
            <option value="R">Razoável</option>
            <option value="B">Bom</option>
            <option value="O">Ótimo</option>

        </select>

        {formik.touched.Num_10 && formik.errors.Num_10 ? (
        <div className={styles.error}>{formik.errors.Num_10}</div>
        ) : null}

        <label htmlFor="Num_11" className={styles.block}>11)</label>
        <p>Os poderes ou facilidades decorrentes de suas funções não são usados pelo servidor em favorecimento próprio ou a terceiros</p>

        <select
            className={styles.blockd}
            id="Num_11"
            name="Num_11"
            onChange={formik.handleChange}
            value={formik.values.Num_11}
        >
            <option value="X">Não sei dizer / Não se aplica</option>
            <option value="I">Insuficiente</option>
            <option value="R">Razoável</option>
            <option value="B">Bom</option>
            <option value="O">Ótimo</option>

        </select>

        {formik.touched.Num_11 && formik.errors.Num_11 ? (
        <div className={styles.error}>{formik.errors.Num_11}</div>
        ) : null}

        <label htmlFor="Num_12" className={styles.block}>12)</label>
        <p>Os poderes ou facilidades decorrentes de suas funções não são usados pelo servidor em favorecimento próprio ou a terceiros</p>

        <select
            className={styles.blockd}
            id="Num_12"
            name="Num_12"
            onChange={formik.handleChange}
            value={formik.values.Num_12}
        >
            <option value="X">Não sei dizer / Não se aplica</option>
            <option value="I">Insuficiente</option>
            <option value="R">Razoável</option>
            <option value="B">Bom</option>
            <option value="O">Ótimo</option>

        </select>

        {formik.touched.Num_12 && formik.errors.Num_12 ? (
        <div className={styles.error}>{formik.errors.Num_12}</div>
        ) : null}

        <label htmlFor="Num_13" className={styles.block}>13)</label>
        <p>Sua atuação contribui para o bom funcionamento do serviço público</p>

        <select
            className={styles.blockd}
            id="Num_13"
            name="Num_13"
            onChange={formik.handleChange}
            value={formik.values.Num_13}
        >
            <option value="X">Não sei dizer / Não se aplica</option>
            <option value="I">Insuficiente</option>
            <option value="R">Razoável</option>
            <option value="B">Bom</option>
            <option value="O">Ótimo</option>

        </select>

        {formik.touched.Num_13 && formik.errors.Num_13 ? (
        <div className={styles.error}>{formik.errors.Num_13}</div>
        ) : null}

        <label htmlFor="Num_14" className={styles.block}>14)</label>
        <p>É disponível e atencioso, respeitando todos os usuários do serviço público sem preconceito ou distinção (por ex.: de raça, sexo, nacionalidade, cor, idade, religião, cunho político e posição social).</p>

        <select
            className={styles.blockd}
            id="Num_14"
            name="Num_14"
            onChange={formik.handleChange}
            value={formik.values.Num_14}
        >
            <option value="X">Não sei dizer / Não se aplica</option>
            <option value="I">Insuficiente</option>
            <option value="R">Razoável</option>
            <option value="B">Bom</option>
            <option value="O">Ótimo</option>

        </select>

        {formik.touched.Num_14 && formik.errors.Num_14 ? (
        <div className={styles.error}>{formik.errors.Num_14}</div>
        ) : null}

        <label htmlFor="Num_15" className={styles.block}>15)</label>
        <p>Sua atuação contribui para construção coletiva de um ambiente de trabalho de bom relacionamento com a comunidade interna e externa.</p>

        <select
            className={styles.blockd}
            id="Num_15"
            name="Num_15"
            onChange={formik.handleChange}
            value={formik.values.Num_15}
        >
            <option value="X">Não sei dizer / Não se aplica</option>
            <option value="I">Insuficiente</option>
            <option value="R">Razoável</option>
            <option value="B">Bom</option>
            <option value="O">Ótimo</option>

        </select>

        {formik.touched.Num_15 && formik.errors.Num_15 ? (
        <div className={styles.error}>{formik.errors.Num_15}</div>
        ) : null}

        <label htmlFor="Num_16" className={styles.block}>16)</label>
        <p>Demonstra flexibilidade quando se depara com opiniões diversas</p>

        <select
            className={styles.blockd}
            id="Num_16"
            name="Num_16"
            onChange={formik.handleChange}
            value={formik.values.Num_16}
        >
            <option value="X">Não sei dizer / Não se aplica</option>
            <option value="I">Insuficiente</option>
            <option value="R">Razoável</option>
            <option value="B">Bom</option>
            <option value="O">Ótimo</option>

        </select>

        {formik.touched.Num_16 && formik.errors.Num_16 ? (
        <div className={styles.error}>{formik.errors.Num_16}</div>
        ) : null}

        <label htmlFor="Num_17" className={styles.block}>17)</label>
        <p>Demonstra disposição para colaborar com colegas e chefia, quando terminadas as suas tarefas, objetivando o bom andamento dos trabalhos do grupo</p>

        <select
            className={styles.blockd}
            id="Num_17"
            name="Num_17"
            onChange={formik.handleChange}
            value={formik.values.Num_17}
        >
            <option value="X">Não sei dizer / Não se aplica</option>
            <option value="I">Insuficiente</option>
            <option value="R">Razoável</option>
            <option value="B">Bom</option>
            <option value="O">Ótimo</option>

        </select>

        {formik.touched.Num_17 && formik.errors.Num_17 ? (
        <div className={styles.error}>{formik.errors.Num_17}</div>
        ) : null}

        <label htmlFor="Num_18" className={styles.block}>18)</label>
        <p>Preocupa-se em entender o funcionamento da unidade para melhor compreender e cumprir suas tarefas com qualidade</p>

        <select
            className={styles.blockd}
            id="Num_18"
            name="Num_18"
            onChange={formik.handleChange}
            value={formik.values.Num_18}
        >
            <option value="X">Não sei dizer / Não se aplica</option>
            <option value="I">Insuficiente</option>
            <option value="R">Razoável</option>
            <option value="B">Bom</option>
            <option value="O">Ótimo</option>

        </select>

        {formik.touched.Num_18 && formik.errors.Num_18 ? (
        <div className={styles.error}>{formik.errors.Num_18}</div>
        ) : null}

        <label htmlFor="Num_19" className={styles.block}>19)</label>
        <p>Demonstra	atitudes independentemente voltadas	aos objetivos independentemente de estarem diretamente sob sua responsabilidade	</p>

        <select
            className={styles.blockd}
            id="Num_19"
            name="Num_19"
            onChange={formik.handleChange}
            value={formik.values.Num_19}
        >
            <option value="X">Não sei dizer / Não se aplica</option>
            <option value="I">Insuficiente</option>
            <option value="R">Razoável</option>
            <option value="B">Bom</option>
            <option value="O">Ótimo</option>

        </select>

        {formik.touched.Num_19 && formik.errors.Num_19 ? (
        <div className={styles.error}>{formik.errors.Num_19}</div>
        ) : null}

        <label htmlFor="Num_20" className={styles.block}>20)</label>
        <p>Chama a responsabilidade para si. Recebe eventuais demandas a sua unidade e, mesmo frente às situações distintas de sua rotina, tenta resolvê-las</p>

        <select
            className={styles.blockd}
            id="Num_20"
            name="Num_20"
            onChange={formik.handleChange}
            value={formik.values.Num_20}
        >
            <option value="X">Não sei dizer / Não se aplica</option>
            <option value="I">Insuficiente</option>
            <option value="R">Razoável</option>
            <option value="B">Bom</option>
            <option value="O">Ótimo</option>

        </select>

        {formik.touched.Num_20 && formik.errors.Num_20 ? (
        <div className={styles.error}>{formik.errors.Num_20}</div>
        ) : null}

        <label htmlFor="Num_21" className={styles.block}>21)</label>
        <p>Participa ativamente das reuniões, contribuindo para o avanço dos trabalhos.</p>

        <select
            className={styles.blockd}
            id="Num_21"
            name="Num_21"
            onChange={formik.handleChange}
            value={formik.values.Num_21}
        >
            <option value="X">Não sei dizer / Não se aplica</option>
            <option value="I">Insuficiente</option>
            <option value="R">Razoável</option>
            <option value="B">Bom</option>
            <option value="O">Ótimo</option>

        </select>

        {formik.touched.Num_21 && formik.errors.Num_21 ? (
        <div className={styles.error}>{formik.errors.Num_21}</div>
        ) : null}

        <label htmlFor="Num_22" className={styles.block}>22)</label>
        <p>Demonstra clareza e objetividade na transmissão de informações e ideias</p>

        <select
            className={styles.blockd}
            id="Num_22"
            name="Num_22"
            onChange={formik.handleChange}
            value={formik.values.Num_22}
        >
            <option value="X">Não sei dizer / Não se aplica</option>
            <option value="I">Insuficiente</option>
            <option value="R">Razoável</option>
            <option value="B">Bom</option>
            <option value="O">Ótimo</option>

        </select>

        {formik.touched.Num_22 && formik.errors.Num_22 ? (
        <div className={styles.error}>{formik.errors.Num_22}</div>
        ) : null}

        <label htmlFor="Num_23" className={styles.block}>23)</label>
        <p>Demonstra clareza e objetividade na transmissão de informações e ideias</p>

        <select
            className={styles.blockd}
            id="Num_23"
            name="Num_23"
            onChange={formik.handleChange}
            value={formik.values.Num_23}
        >
            <option value="X">Não sei dizer / Não se aplica</option>
            <option value="I">Insuficiente</option>
            <option value="R">Razoável</option>
            <option value="B">Bom</option>
            <option value="O">Ótimo</option>

        </select>

        {formik.touched.Num_23 && formik.errors.Num_23 ? (
        <div className={styles.error}>{formik.errors.Num_23}</div>
        ) : null}
    <SubmitButton text="Enviar" />
    </form>
    </div>
</div>
    )
}

export default AutoAvaliacao3

