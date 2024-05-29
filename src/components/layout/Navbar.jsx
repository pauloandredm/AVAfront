import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../AuthContext';

import Container from "./Container";
import styles from "./Navbar.module.css";

import React, { useState, useEffect, useContext } from 'react';
import jwt_decode from 'jwt-decode';
import logo from './Assembleia-logo-negativo.png'

function Navbar() {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [gestor, setGestor] = useState(false);
  const [chefia, setChefia] = useState(false);
  const [inAvaliacao, setInAvaliacao] = useState(false);
  const [lotacoes, setLotacoes] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAuthenticated(false);
    navigate('/');
  };

  useEffect(() => {
    const access_token2 = localStorage.getItem("access_token");
    if (access_token2) {
      setAuthenticated(true);
      // Decode the token
      const decodedToken = jwt_decode(access_token2);
      const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
      const currentTime = new Date().getTime();
      const decode = JSON.stringify(decodedToken);
      console.log(`decode: ${decode}`);
      // Check if the user is a gestor
      const isGestor = decodedToken.is_gestor;
      const isChefia = decodedToken.is_chefia;
      const lotacoes = decodedToken.lotacoes;
      const isInAvaliacao = decodedToken.in_avaliacao;
      setGestor(isGestor);
      setChefia(isChefia);
      setLotacoes(lotacoes);
      setInAvaliacao(isInAvaliacao);

      if (currentTime > expirationTime) {
        // Token has expired, log out and navigate to the login page
        handleLogout();
        navigate('/login');
      } else {
        setAuthenticated(true);
      }
    } else {
      setAuthenticated(false);
    }
  }, [authenticated, navigate]); // Observa alterações no estado authenticated


  

  


  return (

    <div className={styles.navbar}>

        <li className={styles.logo_li}> 
          <Link to="/">
            <img src={logo} alt="Logo" style={{ height: '60px', width: 'auto'}} />
          </Link>
        </li>
      
        <ul className={styles.list}>

          <li className={styles.item2}>
            <Link to="/">Home</Link>
          </li>

          {authenticated ? (
            <>
              {gestor || inAvaliacao || chefia ? (
                <li className={styles.item}><Link to="/avaliacao">Avaliação</Link></li>
              ) : null}

              {inAvaliacao && <li className={styles.item}><Link to="/AcordoAceitoDesempenho">Ver Acordo de Desempenho</Link></li>}

              {chefia && <li className={styles.item}><Link to="/acordo-desempenho">Acordo de Desempenho</Link></li>}

              {gestor || !inAvaliacao ? (
                <li className={styles.item}><Link to="/perfil">Resumo avaliação</Link></li>
              ) : null}

              {gestor || chefia ? ( 
                <li className={styles.item}><Link to="/grupos">Grupos</Link></li>
              ) : null}

              {/* <li className={styles.item} onClick={handleLogout}>Logout</li> */}
            </>
          ) : (
            <>
              {/* <li className={styles.item}><Link to="/login">Login</Link></li>
              <li className={styles.item}><Link to="/register">Cadastrar</Link></li> */}
            </>
          )}

          <li className={styles.item}>
            <Link to="/pdf">Ato da mesa 2388/2019</Link>
          </li>

          {authenticated ? (
            <>
              <li className={styles.item} onClick={handleLogout}>Logout</li>
            </>
          ) : (
            <>
              <li className={styles.item}><Link to="/login">Login</Link></li>
              <li className={styles.item}><Link to="/register">Cadastrar</Link></li>
            </>
          )}

        </ul>

    </div>
  );
}

export default Navbar;
