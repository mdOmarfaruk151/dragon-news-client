import React, { useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

/* 
1. only allow authenticated user to visit the route
2. 
3. Redirect user to the route they wanted to go before login
*/

const PrivateRoute = ({children}) => {

    //! get user from AuthProvider.js
    const {user, loading} = useContext(AuthContext);
    //! get user browser location for set that active page user have before login
    const location = useLocation();
    //! loading ... condition
    if(loading){
        return  <Spinner animation="border" variant="success" />
    }
    //! condition => if user email not get go user to login page and if user email have go to active page
    if(!user){
        return <Navigate to='/login' state={{from: location}} replace></Navigate>
    }
    return children;
};

export default PrivateRoute;