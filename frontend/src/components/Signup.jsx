import React, { useState, useEffect } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import Section from './Section'
import Button from './Button'
import { useAuth } from '../context/authContext'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState('')
  
  const { signUp, signInWithGoogle, error, user, setError } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    setFormError('');
    setError('');
  
    console.log("Auth User:", user);
  
    if (user) {
      navigate('/');
      window.location.href = '/'; // Force reload to reflect login state
    }
  }, [location.pathname, setError, user, navigate]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setLoading(true);
  
    try {
      await signUp(username, email, password);
      navigate('/');  // This should work if user state updates correctly
      window.location.href = '/'; // Force reload if navigate fails
    } catch (err) {
      setFormError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };
  

  const handleGoogleSignIn = async () => {
    setFormError('')
    setLoading(true)
    
    try {
      await signInWithGoogle()
      navigate('/')
    } catch (err) {
      setFormError(err.message || 'Failed to sign up with Google')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {user && <Navigate to="/" replace={ true } />}
      <Section>
        <div className="container">
          <div className="flex flex-col items-center justify-center">
            <div className="block relative p-7 bg-no-repeat bg-[length:100%_100%]
                      md:max-w-[24rem]" style={{ backgroundImage: "url(../src/assets/benefits/card-1.svg)" }}>
              <h2 className="h2 pb-5">Sign Up</h2>
              
              {(formError || error) && (
                <div className="bg-color-3/20 text-color-3 p-3 rounded-md mb-4">
                  {formError || error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <label htmlFor="username" className="block m-2">Username</label>
                <input
                  className="w-[100%] h-[100%] p-1 mb-3 border-n-1/50 rounded-md size-1 bg-n-5"
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  required
                />

                <label htmlFor="email" className="block m-2">Email</label>
                <input
                  className="w-[100%] h-[100%] p-1 mb-1 border-n-1/50 rounded-md size-1 bg-n-5"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />

                <label htmlFor="password" className="block m-2">Password</label>
                <input
                  className="w-[100%] h-[100%] p-1 mb-1 border-n-1/50 rounded-md size-1 bg-n-5"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                />
                
                <Button type="submit" className="mt-5 w-full" disabled={loading}>
                  {loading ? 'Creating account...' : 'Sign Up'}
                </Button>
              </form>
              
              <div className="relative flex items-center mt-6 mb-6">
                <div className="flex-grow border-t border-n-6"></div>
                <span className="flex-shrink mx-4 text-n-3">or</span>
                <div className="flex-grow border-t border-n-6"></div>
              </div>
              
              <Button 
                className="w-full min-w-[200px] px-4 py-2" 
                onClick={handleGoogleSignIn} 
                disabled={loading}
              >
                <div className="flex items-center justify-center w-full">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 48 48" 
                    width="16px" 
                    height="16px"
                    className="mr-2 flex-shrink-0"
                  >
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                  </svg>
                  {loading ? 'Signing in with Google...' : 'Sign in with Google'}
                </div>
              </Button>
              <div className="mt-5 text-center">
                Already have an account? <Link to="/signin" className="text-color-1">Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

export default Signup