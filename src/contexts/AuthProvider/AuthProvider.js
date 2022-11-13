import React, { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../../Firebase/firebase.config";

//! send this function to multiple pages
export const AuthContext = createContext();
//! get firebase app data
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  //! store user data
  const [user, setUser] = useState(null);
  //! set loading when check user have or not
  const [loading, setLoading] = useState(true);

  //! google login
  const providerLogin = (provider) => {
    setLoading(true); //! loading...
    return signInWithPopup(auth, provider);
  };
  //! create a new user with email and password
  const createUser = (email, password)=>{
    setLoading(true); //! loading...
    return createUserWithEmailAndPassword(auth, email, password);
  }
  //! create a Sign in with email and password
  const signIn = (email, password)=>{
    setLoading(true); //! loading...
    return signInWithEmailAndPassword(auth, email, password);
  };
  //! for user update profile
  const updateUserProfile = (profile) =>{
    return updateProfile(auth.currentUser, profile);
  }
   //! for verify user Email
   const verifyEmail = () =>{
    return sendEmailVerification(auth.currentUser)
   }
  //! for log Out
  const logOut =()=>{
    setLoading(true); //! loading...
    return signOut(auth);
  }
  //! get data from outside and watch user is active or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //   console.log("inside auth state change", currentUser);
    //! if current User email verified set user
      if(currentUser === null || currentUser.emailVerified){
        setUser(currentUser);
      }
      setLoading(false); //! loading...
    });

    return () => {
      unsubscribe();
    };
  }, [])

  //! send function
  const authInfo = { 
    user, 
    loading, 
    providerLogin, 
    logOut, 
    updateUserProfile,
    verifyEmail,
    setLoading,
    createUser, 
    signIn  
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
