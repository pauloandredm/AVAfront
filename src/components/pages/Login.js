import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';
import API_BASE_URL from '../ApiConfig';
import styles from './Avaliacao.module.css';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

function Login() {
  
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const { authenticated, setAuthenticated } = useContext(AuthContext);
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
      <Input
        type="text"
        text="CPF"
        name="cpf"
        placeholder="Insira seu CPF"
        value={cpf}
        handleOnChange={(event) => setCpf(event.target.value)}
      />
      <Input
        type="password"
        text="Senha"
        name="password"
        placeholder="Insira sua senha"
        value={password}
        handleOnChange={(event) => setPassword(event.target.value)}
      />
      <SubmitButton text="Entrar" />
      {showErrorMessage && <div className={styles.error_message}>{errorMessage}</div>}
      {authenticated && <Navigate to="/" />}
    </form>
  );
}

export default Login;
