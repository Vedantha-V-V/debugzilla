import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/authSlice';
import api from '../utils/axiosConfig';
import Section from './Section';

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/user');
        const userData = response.data;
        localStorage.setItem('user', JSON.stringify(userData));
        dispatch(setUser(userData));
        
        navigate('/');
      } catch (error) {
        console.error('OAuth error:', error);
        navigate('/signin');
      }
    };
    
    fetchUserData();
  }, [dispatch, navigate]);
  
  return (
    <Section>
      <div className="container">
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <h2 className="h2">Authentication successful</h2>
          <p className="body-1 mt-4">Redirecting...</p>
        </div>
      </div>
    </Section>
  );
};

export default OAuthSuccess;