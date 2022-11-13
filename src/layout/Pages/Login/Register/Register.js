import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';

const Register = () => {
       //! for show error msg
       const [error, setError] = useState('');
       //! terms accepted checkbox
       const [accepted, setAccepted] = useState(false);
      //! get function from AuthProvider.js
      const {createUser, updateUserProfile, verifyEmail}= useContext(AuthContext);

      //! user create form
   const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(name, photoURL, email, password);
    //! for create new user
    createUser(email, password)
    .then(result => {
        const user = result.user;
        console.log(user);
        setError('')
        form.reset();
        handleUpdateUserProfile(name, photoURL); //! for update name and photo
        handleEmailVerification(); //! for email user verify
        toast.success('Please verify your email address.')
   })
   .catch(e => {
    console.error(e)
    setError(e.message)
  });

   }
   //! for user update profile
   const handleUpdateUserProfile = (name, photoURL)=>{
    const profile ={
      displayName: name,
      photoURL: photoURL
    }
    updateUserProfile(profile)
    .then(()=>{})
    .catch(e => console.error(e))
  }
   //! for user email verify 
   const handleEmailVerification = (email)=>{
    verifyEmail(email)
   .then(()=>{})
   .catch(e => console.error(e))
   }

  //! for checkbox
   const handleAccepted = event =>{
    setAccepted(event.target.checked)
   }
    return (
        <div>
     <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Your Name</Form.Label>
        <Form.Control name='name' type="text" placeholder="Your Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Photo URL</Form.Label>
        <Form.Control name='photoURL' type="text" placeholder="Photo URL" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name='email' type="email" placeholder="Enter email" required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name='password' type="password" placeholder="Password" required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check 
        type="checkbox" 
        onClick={handleAccepted}
        label={<>Accept <Link to='/terms'>Terms and Conditions</Link></>} />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!accepted}> 
        Register
      </Button>
      <Form.Text className="text-danger">
          {error}
        </Form.Text>
    </Form>    
        </div>
    );
};

export default Register;