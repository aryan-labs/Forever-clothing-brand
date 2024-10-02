import React from 'react'
import './Products.css'
import { Link } from 'react-router-dom'
const Products = ({id,name,image,price}) => {

  return (
<Link onClick={()=>scrollTo(0,0)} to={`/product/${id}`}>

    <div key={id}>
      
       
        <img src={image[0]} alt=""/>
        <p className='name'>{name}</p>
<p className='price'>${price}</p>
            </div>
            </Link>
  )
}


export default Products
