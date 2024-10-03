import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './LatestCollection.css'
import Products from '../Products/Products'
import { useContext } from 'react'
import { StoreContext } from '../Context/StoreContext'
const LatestCollection =() => {
  const {products}=useContext(StoreContext)
  const [list,setList]=useState([])
    const ProductData=products.slice(21,30)

    
      const fetchData=async()=>{
          const response=await axios.get('https://forever-clothing-brand-1-backend.onrender.com/api/product/list')
    if(response.data.success){
      setList(response.data.products.slice(0,5))
    }
    }
  useEffect(()=>{
    fetchData()
      
    },[])

  return (
    <div className='Best-seller-section'>
            <div className='Best-seller-title' >
<p>LATEST <span>COLLECTIONS</span></p>
</div>
<div className="best-seller-display">
        {
           list.map((item,index)=>{
                return(
                <Products key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
         
            )})
        }
      
      </div>
    </div>
  )
}

export default LatestCollection
