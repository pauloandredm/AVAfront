import React from 'react';
/* import Button from 'ui/button'; */
import styles from './header.module.css';
import logo from './logo-white.png';
/* import logo from './logo.png'; */

import { useState, useEffect, useContext } from 'react';
import jwt_decode from 'jwt-decode';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../AuthContext';


export default function Header() {

  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [gestor, setGestor] = useState(false);
  const [chefia, setChefia] = useState(false);
  const [inAvaliacao, setInAvaliacao] = useState(false);
  const [comissao, setComissao] = useState(false);
  const [admin, setAdmin] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAuthenticated(false);
    navigate('/', { replace: true }); // Redireciona para a homepage
    window.location.reload(); // Força a atualização da página
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
      const isInAvaliacao = decodedToken.in_avaliacao;
      const iscomissao = decodedToken.is_comissao;
      const is_admin = decodedToken.is_admin;
      setGestor(isGestor);
      setChefia(isChefia);
      setInAvaliacao(isInAvaliacao);
      setComissao(iscomissao);
      setAdmin(is_admin);

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
  }, [authenticated, navigate]);


  return (
    <div className={ styles.wrapper }>
      
      <div className={ styles.container }>
        <Link to="/" className={ styles.link }>
          <img className={ styles.image } src={ logo } />
          {/* <h1 className={ styles.title }>Avaliação de Desempenho</h1> */}
        </Link>
        <ul className={styles.list}>
          {authenticated ? (
              <>
                {gestor || inAvaliacao || chefia || comissao ? (
                  <li className={styles.item}><Link to="/avaliacao">Avaliação</Link></li>
                ) : null}

                {/* {inAvaliacao && <li className={styles.item}><Link to="/AcordoAceitoDesempenho">Ver Acordo de Desempenho</Link></li>} */}

                {chefia && <li className={styles.item}><Link to="/acordo-desempenho">Acordo de Desempenho</Link></li>}

                {(gestor || chefia || inAvaliacao) && !admin ? (
                    <li className={styles.item}><Link to="/perfil">Resumo avaliação</Link></li>
                ) : null}

                {admin ? (
                  <li className={styles.item}><Link to="/perfil-admin">Resumo avaliação</Link></li>
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

    </div>
  );
}
