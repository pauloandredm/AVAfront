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

/* -------- Formik --------- */

    const formik = useFormik({
      initialValues: {
        nome: '',
        matricula: '',
        Cargo: '',
        lotacoes: '',
        cpf: '',
        password: '',
      },
      validationSchema: Yup.object({
        nome: Yup.string()
          .max(80, 'Must be 80 characters or less')
          .required('Required'),
        cpf: Yup
          .string()
          .required("CPF is required")
          .test((value) => cpf.isValid(value)),
        matricula: Yup.string()
          .max(9, 'Must be 9 characters or less')
          .required('Required'),
        Cargo: Yup.string()
          .max(50, 'Must be 50 characters or less')
          .nullable()
          .notRequired(),
        lotacoes: Yup.string()
          .max(11, 'Must be 11 characters or less')
          .required('Required'),
        password: Yup.string()
          .required('Required'),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Required'),
      }),
      onSubmit: async (values, { setSubmitting, resetForm }) => {
        if (values.Cargo === '') {
          values.Cargo = null;
        }      
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
        <label htmlFor="nome">Nome:</label>
        <input
          text="Nome"
          id="nome"
          name="nome"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.nome}
        />

        {formik.touched.nome && formik.errors.nome ? (
         <div className={styles.error}>{formik.errors.nome}</div>
        ) : null}

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

        <label htmlFor="Cargo">Cargo:</label>
        <input
          text="Cargo"
          id="Cargo"
          name="Cargo"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.Cargo}
        />
        
        {formik.touched.Cargo && formik.errors.Cargo ? (
         <div className={styles.error}>{formik.errors.Cargo}</div>
        ) : null}

        <label htmlFor="lotacoes">Lotação:</label>
        <select
          id="lotacoes"
          name="lotacoes"
          onChange={formik.handleChange}
          value={formik.values.lotacoes}
        >
          <option value="">Selecione uma lotação</option>
          {lotacoes.map((user) => (
            <option key={user.id} value={user.id}>
              {user.nome}
              </option>
          ))}
        </select>

        {formik.touched.lotacoes && formik.errors.lotacoes ? (
            <div className={styles.error}>{formik.errors.lotacoes}</div>
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
    