import styles from './Home.module.css'
import React, { useState, useEffect, useContext } from 'react';
import jwt_decode from 'jwt-decode';
import { AuthContext } from '../../AuthContext';
import avaliacao from './cogep.png'
import API_BASE_URL from '../ApiConfig';
import axios from '../../axiosConfig';
import { Link } from 'react-router-dom';

function Home() {
  const [gestor, setGestor] = useState(false);
  const [data, setData] = useState([]);
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const access_token2 = localStorage.getItem("access_token");
    if (access_token2) {
      setAuthenticated(true);
      // Decode the token
      const decodedToken = jwt_decode(access_token2);
      const isGestor = decodedToken.is_gestor;
      setGestor(isGestor);
    } else {
      setAuthenticated(false);
      setGestor(false); // Definir gestor como false quando o usuário fizer logout
    }
  }, [authenticated]); // Observa alterações no estado authenticated

  useEffect(() => {
    if (authenticated) {
      // Fetch data from the new combined viewset
      axios.get(`${API_BASE_URL}/avaliacoes_faltando/`) // replace with your actual endpoint
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [authenticated]);

  const pendingItems = [];
  const completedItems = [];

  data.forEach(item => {
    if (!item.foi_avaliado) {
      pendingItems.push({
        type: 'avaliacao',
        text: `Avaliação de desempenho - ${item.Servidor_Nome}`,
        servidorNome: item.Servidor_Nome
      });
    } else {
      completedItems.push(`Avaliação de desempenho - ${item.Servidor_Nome}`);
    }

    if ('acordo_feito' in item) {
      if (item.acordo_feito === false) {
        pendingItems.push({
          type: 'acordo',
          text: `Acordo de desempenho - ${item.Servidor_Nome}`,
          servidorNome: item.Servidor_Nome,
          servidorMatricula: `${item.S_Matricula}-${item.S_Digito}`
        });
      } else {
        completedItems.push(`Acordo de desempenho - ${item.Servidor_Nome}`);
      }
    }
  });

  return (
    <div> 
      {authenticated ? (
        <>
          <div className={styles.home}>
            <h1 className={styles.title}>Pendente</h1>
            <ul className={styles.list}>
              {pendingItems.map((item, index) => (
                <li key={index} className={styles.pendingItem}>
                  {item.type === 'avaliacao' ? (
                    <Link to={`/avaliacao?servidor=${encodeURIComponent(item.servidorNome)}`}>{item.text}</Link>
                  ) : (
                    <Link to={`/acordo-desempenho?servidorMatricula=${encodeURIComponent(item.servidorMatricula)}`}>{item.text}</Link>
                  )}
                </li>
              ))}
            </ul>
            <h1 className={styles.title}>Concluído</h1>
            <ul className={styles.list}>
              {completedItems.map((item, index) => (
                <li key={index} className={styles.completedItem}>{item}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className={styles.overlay}>
            {/* <h1>Avaliação de Desempenho</h1> */}
          </div>
          <img src={avaliacao} alt="Avaliacao" className={styles.background_image} />
        </>
      )}
    </div>
  );
}

export default Home;