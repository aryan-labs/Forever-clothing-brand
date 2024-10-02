import React from 'react'
import './NewsLetterBox.css'
import { assets } from '../../assets/assets'

const NewsLetterBox = () => {
  return (
    <div className='Policie'>
        <div className='Policies'> 
            
        
      <img src={assets.exchange_icon} alt=""/>
      <p>Easy Exchange Policy. </p>
      <p> We Offer hassle free exchange policy.</p>
      </div>
      <div className='Policies'>
      <img src={assets.quality_icon} alt=""/>
      <p>7 Days Return </p>
      <p>We Provide 7 days free return Policy.</p>
      </div>
      <div className='Policies'>
      <img src={assets.support_img} alt=""/>
      <p>Best Customer Support</p>
      <p>We Provide 24/7 Customer support.</p>
    </div>
    </div>
  )
}

export default NewsLetterBox
