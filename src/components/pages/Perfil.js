import styles from './Perfil.module.css'
import SubmitButton from '../form/SubmitButton'

import API_BASE_URL from '../ApiConfig';
import { useState, useEffect, useContext  } from 'react'
import { AuthContext } from '../../AuthContext';
import axios from '../../axiosConfig';
import jwt_decode from 'jwt-decode';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import qs from 'qs';

function Perfil() {

    const [avaliado, setAvaliado] = useState([]);
    const { authenticated, setAuthenticated } = useContext(AuthContext);
    const [UserId, setUserId] = useState(false);
    const [usuarios, setUsuarios] = useState([])
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

/*------------------ get lista de lotacoes------------------ */

    const [lotacoes, setLotacoes] = useState([]);

    useEffect(() => {
      axios.get(`${API_BASE_URL}/lotation/`)
        .then(response => {
            setLotacoes(response.data)
        })
        .catch(error => {
        console.log(error)
          })
    }, [])
    
/*----------- get lista de usuarios do back -------------*/
    useEffect(() => {
        axios.get(`${API_BASE_URL}/user_detail`)
            .then(response => {
                setUsuarios(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        console.log(usuarios)
    }, [])

/*----------- atualizar lista de usuarios do back -------------*/
    useEffect(() => {
    if (submitted) {
        const getUsers = async () => {
        const response = await axios.get(`${API_BASE_URL}/user_detail`);
        setUsuarios(response.data);
        setSubmitted(false);
        };

        getUsers();
    }
    }, [submitted]);
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

    return (
    <div className={styles.avaliacao_container1}>
    <h1>Perfil</h1>
    <div className={styles.avaliacao_container}>
    
    <h2 className={styles.h22}>Suas informações:</h2>
    <div className={styles.h2div}>
        {usuarios.map((usuario) => {
        if (usuario.id === UserId) {
            return (
            <div className={styles.userdiv} key={usuario.id}>
                <p>Nome: {usuario.nome}</p>
                <p>Matrícula: {usuario.matricula}</p>
                <p>Cargo: {usuario.Cargo}</p>
                <p>Lotações:</p>
            {usuario.nome_lotacao &&
            usuario.nome_lotacao.map((lotacao) => (
                <div key={lotacao} style={{ marginLeft: '4ch' }}>
                - {lotacao}
                </div>
            ))}

            </div>
            );
        }
        return null;
        })}
    </div>

    <form className={styles.form_control} onSubmit={formik.handleSubmit}>
    <h2 className={styles.h2}>Servidores da sua lotação:</h2>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Matrícula</th>
                    <th>Cargo</th>
                    <th>Lotações</th>
                </tr>
            </thead>
            <tbody className={styles.tbody}>
                {usuarios.map((usuario) => (
                    <tr className={styles.tr} key={usuario.id}>
                        <td>{usuario.nome}</td>
                        <td>{usuario.matricula}</td>
                        <td>{usuario.Cargo}</td>
                        <td>
                            {usuario.nome_lotacao &&
                            usuario.nome_lotacao.map((lotacao) => (
                                <div key={lotacao}>{lotacao}</div>
                            ))}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    <h2 className={styles.h2}>Adicionar/Mudar lotação:</h2>
    <div className={styles.form_control}>
        <label htmlFor="id">Servidor:</label>
            <select
                id="id"
                name="id"
                onChange={formik.handleChange}
                value={formik.values.id}
            >
                <option value="">Selecione um servidor</option>
                    {usuarios.map((user) => (
                <option key={user.id} value={user.id}>
                    {user.nome}
                </option>
                    ))}
            </select>

            {formik.touched.id && formik.errors.id ? (
                <div className={styles.error}>{formik.errors.id}</div>
            ) : null}

            <label htmlFor="lotacoes">Lotação:</label>
            <select
                id="lotacoes"
                name="lotacoes"
                onChange={formik.handleChange}
                value={formik.values.lotacoes}
                multiple  // Permite a seleção de várias opções
            >
                <option value="">Selecione uma lotação</option>
                {lotacoes.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.nome}
                    </option>
                ))}
            </select>

        
    </div>
    <SubmitButton text="Enviar" />
    </form>

    </div>
    </div>
    )
}

export default Perfil