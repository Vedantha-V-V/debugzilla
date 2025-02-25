import React from 'react'
import Section from './Section'
import Button from './Button'

const Signup = () => {
  return (
    <Section>
      <div className="container">
      <main>
        <div className="flex flex-col items-center justify-center">
          <h2 className="h2 pb-5">Sign Up</h2>
          <form>
            <label htmlFor="username" className="block m-2">Username</label>
            <input
              className="w-[100%] h-[100%] p-1 mb-3 border-n-1/50 rounded-sm size-1"
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              required
            />

            <label htmlFor="email" className="block m-2">Email</label>
            <input
              className="w-[100%] h-[100%] p-1 mb-1 border-n-1/50 rounded-sm size-1"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />

            <label htmlFor="password" className="block m-2">Password</label>
            <input
              className="w-[100%] h-[100%] p-1 mb-1 border-n-1/50 rounded-sm size-1"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
            <Button type="submit" className="mt-5">Sign Up</Button>
          </form> 
        </div>
      </main>
    </div>
    </Section>
  )
}

export default Signup