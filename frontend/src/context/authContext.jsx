import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db, googleProvider } from '../firebase/config';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithPopup,
    updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const signUp = async (username, email, password) => {
        setError('');
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: username });

            await setDoc(doc(db, 'users', userCredential.user.uid), {
                username,
                email,
                password: await bcrypt.hash(password, 12),
                createdAt: new Date().toISOString()
            });

            return userCredential.user;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const signIn = async (email, password) => {
        setError('');
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const signInWithGoogle = async () => {
        setError('');
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const userRef = doc(db, "users", result.user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    username: result.user.displayName.replace(/\s/g, ''),
                    email: result.user.email,
                    password: null,
                    createdAt: new Date().toISOString()
                });
            }
            return result.user;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const logOut = async () => {
        setError('');
        try {
            await signOut(auth);
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signUp,
        signIn,
        signInWithGoogle,
        logOut,
        loading,
        error
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
