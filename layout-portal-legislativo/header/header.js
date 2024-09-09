import React from 'react';

import { Link } from 'react-router-dom';

import Button from 'ui/button';

import styles from './header.css';

import logo from './logo-white.png';

export default function Header() {
  return (
    <div className={ styles.wrapper }>
      <div className={ styles.container }>
        <Link to="/" className={ styles.link }>
          <img className={ styles.image } src={ logo } />
          <h1 className={ styles.title }>Transparência Legislativa</h1>
        </Link>
        <Button
          icon="article"
          label="Leis estaduais"
          size="small"
          theme="secondary"
          className={ styles.loginButton }
          target="_blank"
          href="https://www.al.rn.leg.br/leisestaduais"
        />
      </div>
    </div>
  );
}
