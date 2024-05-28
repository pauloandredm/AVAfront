import React, { useState, useEffect, useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import axios from 'axios';
import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';
import API_BASE_URL from '../ApiConfig';
import styles from './Avaliacao.module.css';
import { useNavigate } from "react-router-dom";
import { BiHelpCircle } from "react-icons/bi";
import { BiShowAlt, BiHide } from 'react-icons/bi';
import qs from 'qs';
import * as Yup from 'yup';
import { useFormik } from 'formik';


function Redefinir() {
  
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [messageType, setMessageType] = useState('');  // 'error' ou 'success'
  const [showPassword, setShowPassword] = useState(false);

  const { uid, token } = useParams();

  /* ------ timeout mensagem ------ */
  useEffect(() => {
    let timer;
    if (showErrorMessage) {
      timer = setTimeout(() => {
        setShowErrorMessage(false);
        setMessage('');
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showErrorMessage]);

  /* -------- form login -------- */
  const formik = useFormik({
    initialValues: {
        new_password: '',
        passwordConfirm: '',
        uid: uid,
        token: token
    },
    validationSchema: Yup.object({
        new_password: Yup.string()
            .required('Required'),
        passwordConfirm: Yup.string()
            .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
            .required('Required'),
    }),

    onSubmit: async (values, { setSubmitting, resetForm }) => {    
      try {
        const serializedData = qs.stringify(values, { encode: false });
        const response = await axios.post(`${API_BASE_URL}/redefinir-senha/${uid}/${token}/`, serializedData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        navigate('/login');
        // process the response, e.g. show success message to user
        resetForm();
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setMessage('CPF ou Matricula já existentes');
          setShowErrorMessage(true);
        } else {
          // Other types of errors, handle them accordingly
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

   // Verificar se os parâmetros estão presentes
  if (!uid || !token) {
    return <Navigate to="/" />;  // Redirecionar para a página inicial se os parâmetros estiverem ausentes
  }

  return (
    <form className={styles.avaliacao_container} onSubmit={formik.handleSubmit}>
      <div className={styles.form_control}>
        <h2 className={styles.titulo}>Redefinir senha</h2>

        <label htmlFor="new_password">Senha nova:</label>
        <div className={styles.password_input}>
          <input
            className={styles.input_container}
            id="new_password"
            name="new_password"
            type={showPassword ? 'text' : 'password'}
            onChange={formik.handleChange}
            value={formik.values.new_password}
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

        
        <label htmlFor="passwordConfirm">Confirmar senha:</label>
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


      <div className={styles.forgot}>
        <SubmitButton text="Entrar" />
      </div>
      {showErrorMessage && <div className={messageType === 'error' ? styles.error_message : styles.success_message}>{message}</div>}
      </div>
    </form>
  );
}
export default Redefinir;