import React from 'react'
import Home from './Home'
import About from './About'
import Gallery from '../Components/TabMenu/Gallery'

const Landing = () => {
  return (
    <>
    <div>
      <Home/>
      <About/>
      <Gallery/>
    </div>
    </>
  )
}

export default Landing;
