import React from 'react'
import Section from './Section'
import { socials } from '../constants'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <Section crosses className="!px-0 !py-10">
        <div className="container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col">
            <p className="caption text-n-4 lg:block">{new Date().getFullYear()} AI Code Reviewer. Empowering coders to improve with every submission.</p>
            <ul className="flex gap-5 flex-wrap">
                {socials.map((item)=>(
                    <Link key={item.id} to={item.url} target='_blank'>
                        <img key={item.id} href={item.url} src={item.iconUrl} width={16}
                        height={16} alt={item.title} className="flex items-center justify-center w-10 h-10 bg-n-7 rounded-md transition-colors hover:bg-n-6"/>
                    </Link>
                ))}
            </ul>
        </div>
    </Section>
  )
}

export default Footer