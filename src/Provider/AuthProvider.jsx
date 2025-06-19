import React, { useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.init";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (users) => {
      setUser(users);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const userInfo = {
    user,
    createUser,
    loading,
    signInUser,
    signInGoogle,
    signOutUser,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
