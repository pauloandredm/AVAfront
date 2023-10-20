import styles from './Perfil.module.css'

import API_BASE_URL from '../ApiConfig';
import { useState, useEffect, useContext  } from 'react'
import { AuthContext } from '../../AuthContext';
import axios from '../../axiosConfig';
import jwt_decode from 'jwt-decode';
import Loading from '../layout/Loading';
import { useFormik } from 'formik';
import * as Yup from 'yup';


function Perfil() {

    const { authenticated, setAuthenticated } = useContext(AuthContext);
    const [UserId, setUserId] = useState(false);
    const [usuarios, setUsuarios] = useState([])
    const [usuarios2, setUsuarios2] = useState([])
    const [submitted, setSubmitted] = useState(false);

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
    const [acordoRecusado, setAcordoRecusado] = useState([]);
    const [autoavaliacao, setAutoavaliacao] = useState([]);
    const [chefiaavaliacao, setChefiaavaliacao] = useState([]);
    const [notasavaliacao, setNotasavaliacao] = useState([]);

    useEffect(() => {
      Promise.all([
          axios.get(`${API_BASE_URL}/verificar_acordo_desempenho/`),
          axios.get(`${API_BASE_URL}/auto_avaliacao/`),
          axios.get(`${API_BASE_URL}/chefia_avaliacao/`),
          axios.get(`${API_BASE_URL}/geral_avaliacao/`),
          axios.get(`${API_BASE_URL}/user`),
          axios.get(`${API_BASE_URL}/servidores_lotacao`),
          // ... adicione todas as suas chamadas axios aqui
      ]).then((responses) => {
          setAcordoRecusado(responses[0].data);
          setAutoavaliacao(responses[1].data);
          setChefiaavaliacao(responses[2].data);
          setNotasavaliacao(responses[3].data);
          setUsuarios(responses[4].data);
          setUsuarios2(responses[5].data)
          // ... defina os outros estados aqui usando os índices apropriados
      }).catch((error) => {
          console.error("Houve um erro ao buscar os dados:", error);
      }).finally(() => {
          setLoading(false);
      });
  }, []);


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
    
/* -------- Formik --------- */

const formik = useFormik({
    initialValues: {
      id: '',
      lotacoes: [],
    },
    validationSchema: Yup.object({
        id: Yup.string()
            .required('Required'),
        lotacoes: Yup.array()
            .required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {      
        try {
            // Converter lotacoes para número inteiro
            const lotacoes = values.lotacoes.map(Number);

            const serializedData = {
                id: values.id,
                lotacoes: lotacoes,
            };

            const response = await axios.put(`${API_BASE_URL}/user_detail/`, serializedData);
            resetForm();
        } catch (error) {
          // Lidar com o erro, exibir mensagem de erro para o usuário
        } finally {
          setSubmitting(false);
          setSubmitted(true);
        }
    },
  });    

  
  if (loading) {
    return <Loading/>; // Você pode substituir isso por uma animação de carregamento, por exemplo
  }

    return (
    
    <div className={styles.avaliacao_container1}>
    <h1>Sua Lotação</h1>
    <div className={styles.avaliacao_container}>
    
    <h2 className={styles.h22}>Suas informações:</h2>
    <div className={styles.h2div}>
        {usuarios.map((usuario) => {
        if (usuario.id === UserId) {
            return (
            <div className={styles.userdiv} key={usuario.id}>
                <p>Nome: {usuario.nome}</p>
                <p>Matrícula: {usuario.matricula}</p>
                <p>Lotação: {usuario.lotacoes}</p>
            </div>
            );
        }
        return null;
        })}
    </div>

    <h2 className={styles.h2}>Servidores da sua lotação:</h2>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Matrícula</th>
                    <th>Cargo</th>
                    <th>Núcleo</th>
                    <th>Chefia</th>
                </tr>
            </thead>
            <tbody className={styles.tbody}>
                {usuarios2.map((usuario) => (
                    <tr className={styles.tr} key={usuario.id}>
                        <td>{usuario.nome}</td>
                        <td>{usuario.matricula}</td>
                        <td>{usuario.cargo}</td>
                        <td>{usuario.nucleo}</td>
                        <td>{usuario.chefia}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        {(notasavaliacao.length > 0 || autoavaliacao.length > 0 || chefiaavaliacao.length > 0) && (
        <div> 
            <h2 className={styles.h22}>Avaliações:</h2>
            <div className={styles.h3div}>
                {autoavaliacao.length > 0 && (
                    <div>
                        <h3 className={styles.h22}>Auto avaliações:</h3>
                        <div className={styles.h2div}>
                            {autoavaliacao.map((usuario) => (
                                <div className={styles.userdiv2} key={usuario.id}>
                                    <p>Avaliador: {usuario.avaliador_nome}</p>
                                    <p>Avaliado: {usuario.avaliado}</p>
                                    <p>Média: {usuario.media}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {chefiaavaliacao.length > 0 && (
                    <div>
                        <h3 className={styles.h22}>Avaliações da chefia imediata:</h3>
                        <div className={styles.h2div}>
                            {chefiaavaliacao.map((usuario) => (
                                <div className={styles.userdiv2} key={usuario.id}>
                                    <p>Avaliador: {usuario.avaliador_nome}</p>
                                    <p>Avaliado: {usuario.avaliado}</p>
                                    <p>Média: {usuario.media}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {notasavaliacao.length > 0 && (
                    <div>
                        <h3 className={styles.h22}>Outras avaliações:</h3>
                        <div className={styles.h2div}>
                            {notasavaliacao.map((usuario) => (
                                <div className={styles.userdiv2} key={usuario.id}>
                                    <p>Avaliador: {usuario.avaliador_nome}</p>
                                    <p>Avaliado: {usuario.avaliado}</p>
                                    <p>Média: {usuario.media}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
        )}



        {acordoRecusado.length > 0 && (
        <div>
            <h2 className={styles.h22}>Acordos desempenho recusado:</h2>
            <div className={styles.h2div}>
                {acordoRecusado.map((usuario) => (
                <div className={styles.userdiv2} key={usuario.id}>
                    <p><strong>Avaliador:</strong> {usuario.avaliador_nome}</p>
                    <p><strong>Avaliado:</strong> {usuario.avaliado}</p>
                    {usuario.atividades.map((atividade, index) => (
                    <div key={index}>
                        <p className={styles.atividades}><strong>Atividade {index + 1}:</strong></p>
                        <div className={styles.atividades2}>
                        <p><strong>Descrição:</strong> {atividade.descricao_atividade}</p>
                        <p><strong>Desempenho Esperado:</strong> {atividade.desempenho_esperado}</p>
                        </div>
                    </div>
                    ))}
                </div>
                ))}
            </div>
        </div>
        )}

    </div>
    </div>
    )
}

export default Perfil