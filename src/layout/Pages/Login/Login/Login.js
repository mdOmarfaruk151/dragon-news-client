import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';


const Login = () => {
    //! for error show
    const [error, setError] = useState('');
   //! get  function from AuthProvider
   const {signIn, setLoading}= useContext(AuthContext);
   //! use for when login go to set page
   const navigate = useNavigate();

   //! for set user location after user login
   const location = useLocation();
   const from = location.state?.from?.pathname || '/';
  

   //! for login submit form
   const handleSubmit = event => {
      event.preventDefault();
      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;

      signIn(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        form.reset();
        setError('');
        if(user.emailVerified){     //! if user verified then they access to news
          navigate(from, {replace: true}); //! if user get access to news
        }
        else{
          toast.error('Your Email is not Verified. Please Verify Your Email Address.');
        }

      })
      .catch(err => {
        console.error(err)
      setError(err.message);
      })
      .finally(()=>{
        setLoading(false);

      })
   }

    return (
        <div>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name='email' type="email" placeholder="Enter email" required/>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name='password' type="password" placeholder="Password" required/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
      <Form.Text className="text-danger">
          {error}
        </Form.Text>
    </Form>
        </div>
    );
};

export default Login;