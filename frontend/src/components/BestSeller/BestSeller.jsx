import React, { useContext, useEffect } from 'react'

import './BestSeller.css'
import Products from '../Products/Products'
import { StoreContext } from '../Context/StoreContext'


const BestSeller = () => {
  const {products}=useContext(StoreContext)
    const ProductData=products.slice(10,19)
useEffect(()=>{

},[products])

  return (
    <div className='Best-seller-section'>
        <div className="Best-seller-title">
            <p>BEST <span>SELLER</span></p>
        </div>
      <div className="best-seller-display">
        {products.slice(0,5).map((item,index)=>{
          return(
          <Products key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
          )
        })
        }
      </div>
    </div>
  )
}

export default BestSeller
