import React from 'react'
import Section from './Section'
import { editor } from '../constants'
import { robot, heroBackground } from '../assets'

const CodeEditor = () => {
  return (
    <Section>
      <div className="relative max-w-[23rem] mx-auto
      md:max-w-5xl xl:mb-24">
        <div className="relative z-1 p-0.5 rounded-2xl
        bg-conic-gradient">
          <div className="relative bg-n-8 rounded-[1rem]">
            <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]"/>

            <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden
            md:aspect-[688/490] lg:aspect-[1024/490]">
              <img src={robot} className="w-full scale-[1.7] translate-y-[8%] md:scale-[1]
              md:translate-y-[10%] lg:-translate-y-[23%]" width={1024} height={490} alt="AI"/>
            </div>
            <div className="p-0 container flex sm:justify-between justify-center items-center max-sm:flex-col">
              <input className="relative w-[100%] h-[50px] p-1 m-1 border-n-1/50 rounded-lg size-1 bg-n-5"
                  type="email" id="email" placeholder="Enter your code here"/>
                {editor.map((item) => (
                  <a key={item.id} href={item.url} className="m-1">
                    <img src={item.iconUrl} width={24} height={24} alt={item.title} className="flex items-center justify-center w-10 h-10 bg-n-7 rounded-md transition-colors hover:bg-n-6"/>
                  </a>
                ))}
            </div>
          </div>
        </div>
        <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2
        md:-top-[46%] md:w-[138%] lg:-top-[104%]">
          <img src={heroBackground} className="w-full" width={1440} height={1800} alt="hero"/>
        </div>
      </div>
    </Section>
  )
}

export default CodeEditor