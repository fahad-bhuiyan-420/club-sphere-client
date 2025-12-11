import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase.init';
import { AuthContext } from './AuthContext';


const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const provider = new GoogleAuthProvider();

    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        return signOut(auth)
    }

    const googleSignIn = () => {
        return signInWithPopup(auth, provider)
    }

    const resetPass = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (CurrentUser) => {
            setUser(CurrentUser)
            setLoading(false);
        })
        return () =>  unsubscribe() ;
    }, [])


    const authInfo = {
        loading,
        setLoading,
        user,
        setUser,
        registerUser,
        signInUser,
        logOut,
        googleSignIn,
        resetPass
    }

    return (<AuthContext value={authInfo}>
            {children}
    </AuthContext>)
};

export default AuthProvider;