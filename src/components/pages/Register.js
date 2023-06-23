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

function Register() {
    const navigate = useNavigate();

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

const [cadastroAdicional, setCadastroAdicional] = useState({ nome: '', cargo: '' });

const verificarMatricula = async (matricula) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/verificar-matricula/${matricula}`);
    // Matrícula encontrada, não exibir campos adicionais
    setCadastroAdicional({ nome: '', cargo: '' });
  } catch (error) {
    // Matrícula não encontrada, exibir campos adicionais
    setCadastroAdicional({ nome: '', cargo: '' });
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

        <label htmlFor="cpf">CPF:</label>
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

        <label htmlFor="matricula">Matricula:</label>
        <input
          text="matricula"
          id="matricula"
          name="matricula"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.matricula}
        />

        {formik.touched.matricula && formik.errors.matricula ? (
         <div className={styles.error}>{formik.errors.matricula}</div>
        ) : null}   

        <label htmlFor="password">Senha:</label>
        <input
          text="password"
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        
        {formik.touched.password && formik.errors.password ? (
         <div className={styles.error}>{formik.errors.password}</div>
        ) : null}

        <label htmlFor="passwordConfirm">Repita a senha:</label>
        <input
          text="password"
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.passwordConfirm}
        />
        
        {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
          <div className={styles.error}>{formik.errors.passwordConfirm}</div>
        ) : null}

      </div>
      <SubmitButton text="Cadastrar" />
    </form>
    )
}   

export default Register;
    