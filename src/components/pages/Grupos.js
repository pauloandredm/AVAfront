import styles from './Grupos.module.css'
import SubmitButton from '../form/SubmitButton'

import API_BASE_URL from '../ApiConfig';
import { useState, useEffect, useContext  } from 'react'
import { AuthContext } from '../../AuthContext';
import axios from '../../axiosConfig';
import jwt_decode from 'jwt-decode';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import qs from 'qs';

import Select from 'react-select'


function Perfil() {

    const { authenticated, setAuthenticated } = useContext(AuthContext);
    const [UserId, setUserId] = useState(false);
    const [usuarios, setUsuarios] = useState([])
    const [usuarios2, setUsuarios2] = useState([])
    const [semGrupo, setSemGrupo] = useState([])
    const [grupolist, setGrupolist] = useState([]);
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

/*------------------ get lista de grupos avaliacao------------------ */

useEffect(() => {
  axios.get(`${API_BASE_URL}/grupolist/`)
    .then(response => {
        setGrupolist(response.data)
    })
    .catch(error => {
    console.log(error)
      })
}, [])

/*----------- get lista de usuarios do back -------------*/
useEffect(() => {
    axios.get(`${API_BASE_URL}/GrupoAvaliacao`)
        .then(response => {
            setUsuarios(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}, [])



/*----------- get lista de usuarios do back -------------*/
useEffect(() => {
    axios.get(`${API_BASE_URL}/GrupoAvaliacao2`)
        .then(response => {
            setUsuarios2(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}, [])


/*----------- atualizar lista de usuarios do back -------------*/
useEffect(() => {
    if (submitted) {
        const getUsers = async () => {
        const response = await axios.get(`${API_BASE_URL}/GrupoAvaliacao2`);
        setUsuarios2(response.data);
        setSubmitted(false);
        };

        getUsers();
    }
    }, [submitted]);



/*----------- get lista de usuarios sem grupo do back -------------*/
useEffect(() => {
    axios.get(`${API_BASE_URL}/SemGrupoAvaliacao`)
        .then(response => {
            setSemGrupo(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}, [])


/*----------- atualizar lista de usuarios sem grupo do back -------------*/
useEffect(() => {
    if (submitted) {
        const getUsers = async () => {
        const response = await axios.get(`${API_BASE_URL}/SemGrupoAvaliacao`);
        setSemGrupo(response.data);
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

const handleGrupoAvaliacaoChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    formik.setFieldValue('grupo_avaliacao', selectedValues);
  };

  /* options={grupolist.map((user) => ({ value: user.id, label: user.nome }))} */


const formik = useFormik({
    initialValues: {
      nome: '',
      grupo_avaliacao: [],
    },
    validationSchema: Yup.object({
        nome: Yup.string()
            .required('Required'),
        grupo_avaliacao: Yup.array()
            .required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {      
        try {
            // Converter lotacoes para número inteiro
            const grupo_avaliacao = values.grupo_avaliacao.map(Number);

            const serializedData = {
                nome: values.nome,
                grupo_avaliacao: grupo_avaliacao,
            };

            const response = await axios.put(`${API_BASE_URL}/GrupoAvaliacao/`, serializedData);
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
    <h1>Grupos de Avaliação</h1>
    <div className={styles.avaliacao_container}>
    
    <h2 className={styles.h2}>Servidores com Grupo:</h2>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Grupo</th>
                    <th>Servidores</th>
                </tr>
            </thead>
            <tbody className={styles.tbody}>
            {usuarios2
            .sort((a, b) => a.Grupo - b.Grupo) // Ordena os grupos em ordem crescente
            .map((usuario) => (
                <tr className={styles.tr} key={usuario.Grupo}>
                <td>{usuario.Grupo}</td>
                <td>
                    <ul>
                    {usuario.Servidores.map((servidor) => (
                        <li key={servidor.id}>{servidor.nome}</li>
                    ))}
                    </ul>
                </td>
                </tr>
            ))}
            </tbody>
        </table>

    <h2 className={styles.h2}>Servidores sem Grupo:</h2>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Servidor</th>
                </tr>
            </thead>
            <tbody className={styles.tbody}>
                {semGrupo
                    .sort((a, b) => a.nome.localeCompare(b.nome)) // Ordenar pelo nome em ordem alfabética
                    .map((usuario) => (
                        <tr className={styles.tr} key={usuario.nome}>
                            <td>{usuario.nome}</td>
                        </tr>
                    ))}
            </tbody>
        </table>


    <form className={styles.form_control} onSubmit={formik.handleSubmit}>
        <h2 className={styles.h2}>Adicionar/Mudar Grupo de Avaliação:</h2>
        <div className={styles.form_control}>
        <label htmlFor="nome">Servidor:</label>
            <select
                id="nome"
                name="nome"
                onChange={formik.handleChange}
                value={formik.values.nome}
                className={styles.select_servidor}
            >
                <option value="">Selecione um servidor</option>
                    {usuarios.sort((a, b) => a.nome.localeCompare(b.nome)).map((user) => (
                <option key={user.id} value={user.id}>
                    {user.nome}
                </option>
                    ))}
            </select>

            {formik.touched.id && formik.errors.id ? (
                <div className={styles.error}>{formik.errors.id}</div>
            ) : null}

            <label htmlFor="grupo_avaliacao">Grupo:</label>
            {/* <select
                id="grupo_avaliacao"
                name="grupo_avaliacao"
                className={styles.select_grupo}
                onChange={formik.handleChange}
                value={formik.values.grupo_avaliacao}
                multiple  // Permite a seleção de várias opções
            >
                {grupolist.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.nome}
                    </option>
                ))}
            </select>  */}
            
            {/* <Select
                id="grupo_avaliacao"
                name="grupo_avaliacao"
                className={styles.select_grupo}
                options={grupolist.map((user) => ({ value: user.id, label: user.nome }))}
                isMulti
                onChange={formik.handleChange}
                value={formik.values.grupo_avaliacao}
            /> */}

            <Select
                closeMenuOnSelect={false}
                id="grupo_avaliacao"
                name="grupo_avaliacao"
                className={styles.select_grupo}
                options={grupolist.map((user) => ({ value: user.id, label: user.nome }))}
                isMulti
                onChange={handleGrupoAvaliacaoChange}
                value={formik.values.grupo_avaliacao.map((id) => ({
                    value: id,
                    label: grupolist.find((user) => user.id === id).nome,
                }))}
            />


        </div>

    
        <SubmitButton text="Enviar" />
    </form>

    </div>
    </div>
    )
}

export default Perfil