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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getProfile } from './redux/slices/authSlice'

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (localStorage.getItem('user')) {
      dispatch(getProfile());
    }
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <div className="pt-[4.75rem] lg:pt-[5.25rem]">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Signin" element={<Signin />} />
          
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
    </Router>
  )
}

export default App