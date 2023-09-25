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
        axios.get(`${API_BASE_URL}/servidores`)
            .then(response => {
                setUsuarios(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

/*----------- get lista de servidores com grupo avaliacao back -------------*/
useEffect(() => {
    axios.get(`${API_BASE_URL}/servidores_grupo_avaliacao/`)
        .then(response => {
            setUsuarios2(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}, [])


/*----------- atualizar lista de servidores com grupo avaliacao back -------------*/
useEffect(() => {
    if (submitted) {
        const getUsers = async () => {
        const response = await axios.get(`${API_BASE_URL}/servidores_grupo_avaliacao/`);
        setUsuarios2(response.data);
        setSubmitted(false);
        };

        getUsers();
    }
    }, [submitted]);

/*----------- get lista de usuarios sem grupo do back -------------*/
useEffect(() => {
    axios.get(`${API_BASE_URL}/servidores_sem_grupo_avaliacao`)
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
        const response = await axios.get(`${API_BASE_URL}/servidores_sem_grupo_avaliacao`);
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

/* ------------------ agrupando servidores por grupo avaliacao ----------------*/
      const groupedUsuarios = {};

      usuarios2.forEach((usuario) => {
        usuario.grupo_avaliacao.forEach((grupo) => {
          if (!groupedUsuarios[grupo]) {
            groupedUsuarios[grupo] = [];
          }
          groupedUsuarios[grupo].push(usuario);
        });
      });
      
    
/* -------- Formik --------- */

    const handleGrupoAvaliacaoChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map((option) => option.value);
        formik.setFieldValue('grupo_avaliacao', selectedValues);
    };


  const formik = useFormik({
    initialValues: {
        servidor: {
          nome: '',
          matricula: ''
        },
        grupo_avaliacao: [],
    },
    validationSchema: Yup.object({
        servidor: Yup.object({
            nome: Yup.string().required('Required'),
            matricula: Yup.string().required('Required')
        }),
        grupo_avaliacao: Yup.array().required('Required'),
    }),
    
    onSubmit: async (values, { setSubmitting, resetForm }) => {      
        try {
            const grupo_avaliacao = values.grupo_avaliacao.map(Number);
            const { nome, matricula } = values.servidor;
            
            const serializedData = {
                servidor: nome,
                matricula_servidor: matricula,  // novo campo
                grupo_avaliacao: grupo_avaliacao,
            };
    
            const response = await axios.post(`${API_BASE_URL}/grupo_avaliacao/`, serializedData);
            resetForm();
        } catch (error) {
            // Lidar com o erro
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
                {Object.keys(groupedUsuarios).map((grupo) => (
                <tr className={styles.tr} key={grupo}>
                    <td>{grupo}</td>
                    <td>
                    <ul>
                        {groupedUsuarios[grupo].map((usuario) => (
                        <li key={usuario.id}>
                            {usuario.servidor}
                        </li>
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
                    .sort((a, b) => a.Servidor_Nome.localeCompare(b.Servidor_Nome)) // Ordenar pelo Servidor_Nome em ordem alfabética
                    .map((usuario) => (
                        <tr className={styles.tr} key={usuario.Servidor_Nome}>
                            <td>{usuario.Servidor_Nome}</td>
                        </tr>
                    ))}
            </tbody>
        </table>

    <form className={styles.form_control} onSubmit={formik.handleSubmit}>
        <h2 className={styles.h2}>Adicionar/Mudar Grupo de Avaliação:</h2>
        <div className={styles.form_control}>
        <label htmlFor="servidor">Servidor:</label>
            <select
                id="servidor"
                name="servidor"
                onChange={(e) => {
                    const servidor = JSON.parse(e.target.value);
                    formik.setFieldValue("servidor", servidor);
                }}
                value={JSON.stringify(formik.values.servidor)}
                className={styles.select_servidor}
            >
                <option value="">Selecione um servidor</option>
                {usuarios.sort((a, b) => a.nome.localeCompare(b.nome)).map((user) => (
                    <option key={user.matricula} value={JSON.stringify({nome: user.nome, matricula: user.matricula})}>
                        {user.nome}
                    </option>
                ))}
            </select>

            {formik.touched.id && formik.errors.id ? (
                <div className={styles.error}>{formik.errors.id}</div>
            ) : null}

            <label htmlFor="grupo_avaliacao">Grupo:</label>

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