import React, { useState, useEffect, useContext } from 'react';
import InputMask from 'react-input-mask';
import axios from 'axios';
import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';
import API_BASE_URL from '../ApiConfig';
import styles from './Avaliacao.module.css';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import { BiShowAlt, BiHide } from 'react-icons/bi';

function Login() {
  
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


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

  // Função para configurar o interceptor do Axios
  function setupAxiosInterceptors(token) {
    axios.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  /* -------- form login -------- */

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('cpf', cpf);
    formData.append('password', password);

    try {
      const response = await axios.post(`${API_BASE_URL}/token/`, formData);
      console.log(response.data); // aqui você pode verificar se a autenticação foi bem sucedida e armazenar os tokens, se necessário
      setAccessToken(response.data.access);  
      setRefreshToken(response.data.refresh); 
      setAuthenticated(true);

      const access_token = response.data.access;
      const refresh_token = response.data.refresh; 

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      // Configura o interceptor do Axios com o token de acesso
      setupAxiosInterceptors(access_token);
      
    } catch (error) {
      console.error(error);
      setErrorMessage('Usuário ou senha incorretos');
      setShowErrorMessage(true);
    }
  };

  return (
    <form className={styles.avaliacao_container} onSubmit={handleSubmit}>

      <label className={styles.label_login} htmlFor="CPF">CPF:</label>
        <InputMask
          mask="999.999.999-99"
          className={styles.input_login}
          type="text"
          name="cpf"
          placeholder="Insira seu CPF"
          value={cpf}
          onChange={(event) => setCpf(event.target.value)}
        />

      <label className={styles.label_login} htmlFor="password">Senha:</label>
      <div className={styles.password_input_login}>
        <input
            className={styles.input_login}
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Insira sua senha"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
        />
        {showPassword ? (
          <BiHide
            className={styles.show_password_icon2}
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : (
          <BiShowAlt
            className={styles.show_password_icon2}
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>

      <SubmitButton text="Entrar" />
      {showErrorMessage && <div className={styles.error_message}>{errorMessage}</div>}
      {authenticated && <Navigate to="/" />}
    </form>
  );
}

export default Login;
