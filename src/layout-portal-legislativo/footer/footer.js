import React from 'react';

import styles from './footer.module.css';

import logo from './logo-white.png';
/* import logo from './logo.png'; */

const PORTAL_URL = process.env.PORTAL_URL;

export default function Footer() {
  return (
    <footer className={ styles.wrapper }>
      <div className={ styles.container }>
        <div>
          <a className={ styles.logoWrapper } href={ PORTAL_URL }>
            <img className={ styles.logoImage } src={ logo } />
          </a>
        </div>
        <div className={ styles.devInfo }>
          <span>Desenvolvimento</span>
          <p>Diretoria de Gestão Tecnológica</p>
          <p>Coordenadoria de Gestão de Projetos e Desenvolvimento de Sistemas</p>
        </div>
      </div>
    </footer>
  );
}
