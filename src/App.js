import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react';

import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Avaliacao from './components/pages/Avaliacao'
import Register from './components/pages/Register'
import AcordoDesempenho from './components/projects/AcordoDesempenho'
import Perfil from './components/pages/Perfil'
import Grupos from './components/pages/Grupos'

import Container from './components/layout/Container'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import PrivateRoute from './components/PrivateRoute'

function App() {

  return (
    <Router>
        <Navbar />
        <Container customClass='min-height'>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/register" element={<Register />}/>

            <Route element={<PrivateRoute />}>  
              <Route exact path="/avaliacao" element={<Avaliacao />}/>
              <Route exact path="/acordo-desempenho" element={<AcordoDesempenho />}/>
              <Route exact path="/perfil" element={<Perfil />}/>
              <Route exact path="/grupos" element={<Grupos />}/>
            </Route>

          </Routes>
        </Container>
        <Footer />
    </Router>
  );
}

export default App;
