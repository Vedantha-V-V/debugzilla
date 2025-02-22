import React from 'react'
import { debugzilla } from "../assets"

const Header = () => {
  return (
    <div className="fixed top-0 z-50 bg-n-8/90
    backdrop-blur-sm border-b border-n-6 lg:bg-n-8/90
    lg:backdrop-blur-sm">
        <div className="flex items-center px-5 lg:px-7.5
        xl:px-10 max-lg:py-4">
            <a className="none block w-[7rem] xl:mr-8" href="#hero">
                <img src={debugzilla} width={100} height={40} alt="DebugZilla"/>
            </a>
            <nav className="hidden fixed top-[5rem] left-0 right-0bottom-0 bg-n-8 lg:static lg:flex
            lg-mx-auto lg:bg-transparent">
                <div></div>
            </nav>
        </div>
    </div>
  )
}

export default Header