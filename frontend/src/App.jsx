import React, { useEffect } from 'react'
import ButtonGradient from './assets/svg/ButtonGradient'
import Header from './components/Header'
import Hero from './components/Hero'
import Signup from './components/Signup'
import Signin from './components/Signin'
import CodeEditor from './components/CodeEditor'
import ProfilePage from './components/ProfilePage'
import SubmissionDetails from './components/SubmissionDetails'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import OAuthSuccess from './components/OAuthSuccess'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getProfile, setUser } from './redux/slices/authSlice'
import api from './utils/axiosConfig'

const AppContent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      dispatch(getProfile());
    }
  }, [dispatch]);

  useEffect(() => {
    const checkAuthentication = async () => {
      const searchParams = new URLSearchParams(location.search);
      const authSuccess = searchParams.get('auth') === 'success';
      
      if (authSuccess) {
        try {
          const response = await api.get('/user');
          dispatch(setUser(response.data));
          
          navigate('/', { replace: true });
        } catch (error) {
          console.error('Error fetching user after OAuth:', error);
          navigate('/signin', { replace: true });
        }
      }
    };
    
    checkAuthentication();
  }, [location.search, dispatch, navigate]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="pt-[4.75rem] lg:pt-[5.25rem] flex-grow">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/CodeEditor" element={<CodeEditor />} />
            <Route path="/Profile" element={<ProfilePage />} />
            <Route path="/submission/:id" element={<SubmissionDetails />} />
          </Route>
        </Routes>
      </div>
      <ButtonGradient />
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;