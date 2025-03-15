import React, { useState, useEffect } from 'react'
import { disablePageScroll, enablePageScroll } from 'scroll-lock'
import { useLocation, Link } from 'react-router-dom'
import { debugzilla,profile } from "../assets"
import { navigation } from '../constants'
import Button from './Button'
import MenuSvg from '../assets/svg/MenuSvg'
import { HamburgerMenu } from "./design/Header"
import { useAuth } from '../context/authContext'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

const Header = () => {
  const { currentUser, logOut } = useAuth()
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false)
  const [username, setUsername] = useState("")
  
  // Fetch username from Firestore when currentUser changes
  useEffect(() => {
    const fetchUsername = async () => {
      if (!currentUser) {
        setUsername("");
        return;
      }

      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists() && userSnap.data().username) {
          setUsername(userSnap.data().username);
        } else {
          // Fallback if username not found in Firestore
          setUsername(currentUser.displayName || currentUser.email.split('@')[0]);
        }
      } catch (error) {
        console.error("Error fetching username:", error);
        setUsername(currentUser.displayName || currentUser.email.split('@')[0]);
      }
    };
    
    fetchUsername();
  }, [currentUser]);

  const toggleNavigation = () => {
    if(openNavigation){
      setOpenNavigation(false);
      enablePageScroll()
    } else {
      setOpenNavigation(true);
      disablePageScroll()
    }
  }

  const handleClick = () => {
    if(!openNavigation) return
    enablePageScroll()
    setOpenNavigation(false);
  }

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <div 
    className={`fixed top-0 left-0 w-full z-50
    border-b border-n-6 lg:bg-n-8/90
    lg:backdrop-blur-sm ${openNavigation ? 'bg-n-8':'bg-n-8/90 backdrop-blur-sm'}`}>
        <div className="flex items-center justify-between px-5 lg:px-7.5
        xl:px-10 max-lg:py-4">
            <a className="block w-[12rem]" href="/">
                <img src={debugzilla} width={190} height={40} className="p-0" alt="DebugZilla"/>
            </a>

            <nav className={`${ openNavigation ? 'flex' : 'hidden'} fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex
            lg:bg-transparent`}>
                <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
                  {navigation.map((item) => {
                    // Skip auth-only links if user isn't logged in
                    if (item.authRequired && !currentUser) return null;
                    
                    return (
                      <a key={item.id} 
                      href={item.url}
                      onClick={handleClick}
                      className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${item.onlyMobile ? "lg:hidden" : ""} 
                      px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${item.url === pathname.hash ? "z-2 lg:text-n-1" : "lg:text-n-1/50"}
                      lg:leading-5 lg:hover:text-n-1 xl:px-12`}>
                        {item.title}
                      </a>
                    )
                  })}
                </div>
                <HamburgerMenu/>
            </nav>

            <div className="flex items-center ml-auto">
              {currentUser ? (
                <div className="flex items-center">
                  <div className="mr-4 text-n-1">
                    <Link to="/Profile"><img src={profile} width={30} height={30} className="text-n-1"/></Link>
                  </div>
                  <Button className="ml-2" onClick={handleLogout}>Sign Out</Button>
                </div>
              ) : (
                <Button className="hidden lg:flex">
                  <Link to="/Signin">Sign In</Link>
                </Button>
              )}
              
              <Button className="ml-2 lg:hidden" px="px-3"
              onClick={toggleNavigation}>
                <MenuSvg openNavigation={openNavigation}/>
              </Button>
            </div>
        </div>
    </div>
  )
}

export default Header