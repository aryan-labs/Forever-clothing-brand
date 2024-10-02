import React from 'react'
import './Hero.css'
import { assets } from '../../assets/assets'

const Hero = () => {
  return (
    <div className='Hero'>
        <div className="Hero-contents">
            <p>OUR BESTSELLER</p>
            <br></br>
            <h1>Latest Arrivals</h1>
<br></br>
<p>Shop Now</p>
        </div>
        <div className="Hero-img">
            <img src={assets.hero_img} alt=""/>
        </div>
      
    </div>
  )
}

export default Hero
