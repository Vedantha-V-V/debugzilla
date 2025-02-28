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
            const user = userCredential.user;
            await updateProfile(user, { displayName: username });
            const hashedPassword = await bcrypt.hash(password, 12);
            await setDoc(doc(db, 'users', user.uid), {
                username,
                email,
                password: hashedPassword,
                createdAt: new Date().toISOString()
            });
            return user;
        } catch (error) {
            console.error("Sign-up error:", error);
            let errorMessage = "An unknown error occurred";
            if (error.code) {
                switch (error.code) {
                    case 'auth/invalid-email':
                        errorMessage = "Invalid email format.";
                        break;
                    case 'auth/email-already-in-use':
                        errorMessage = "This email is already registered.";
                        break;
                    case 'auth/weak-password':
                        errorMessage = "Password is too weak. Use at least 6 characters.";
                        break;
                    case 'auth/network-request-failed':
                        errorMessage = "Network error. Please check your connection.";
                        break;
                    case 'auth/operation-not-allowed':
                        errorMessage = "Email/password authentication is disabled.";
                        break;
                    case 'auth/requires-recent-login':
                        errorMessage = "Please log in again before updating your profile.";
                        break;
                    case 'permission-denied':
                        errorMessage = "You don't have permission to create a user.";
                        break;
                    case 'unavailable':
                        errorMessage = "Firestore is temporarily down or unreachable.";
                        break;
                    default:
                        errorMessage = error.message;
                }
            }
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    const signIn = async (email, password) => {
        setError('');
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            console.error("Sign-in error:", error);
            let errorMessage = "An unknown error occurred";
            if (error.code) {
                switch (error.code) {
                    case 'auth/invalid-credential':
                        errorMessage = "Invalid credentials. Please try again.";
                        break;
                    case 'auth/invalid-email':
                        errorMessage = "Invalid email format.";
                        break;
                    case 'auth/user-disabled':
                        errorMessage = "This account has been disabled.";
                        break;
                    case 'auth/user-not-found':
                        errorMessage = "No account found with this email.";
                        break;
                    case 'auth/wrong-password':
                        errorMessage = "Incorrect password. Please try again.";
                        break;
                    case 'auth/network-request-failed':
                        errorMessage = "Network error. Please check your connection.";
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = "Too many failed attempts. Please try again later.";
                        break;
                    case 'auth/operation-not-allowed':
                        errorMessage = "Email/password sign-in is disabled.";
                        break;
                    default:
                        errorMessage = error.message;
                }
            }
            setError(errorMessage);
            throw new Error(errorMessage);
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
                    username: result.user.displayName ? result.user.displayName.replace(/\s/g, '') : `User${result.user.uid.substring(0, 5)}`,
                    email: result.user.email || "No email provided",
                    password: null,
                    createdAt: new Date().toISOString()
                });
            }
            return result.user;
        } catch (error) {
            console.error("Google Sign-in Error:", error);
            let errorMessage = "An unknown error occurred while signing in with Google.";
            if (error.code) {
                switch (error.code) {
                    case 'auth/popup-closed-by-user':
                        errorMessage = "Sign-in popup was closed before completing.";
                        break;
                    case 'auth/cancelled-popup-request':
                        errorMessage = "Multiple sign-in popups detected. Please try again.";
                        break;
                    case 'auth/popup-blocked':
                        errorMessage = "Popup blocked by browser. Please enable popups for this site.";
                        break;
                    case 'auth/unauthorized-domain':
                        errorMessage = "This domain is not authorized for Google sign-in.";
                        break;
                    case 'auth/network-request-failed':
                        errorMessage = "Network error. Please check your internet connection.";
                        break;
                    case 'auth/internal-error':
                        errorMessage = "An internal error occurred. Please try again later.";
                        break;
                    default:
                        errorMessage = error.message;
                }
            }
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };
    
    const logOut = async () => {
        setError('');
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout Error:", error);
            let errorMessage = "An error occurred while logging out. Please try again.";
            if (error.code) {
                switch (error.code) {
                    case 'auth/network-request-failed':
                        errorMessage = "Network error. Please check your internet connection and try again.";
                        break;
                    case 'auth/internal-error':
                        errorMessage = "An internal error occurred. Please refresh and try again.";
                        break;
                    default:
                        errorMessage = error.message;
                }
            }
            setError(errorMessage);
            throw new Error(errorMessage);
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
        error,
        setError
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
