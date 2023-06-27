import { React, useState, useEffect } from 'react'
import { useFormik } from 'formik';
import axios from '../../axiosConfig';
import SubmitButton from '../form/SubmitButton';
import API_BASE_URL from '../ApiConfig';
import styles from './Avaliacao.module.css';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { cpf } from "cpf-cnpj-validator";
import qs from 'qs';
import { BiHelpCircle } from "react-icons/bi";
import { BiShowAlt, BiHide } from 'react-icons/bi';


function Register() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

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

// Função para verificar a matrícula e exibir os campos adicionais se não existir

const [cadastroAdicional, setCadastroAdicional] = useState({ nome: '', lotacoes: '' });

const verificarMatricula = async (matricula) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/matricula/`);
    const matriculas = response.data.map((item) => item.matricula); // Extrai apenas as matrículas da lista
    if (matriculas.includes(String(matricula))) {
      // Matrícula encontrada, não exibir campos adicionais
      setCadastroAdicional(null);
    } else {
      // Matrícula não encontrada, exibir campos adicionais
      setCadastroAdicional({ nome: '', lotacoes: '' });
    }
  } catch (error) {
    // Lidar com erros de requisição, exibir mensagem de erro, etc.
  }
};





/* -------- Formik --------- */

    const formik = useFormik({
      initialValues: {
        matricula: '',
        cpf: '',
        password: '',
      },
      validationSchema: Yup.object({
        cpf: Yup
          .string()
          .required("CPF is required")
          .test((value) => cpf.isValid(value)),
        matricula: Yup.string()
          .max(9, 'Must be 9 characters or less')
          .required('Required'),
        password: Yup.string()
          .required('Required'),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Required'),
      }),
      onSubmit: async (values, { setSubmitting, resetForm }) => {   
        try {
          const serializedData = qs.stringify(values, { encode: false });
          const response = await axios.post(`${API_BASE_URL}/register/`, serializedData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
          navigate('/login');
          // process the response, e.g. show success message to user
          resetForm();
        } catch (error) {
          // handle error, e.g. show error message to user
        } finally {
          setSubmitting(false);
        }
      },
    });

    return (
    <form className={styles.avaliacao_container} onSubmit={formik.handleSubmit}>
      <div className={styles.form_control}>

        <label htmlFor="cpf">CPF
          <div className={styles.tooltip}><BiHelpCircle/>
            <span className={styles.tooltiptext}>
              Somente os números
            </span>
          </div>
        :</label>
        <input
          text="cpf"
          id="cpf"
          name="cpf"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.cpf}
        />

        {formik.touched.cpf && formik.errors.cpf ? (
         <div className={styles.error}>{formik.errors.cpf}</div>
        ) : null}

        <label htmlFor="matricula">Matricula
          <div className={styles.tooltip}><BiHelpCircle/>
            <span className={styles.tooltiptext}>
              Somente os números
            </span>
          </div>
        :</label>
        <input
          text="matricula"
          id="matricula"
          name="matricula"
          type="number"
          onBlur={(event) => {
            verificarMatricula(event.target.value);
          }}
          onChange={formik.handleChange}
          value={formik.values.matricula}
        />

        {formik.touched.matricula && formik.errors.matricula ? (
         <div className={styles.error}>{formik.errors.matricula}</div>
        ) : null}

        {cadastroAdicional !== null && (
        <>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nome}
          />

          <label htmlFor="lotacoes">Lotação:</label>
          <select
            id="lotacoes"
            name="lotacoes"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lotacoes}
          >
            <option value="">Selecione uma opção</option>
            {lotacoes.map((lotacao) => (
              <option key={lotacao.id} value={lotacao.id}>
                {lotacao.nome}
              </option>
            ))}
          </select>
        </>
        )}   

        <label htmlFor="password">Senha:</label>
        <div className={styles.password_input}>
          <input
            className={styles.input_container}
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {showPassword ? (
            <BiHide
              className={styles.show_password_icon}
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <BiShowAlt
              className={styles.show_password_icon}
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        
        {formik.touched.password && formik.errors.password ? (
         <div className={styles.error}>{formik.errors.password}</div>
        ) : null}

        
        <label htmlFor="passwordConfirm">Repita a senha:</label>
        <div className={styles.password_input}>
          <input
            className={styles.input_container}
            text="password"
            id="passwordConfirm"
            name="passwordConfirm"
            type={showPassword ? 'text' : 'password'}
            onChange={formik.handleChange}
            value={formik.values.passwordConfirm}
          />
          {showPassword ? (
            <BiHide
              className={styles.show_password_icon}
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <BiShowAlt
              className={styles.show_password_icon}
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        
        {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
          <div className={styles.error}>{formik.errors.passwordConfirm}</div>
        ) : null}

      </div>
      <SubmitButton text="Cadastrar" />
    </form>
    )
}   

export default Register;
    