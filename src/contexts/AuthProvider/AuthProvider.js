import React, { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../../Firebase/firebase.config";

//! send this function to multiple pages
export const AuthContext = createContext();
//! get firebase app data
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  //! store user data
  const [user, setUser] = useState(null);

  //! google login
  const providerLogin = (provider) => {
    return signInWithPopup(auth, provider);
  };
  //! create a new user with email and password
  const createUser = (email, password)=>{
    return createUserWithEmailAndPassword(auth, email, password);
  }
  //! create a Sign in with email and password
  const signIn = (email, password)=>{
    return signInWithEmailAndPassword(auth, email, password);
  };
  //! for log Out
  const logOut =()=>{
    return signOut(auth);
  }
  //! get data from outside and watch user is active or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //   console.log("inside auth state change", currentUser);
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, [])

  //! send function
  const authInfo = { user, providerLogin, logOut, createUser, signIn };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
