import styles from './Grupos.module.css'
import SubmitButton from '../form/SubmitButton'

import API_BASE_URL from '../ApiConfig';
import { useState, useEffect, useContext  } from 'react'
import { AuthContext } from '../../AuthContext';
import axios from '../../axiosConfig';
import jwt_decode from 'jwt-decode';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loading from '../layout/Loading';


import Select from 'react-select'
import Creatable, { useCreatable } from 'react-select/creatable';
import CreatableSelect from 'react-select/creatable';


function Perfil() {

    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        Promise.all([
            axios.get(`${API_BASE_URL}/grupolist/`),
            axios.get(`${API_BASE_URL}/servidores`),
            axios.get(`${API_BASE_URL}/servidores_grupo_avaliacao/`),
            axios.get(`${API_BASE_URL}/servidores_sem_grupo_avaliacao`),

        ]).then((responses) => {
            setGrupolist(responses[0].data);
            setUsuarios(responses[1].data);
            setUsuarios2(responses[2].data);
            setSemGrupo(responses[3].data);

        }).catch((error) => {
            console.error("Houve um erro ao buscar os dados:", error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);


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


/*----------- atualizar GROUPLIST avaliacao back -------------*/
useEffect(() => {
    if (submitted) {
        const getUsers = async () => {
        const response = await axios.get(`${API_BASE_URL}/grupolist/`);
        setGrupolist(response.data);
        setSubmitted(false);
        };

        getUsers();
    }
    }, [submitted]);


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

    if (usuarios2 && Array.isArray(usuarios2)) {
        usuarios2.forEach((usuario) => {
            if (usuario.grupo_avaliacao && Array.isArray(usuario.grupo_avaliacao)) {
                usuario.grupo_avaliacao.forEach((grupo) => {
                    const groupId = grupo.id;  // Use groupId como chave
                    if (!groupedUsuarios[groupId]) {
                        groupedUsuarios[groupId] = [];
                    }
                    groupedUsuarios[groupId].push(usuario);
                });
            }
        });
    }


    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/grupo_avaliacao/delete-by-id/?id=${id}`, {
                params: {
                    id
                }
            });
            console.log(response.data);
            // Atualize seu estado aqui se necessário
        } catch (error) {
            console.error("Erro ao deletar o usuário:", error);
        } finally {
            setSubmitted(true);
        }
    };
    
    
      
    
/* -------- Formik --------- */

    const handleGrupoAvaliacaoChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map((option) => option.value);
        formik.setFieldValue('grupo_avaliacao', selectedValues);
    };

    const [opcoesSelecionadas, setOpcoesSelecionadas] = useState([]);

    const handleGrupoAvaliacaoChange2 = (opcoes) => {
    setOpcoesSelecionadas(opcoes);
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
                const grupo_avaliacao = opcoesSelecionadas.map((opcao) => opcao.value);
                const { nome, matricula } = values.servidor;
                
                const serializedData = {
                    servidor: nome,
                    matricula_servidor: matricula,  // novo campo
                    grupo_avaliacao: grupo_avaliacao,
                };
        
                const response = await axios.post(`${API_BASE_URL}/grupo_avaliacao/`, serializedData);
                resetForm();
                setOpcoesSelecionadas([]);
            } catch (error) {
                // Lidar com o erro
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
    <h1>Grupos de Avaliação</h1>
        <div className={styles.avaliacao_container}>

            <h2>Servidores com Grupo:</h2>
                <div className={styles.table_container}>
                    <table className={styles.table1}>
                        <thead>
                            <tr>
                                <th>Grupo</th>
                                <th>Servidores</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            {Object.keys(groupedUsuarios).map((groupId) => {
                                const grupo = grupolist.find((g) => g.id == groupId);  // Encontre o objeto de grupo correspondente
                                return (
                                    <tr className={styles.tr_servidores} key={groupId}>
                                        <td>{grupo ? grupo.nome : 'Nome Desconhecido'}</td>
                                        <td>
                                            <ul>
                                                {groupedUsuarios[groupId].map((usuario) => (
                                                    <li key={usuario.id}>
                                                        {usuario.servidor}
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td id={styles.td_delete}>
                                            {groupedUsuarios[groupId].map((usuario) => (
                                                <button
                                                    key={usuario.id}
                                                    onClick={() => handleDelete(usuario.id)}
                                                    className={styles.deleteButton}
                                                >
                                                    X
                                                </button>
                                            ))}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

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
                <div className={styles.form_control2}>
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

                    <label htmlFor="grupo_avaliacao">Selecione um grupo ou crie um novo:</label>

                    <CreatableSelect
                        closeMenuOnSelect={false}
                        id="grupo_avaliacao"
                        name="grupo_avaliacao"
                        className={styles.select_grupo}
                        options={grupolist.map((grupo) => ({ value: grupo.id, label: grupo.nome }))}
                        isMulti
                        onChange={handleGrupoAvaliacaoChange2}
                        value={opcoesSelecionadas}
                        placeholder="Selecione um grupo predefinido ou crie um grupo"
                    />

                </div>
                <SubmitButton text="Enviar" />
            </form>
        </div>
    </div>
    )
}
export default Perfil