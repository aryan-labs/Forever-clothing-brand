import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import {assets } from '../../assets/assets'
import './ProductItem.css'
import { StoreContext } from '../Context/StoreContext'

const Product = () => {

  const { productId } = useParams();
  const { products, currency ,addToCart } = useContext(StoreContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size,setSize] = useState('')

  const fetchProductData = async () => {
    
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setSize(item.size)
        return null;
      }
    })

  }

  useEffect(() => {
    fetchProductData();
    console.log(productData.sizes)
  }, [productId,products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*----------- Product Data-------------- */}
      <div className='product-details'>

        {/*---------- Product Images------------- */}
        <div className='prod-img'>
          <div className='product-image'>
           <img src={productData.image} alt=''/>
          </div>
          <div className='big-img'>
              <img className='big-img' src={productData.image} alt="" />
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className='product-info'>
          <h1 className='prod-name'>{productData.name}</h1>
          <div className='prod-rat'>
            <div>
              <img src={assets.star_icon} alt="" className='prod-star' />
              <img src={assets.star_icon} alt="" className='prod-star' />
              <img src={assets.star_icon} alt="" className='prod-star' />
              <img src={assets.star_icon} alt="" className='prod-star' />
              <img src={assets.star_dull_icon} alt="" className='prod-star' />
              </div>
              <p className='pl-2'>(122)</p>
          </div>
          <p className='prod-price'>${productData.price}</p>
          <p className='prod-desc'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='prod-size'>
                           {
                productData.sizes.map((item,index)=>(
                 
                  <button onClick={()=>setSize(item)}  key={index} className='prod-size-button' alt="" >{item}</button>
                ))
              }
              </div>
          </div>
          
          <button onClick={()=>addToCart(productData._id,size)} className='prod-add'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='prod-desc'>
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>


     

    </div>
  ) : <div className=' opacity-0'></div>
}

export default Product
