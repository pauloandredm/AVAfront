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
      const decode = JSON.stringify(decodedToken);
      console.log(`decode: ${decode}`);
      // Check if the user is a gestor
      const isGestor = decodedToken.is_gestor;
      const lotacoes = decodedToken.lotacoes;
      const isInAvaliacao = decodedToken.in_avaliacao;
      setGestor(isGestor);
      setLotacoes(lotacoes);
      setInAvaliacao(isInAvaliacao);
    } else {
      setAuthenticated(false);
    }
  }, [authenticated]); // Observa alterações no estado authenticated

  return (
    <div className={styles.navbar}>

        <li style={{ listStyle: 'none', paddingLeft: "40px" }}> 
          <Link to="/">
            <img src={logo} alt="Logo" style={{ height: '80px', width: 'auto'}} />
          </Link>
        </li>
      
      {/* <Container> */}
        <ul className={styles.list}>

          {/* <li className={styles.item}>
            <img src={logo} alt="Logo" style={{ height: '80px', width: 'auto' }} />
          </li> */}

          <li className={styles.item2}>
            <Link to="/">Home</Link>
          </li>

          {authenticated ? (
            <>
              {inAvaliacao && <li className={styles.item}><Link to="/avaliacao">Avaliação</Link></li>}
              {gestor && <li className={styles.item}><Link to="/acordo-desempenho">Acordo Desempenho</Link></li>}
              {/* {inAvaliacao && <li className={styles.item}><Link to="/auto-avaliacao">Auto Avaliação</Link></li>}
              {inAvaliacao && <li className={styles.item}><Link to="/colegas-avaliacao">Avaliação Colegas</Link></li>} */}

              {gestor || !inAvaliacao ? (
                <li className={styles.item}><Link to="/perfil">Perfil</Link></li>
              ) : null}

              {gestor && <li className={styles.item}><Link to="/grupos">Grupos</Link></li>}
              <li className={styles.item} onClick={handleLogout}>Logout</li>
            </>
          ) : (
            <>
              <li className={styles.item}><Link to="/login">Login</Link></li>
              <li className={styles.item}><Link to="/register">Cadastrar</Link></li>
            </>
          )}
        </ul>
      {/* </Container> */}
    </div>
  );
}

export default Navbar;
