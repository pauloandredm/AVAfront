import styles from './Home.module.css'
import React, { useState, useEffect, useContext } from 'react';
import jwt_decode from 'jwt-decode';
import { AuthContext } from '../../AuthContext';
import avaliacao from './avaliacao-desempenho.png'

function Home() {
  const [gestor, setGestor] = useState(false);
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

  return (
    <div className={styles.h1}>
      <div className={styles.overlay}>
        {/* <h1>Avaliação de Desempenho</h1> */}
      </div>
      <img src={avaliacao} alt="Avaliacao" className={styles.background_image} />
    </div>
  );
}


export default Home