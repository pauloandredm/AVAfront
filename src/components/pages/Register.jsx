import { React, useState, useEffect } from 'react'
import InputMask from 'react-input-mask';
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
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    /* ------ timeout mensagem ------ */
    useEffect(() => {
      let timer;
      if (showErrorMessage) {
        timer = setTimeout(() => {
          setShowErrorMessage(false);
          setErrorMessage('');
        }, 3000);
      }
      return () => {
        clearTimeout(timer);
      };
    }, [showErrorMessage]);


     /* verificar a cpf no backend */
     const handleCPFBlur = async (event) => {
      const cpf = event.target.value;
    
      try {
        const response = await axios.post(`${API_BASE_URL}/verificar_cpf/`, { cpf: cpf },);
        const data = response.data;
    
        if (data.length > 0) {   
          // Verifica se é um servidor
          formik.setFieldValue('nome', data[0].Servidor_Nome);
          formik.setFieldValue('matricula', data[0].S_Matricula);
          formik.setFieldValue('lotacoes', data[0].G_Lotacao);
        }
        
      } catch (error) {
          // Tratar erros ou lidar com a matrícula não encontrada
          if (error.response && error.response.data.message === "Matrícula não encontrada") {
            formik.setFieldError('matricula', 'Matrícula não encontrada');
          } else {
            console.log(error);
          }
      }
    };

    const handleNameChange = (e) => {
      // Transforma o valor do input em maiúsculas
      formik.setFieldValue('nome', e.target.value.toUpperCase());
  };    

    const formik = useFormik({
      initialValues: {
        cpf: '',
        password: '',
        nome: '',
        lotacoes: '',
      },
      validationSchema: Yup.object({
        cpf: Yup
          .string()
          .required("CPF is required")
          .test((value) => cpf.isValid(value)),
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
          if (error.response && error.response.status === 400) {
            setErrorMessage('CPF já cadastrado');
            setShowErrorMessage(true);
          } else {
            // Other types of errors, handle them accordingly
          }
        } finally {
          setSubmitting(false);
        }
      },
    });

    return (
    <form className={styles.avaliacao_container} onSubmit={formik.handleSubmit}>
      <div className={styles.form_control}>

        <label htmlFor="cpf">CPF:</label>
        <InputMask
          mask="999.999.999-99"
          className={styles.input_register}
          id="cpf"
          name="cpf"
          type="text"
          value={formik.values.cpf}
          onChange={formik.handleChange}
          onBlur={handleCPFBlur}
        />

        {formik.touched.cpf && formik.errors.cpf ? (
         <div className={styles.error}>{formik.errors.cpf}</div>
        ) : null}

          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            className={styles.input_register}
            id="nome"
            name="nome"
            onChange={handleNameChange}
            onBlur={formik.handleBlur}
            value={formik.values.nome}
          />

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
      {showErrorMessage && <div className={styles.error_message}>{errorMessage}</div>}
    </form>
    )
}   

export default Register;
    