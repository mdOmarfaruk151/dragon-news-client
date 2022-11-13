import React, { useContext, useRef, useState } from "react";
import { Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../../../../contexts/AuthProvider/AuthProvider";

const Profile = () => {
  //! get user data from AuthProvider.js
  const { user } = useContext(AuthContext);
  //! set user name
  const [name, setName] = useState(user?.displayName);
  //!
  const photoURLRef = useRef(user.photoURL);

  //! for submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name);
    console.log(photoURLRef.current.value);
  };
  //! for change name 1st way to do
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <hr />
      <h4 className="text-center">Your Profile</h4>
      <hr />
      <div className="text-center">
        {user?.photoURL ? (
          <Image style={{ height: "150px" }} src={user?.photoURL}></Image>
        ) : (
          <FaUser></FaUser>
        )}
        <p>
          <small>Profile Picture</small>
        </p>
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            onChange={handleNameChange}
            defaultValue={name}
            type="text"
            placeholder="Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            readOnly
            defaultValue={user?.email}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Photo URL</Form.Label>
          <Form.Control
            ref={photoURLRef}
            defaultValue={user?.photoURL}
            type="text"
            placeholder="Photo URL"
          />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
};

export default Profile;
