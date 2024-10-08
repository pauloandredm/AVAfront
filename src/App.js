import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react';

import styles from "./App.module.css"

import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Avaliacao from './components/pages/Avaliacao'
import Register from './components/pages/Register'
import AcordoDesempenho from './components/projects/AcordoDesempenho'
import Perfil from './components/pages/Perfil'
import Perfil2 from './components/pages/Perfil2'
import Grupos from './components/pages/Grupos'
import AcordoAceitoDesempenho from './components/projects/AcordoAceitoDesempenho'
import Esqueci from './components/pages/Esqueci'
import Redefinir from './components/pages/RedefinirSenha'
import Pdf from './components/pages/pdf'

import Navbar from './components/layout/Navbar'
import Header from './layout-portal-legislativo/header/header'
import Footer from './components/layout/Footer'
import Footer2 from './layout-portal-legislativo/footer/footer'
import PrivateRoute from './components/PrivateRoute'


function App() {

  return (
      <div className={styles.page_container}>
        <Router>
            {/* <Navbar /> */}
            <Header />
              <div className={styles.content}>
                
                  <Routes>
                    <Route exact path="/" element={<Home/>} />
                    <Route exact path="/login" element={<Login/>}/>
                    <Route exact path="/pdf" element={<Pdf/>}/>
                    <Route exact path="/register" element={<Register />}/>
                    <Route exact path="/esqueci" element={<Esqueci />}/>
                    <Route exact path="/redefinir_senha/:uid/:token" element={<Redefinir />} />

                    <Route element={<PrivateRoute />}>  
                      <Route exact path="/avaliacao" element={<Avaliacao />}/>
                      <Route exact path="/acordo-desempenho" element={<AcordoDesempenho />}/>
                      <Route exact path="/perfil" element={<Perfil />}/>
                      <Route exact path="/perfil-admin" element={<Perfil2 />}/>
                      <Route exact path="/grupos" element={<Grupos />}/>
                      <Route exact path="/AcordoAceitoDesempenho" element={<AcordoAceitoDesempenho />}/>
                    </Route>

                  </Routes>
              </div>
            {/* <Footer/> */}
            <Footer2/>
        </Router>
      </div>
  );
}

export default App;
