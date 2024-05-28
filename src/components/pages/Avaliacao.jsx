import styles from './Avaliacao.module.css'

import axios from 'axios';
import React, { useEffect } from 'react';

import ProjectForm from '../projects/ProjectForm'

function Avaliacao() {

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          axios.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${accessToken}`;
            return config;
          });
        }
      }, []);

      const currentYear = new Date().getFullYear();
      const lastYear = currentYear - 1;
      

    return (
        <div className={styles.avaliacao_container}>
            <h1>Avaliação de Desempenho</h1>
            <p className={styles.p_data}>Avaliação referente aos últimos 12 meses ({lastYear} - {currentYear})</p>
            <ProjectForm/>
        </div>
    )
}

export default Avaliacao