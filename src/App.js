import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react';

import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Avaliacao from './components/pages/Avaliacao'
import Register from './components/pages/Register'
import AcordoDesempenho from './components/projects/AcordoDesempenho'
import Perfil from './components/pages/Perfil'
import Grupos from './components/pages/Grupos'
import AutoAvaliacao from './components/pages/AutoAvaliacao'
import AutoAvaliacao2 from './components/pages/AutoAvaliacao2'
import AutoAvaliacao3 from './components/pages/AutoAvaliacao3'
import AutoAvaliacao4 from './components/pages/AutoAvaliacao4'

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
              <Route exact path="/auto-avaliacao" element={<AutoAvaliacao />}/>
              <Route exact path="/auto-avaliacao2" element={<AutoAvaliacao2 />}/>
              <Route exact path="/auto-avaliacao3" element={<AutoAvaliacao3 />}/>
              <Route exact path="/auto-avaliacao4" element={<AutoAvaliacao4 />}/>
            </Route>

          </Routes>
        </Container>
        <Footer />
    </Router>
  );
}

export default App;
