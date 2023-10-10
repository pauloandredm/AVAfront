import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import InputMask from 'react-input-mask';
import axios from 'axios';
import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';
import API_BASE_URL from '../ApiConfig';
import styles from './Avaliacao.module.css';
import { Navigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import imagem from './Spinner.svg'


function Esqueci() {
  
  const [cpf, setCpf] = useState('');
  const [message, setMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [messageType, setMessageType] = useState('');  // 'error' ou 'success'
  const [loading, setLoading] = useState(false);


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

 /* ------ mascara ------ */
  const removeMask = (maskedCPF) => {
    return maskedCPF.replace(/[.-]/g, "");
  };

  /* -------- form login -------- */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true); // Iniciar o carregamento
    const formData = new FormData();
    const unmaskedCPF = removeMask(cpf); // Remover a máscara
    formData.append('cpf', unmaskedCPF); 

    try {
      const response = await axios.post(`${API_BASE_URL}/reset/`, formData);
      console.log(response.data); // aqui você pode verificar se a autenticação foi bem sucedida e armazenar os tokens, se necessário
      setMessage('Email enviado com sucesso');
      setShowErrorMessage(true);
      setMessageType('success');

    } catch (error) {
      console.error(error);
      setMessage('Usuário não existe');
      setShowErrorMessage(true);
      setMessageType('error');
    } finally {
      setLoading(false);  // Finalizar o carregamento
    }
  };

  return (
    <form className={styles.avaliacao_container} onSubmit={handleSubmit}>
      {loading ? (
            // Renderize o gif de carregamento quando a requisição estiver em andamento
            <img src={imagem} alt="Enviando..." />
            // <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        ) : (
            // Renderize o conteúdo normal quando não estiver em carregamento
        <>
          <h2 className={styles.titulo}>Esqueci minha senha</h2>

          <label className={styles.label_login} htmlFor="CPF">Digite seu CPF:</label>
            <InputMask
              mask="999.999.999-99"
              className={styles.input_login}
              type="text"
              name="cpf"
              placeholder="Insira seu CPF"
              value={cpf}
              onChange={(event) => setCpf(event.target.value)}
            />
            <div className={styles.forgot}>
              <SubmitButton text="Entrar" />
            </div>
            {showErrorMessage && <div className={messageType === 'error' ? styles.error_message : styles.success_message}>{message}</div>}
        </>
      )}
    </form>
  );
}
export default Esqueci;