import React from 'react'
import ButtonGradient from './assets/svg/ButtonGradient'
import Header from './components/Header'
import Hero from './components/Hero'
import Signup from './components/Signup'
import Signin from './components/Signin'
import CodeEditor from './components/CodeEditor'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App=() => {
  return (<>
      <Router>
        <Header/>
        <div className="pt-[4.75rem] lg:pt-[5.25rem]">
          <Routes>
            <Route path="/" element={<Hero/>}/>
            <Route path="/Signup" element={<Signup/>}/>
            <Route path="/Signin" element={<Signin/>}/>
            <Route path="/CodeEditor" element={<CodeEditor/>}/>
          </Routes>
        </div>
        <ButtonGradient />
        <Footer/>
      </Router>
  </>
  )
}

export default App
