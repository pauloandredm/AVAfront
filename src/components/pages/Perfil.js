import styles from './Perfil.module.css'

import { BiHelpCircle } from "react-icons/bi";
import API_BASE_URL from '../ApiConfig';
import { useState, useEffect, useContext  } from 'react'
import { AuthContext } from '../../AuthContext';
import axios from '../../axiosConfig';
import jwt_decode from 'jwt-decode';
import Loading from '../layout/Loading';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from '../form/Select'

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';

function EvaluationRow({evalu}) {
  return (
    <tr>
      <td>{evalu.nome_avaliador}</td>
      <td>{evalu.avaliado}</td>
      <td>{evalu.coop}</td>
      <td>{evalu.iniciativa}</td>
      <td>{evalu.pontualidade}</td>
      <td>{evalu.eficiencia}</td>
      <td>{evalu.responsabilidade}</td>
      <td>{evalu.media}</td>
    </tr>
  );
}

function Perfil() {

    const { authenticated, setAuthenticated } = useContext(AuthContext);
    const [usuarios2, setUsuarios2] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [userId, setUserId] = useState(null); // Define the state for the user ID
    const [nome, setNome] = useState(''); // Define the state for the selected server's name
    const [ano, setAno] = useState(new Date().getFullYear()); // Define the state for the selected year
    const [evaluationData, setEvaluationData] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          axios.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${accessToken}`;
            return config;
          });
        }
    }, []);

    const [loading, setLoading] = useState(true);

/* ------------------ get servidores ----------------*/

  const fetchServidoresByAno = async (ano) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/servidores_avaliacao_lotacao/`, { params: { ano } });
      setUsuarios2(response.data);
    } catch (error) {
      console.error("Houve um erro ao buscar os servidores:", error);
    }
  };
  
  /* ------------------ handle select ----------------*/

  function handleSelectChange(event) {
    // Update the state with the selected server's name
    setNome(event.target.value);
  }


/* ------------------ pegando id do access token ----------------*/
    useEffect(() => {
        const access_token2 = localStorage.getItem("access_token");
        if (access_token2) {
          setAuthenticated(true);
          // Decode the token
          const decodedToken = jwt_decode(access_token2);
          const decode = JSON.stringify(decodedToken);
          // Check if the user is a gestor
          const idDoUsuarioLogado = decodedToken.user_id;
          setUserId(idDoUsuarioLogado);
        } else {
          setAuthenticated(false);
        }
      }, [authenticated]); 


    const downloadPdfDocumentWithText = () => {
      const doc = new jsPDF();
    
      // Cabeçalhos da tabela
      const head = [['Avaliador', 'Avaliado', 'Cooperação', 'Iniciativa', 'Pontualidade', 'Eficiência', 'Responsabilidade', 'Média']];
      
      let body = [];
    
      // Seções de avaliação
      const sections = [
        { title: 'Autoavaliação', data: evaluationData.auto_avaliacoes },
        { title: 'Avaliação da Chefia', data: evaluationData.avaliacao_da_chefia },
        { title: 'Avaliação da Equipe', data: evaluationData.avaliacao_da_equipe }
      ];
    
      sections.forEach(section => {
        // Adicionar cabeçalho da seção independentemente de haver dados
        body.push([{ content: section.title, colSpan: 8, styles: { halign: 'center', fillColor: [211, 211, 211] } }]);
        if (section.data.length > 0) {
          // Adicionar dados da seção
          section.data.forEach(evaluation => {
            body.push([
              evaluation.avaliador_nome, 
              evaluation.avaliado, 
              evaluation.coop, 
              evaluation.iniciativa, 
              evaluation.pontualidade, 
              evaluation.eficiencia, 
              evaluation.responsabilidade, 
              evaluation.media
            ]);
          });
        } else {
          // Adicionar linha informando que a avaliação não foi feita
          body.push([{ content: "Essa avaliação ainda não foi feita", colSpan: 8, styles: { halign: 'center' } }]);
        }
      });
    
      // Adicionar Assiduidade e Nota Geral
      if (evaluationData.avaliacao_da_chefia.length > 0) {
        body.push(
          [{ content: 'Assiduidade', colSpan: 7, styles: { halign: 'right', fillColor: [211, 211, 211] } }, evaluationData.avaliacao_da_chefia[0].assiduidade.toString()],        
        );
      }
      else {
        // Adicionar linha informando que a avaliação não foi feita
        body.push([{ content: 'Assiduidade', colSpan: 7, styles: { halign: 'right', fillColor: [211, 211, 211] } }, "Sem Nota"]);
      }

      body.push(     
        [{ content: 'Nota Final', colSpan: 7, styles: { halign: 'right', fillColor: [211, 211, 211] } }, evaluationData.nota_geral.toFixed(2)],
      );
    
      // Adicionar tabela ao documento
      doc.autoTable({
        head: head,
        body: body,
        theme: 'grid',
        didDrawPage: function(data) {
          // Configurações adicionais podem ser feitas aqui
        },
      });
    
      // Salvar o PDF
      doc.save('evaluation-table.pdf');
    };
    
/* -------- Formik --------- */

    const formik = useFormik({
        initialValues: {
        servidor: '',
        ano: '',
        },
        validationSchema: Yup.object({
        servidor: Yup.string().required('Required'),
        ano: Yup.number().required('Required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
          console.log('Form submitted', values);
          try {
            const matricula = values.servidor;
            const ano = values.ano;
            const response = await axios.get(`${API_BASE_URL}/servidor/${matricula}/${ano}`);
            // Assuming you want to store the fetched data in a state
            setEvaluationData(response.data);
          } catch (error) {
            console.error('Houve um erro ao buscar os dados:', error);
          } finally {
            setSubmitting(false);
          }
        },
    }); 

  return (
    <div className={styles.avaliacao_container1}>
      <div className={styles.avaliacao_container}>
        <h1>Sua Lotação</h1>
        <form className={styles.form_servidor} onSubmit={formik.handleSubmit}>
        
            <select
              className={styles.selectservidor}
              name="ano"
              onChange={(e) => {
                formik.setFieldValue('ano', e.target.value);
                fetchServidoresByAno(e.target.value);
              }}
              value={formik.values.ano}
            >
              <option value="" disabled>Selecione um ano</option> {/* Placeholder option */}
              {[2024, 2025, 2026, 2027, 2028].map((year) => (
                <option key={year} value={year}>
                    {year}
                </option>
              ))}
            </select>

            <select
              className={styles.selectservidor2}
              name="servidor"
              onChange={(e) => formik.setFieldValue('servidor', e.target.value)}
              value={formik.values.servidor}
              style={{ display: formik.values.ano ? '' : 'none'}}
            >
              <option value="" disabled>Selecione um servidor</option> {/* Placeholder option */}
              {usuarios2 && usuarios2.map((usuario, index) => (
                <option key={index} value={usuario.matricula}>
                    {usuario.avaliado}
                </option>
              ))}
            </select>

            <button className={styles.botaoservidor} type="submit">Pesquisar</button>
        </form>
      </div>

        <div className={styles.tableContainer}>
          {evaluationData && (
            <>
            <table className={styles.evaluationTable} id="evaluationTable">
              <thead>
                <tr>
                  <th>Avaliador</th>
                  <th>Avaliado</th>
                  <th>Cooperação</th>
                  <th>Iniciativa</th>
                  <th>Pontualidade</th>
                  <th>Eficiência</th>
                  <th>Responsabilidade</th>
                  <th>Média</th>
                </tr>
              </thead>
              <tbody>
                {/* Autoavaliação */}
                <tr>
                  <td colSpan="8" style={{textAlign: "center", fontWeight: "bold"}}>Autoavaliação</td>
                </tr>
                {evaluationData.auto_avaliacoes.length > 0 ? (
                  evaluationData.auto_avaliacoes.map((evalu, index) => (
                    <EvaluationRow key={`auto_${index}`} evalu={evalu} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{textAlign: "center", backgroundColor: "#efefef", fontWeight: "normal"}}>Essa avaliação ainda não foi feita</td>
                  </tr>
                )}

                {/* Avaliação da Chefia */}
                <tr>
                  <td colSpan="8" style={{textAlign: "center", fontWeight: "bold"}}>Avaliação da Chefia</td>
                </tr>
                {evaluationData.avaliacao_da_chefia.length > 0 ? (
                  evaluationData.avaliacao_da_chefia.map((evalu, index) => (
                    <EvaluationRow key={`chefia_${index}`} evalu={evalu} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{textAlign: "center", backgroundColor: "#efefef", fontWeight: "normal"}}>Essa avaliação ainda não foi feita</td>
                  </tr>
                )}

                {/* Avaliação da Equipe */}
                <tr>
                  <td colSpan="8" style={{textAlign: "center", fontWeight: "bold"}}>Avaliação da Equipe</td>
                </tr>
                {evaluationData.avaliacao_da_equipe.length > 0 ? (
                  evaluationData.avaliacao_da_equipe.map((evalu, index) => (
                    <EvaluationRow key={`equipe_${index}`} evalu={evalu} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{textAlign: "center", backgroundColor: "#efefef", fontWeight: "normal"}}>Essa avaliação ainda não foi feita</td>
                  </tr>
                )}

                {/* Assiduidade - Sempre será parte da avaliação da chefia, mas mostramos condicionalmente */}
                <tr>
                  <td colSpan="8" style={{textAlign: "center", fontWeight: "bold"}}>Assiduidade</td>
                </tr>
                <tr>
                  <td colSpan="8" style={{textAlign: "center",  backgroundColor: "#ededed", fontWeight: "normal"}}>
                    {evaluationData.avaliacao_da_chefia.length > 0 ? evaluationData.avaliacao_da_chefia[0].assiduidade : "Essa avaliação ainda não foi feita"}
                  </td>
                </tr>

                {/* Nota geral */}
                <tr>
                  <td colSpan="8" style={{textAlign: "center", fontWeight: "bold"}}>Nota Final</td>
                </tr>
                <tr>
                  <td colSpan="8" style={{textAlign: "center", fontWeight: "normal", backgroundColor: "#e0e0e0", border: "1px solid #ccc"}}>
                    {evaluationData.nota_geral ? evaluationData.nota_geral.toFixed(2) : "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
            <button className={styles.botao_baixar} onClick={downloadPdfDocumentWithText}>Baixar PDF</button>
            </>
          )}
        </div>
        

    </div>
  );
}

export default Perfil