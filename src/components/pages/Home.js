import styles from './Home.module.css'
import React, { useState, useEffect, useContext } from 'react';
import jwt_decode from 'jwt-decode';
import { AuthContext } from '../../AuthContext';
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [gestor, setGestor] = useState(false);
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

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
      <h1>Bem-vindo</h1>
      <div className={styles.explicacao}>
        {authenticated && gestor && (
          <>
            <h2>Grupos:</h2>
            <p>divida os servidores da sua lotação em grupos para que cada servidor só avalie os servidores seu grupo</p>
          </>
        )}
        {/* {authenticated && gestor && (
          <>
            <h2>Perfil:</h2>
            <p>Mostra os servidores da sua lotação e todas as avaliações já feitas</p>
          </>
        )} */}
      </div>
    </div>
  );
}


export default Home