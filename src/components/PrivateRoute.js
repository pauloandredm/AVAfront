import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';


const PrivateRoutes = () => {
    const { authenticated } = useContext(AuthContext);
    return(
        authenticated ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes
  




/* import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

export default function PrivateRoute({ element: Component, ...rest }) {
    const { isAuthenticated } = useContext(AuthContext);
  
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    );
  } */
  

