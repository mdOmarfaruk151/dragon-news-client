import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';


const Login = () => {
    
   //! get  function from AuthProvider
   const {signIn}= useContext(AuthContext);
   //! use for when login go to set page
   const navigate = useNavigate();

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
        navigate('/');
      })
      .catch(err => console.error(err));
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
          {/* We'll never share your email with anyone else. */}
        </Form.Text>
    </Form>
        </div>
    );
};

export default Login;