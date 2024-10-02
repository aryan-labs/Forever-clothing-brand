import React, { useContext, useEffect, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../components/Context/StoreContext'
import { assets} from '../../assets/assets'
import CartTotal from '../../components/CartTotal/CartTotal'

const Cart = () => {
    const {cartItem,addToCart,size,updateQuantity,products}=useContext(StoreContext)
    const [cartData,setCartData]=useState([])
useEffect(()=>{
    const tempData=[]
    for(const items in cartItem){
        for(const item in cartItem[items]){
            if(cartItem[items][item]>0){
                tempData.push({
                    _id:items,
                    size:item,
                    quantity:cartItem[items][item]
                })
            }

        }
    }
setCartData(tempData)
},[cartItem])

  return (
    <div>
{
 
            
   cartData.map((item,index)=>{
    const ProductData=products.find((prouct)=>prouct._id===item._id)
    return(
        <div className="product" key={index}>
            <div className='cart-img'>
        <img className='cart-image' src={ProductData.image[0]} alt=""/>
        <div className="cart-det"> 
        <p>{ProductData.name}</p>  
       
     <div className="prod-size">
            <p>${ProductData.price}</p>
            <p>{item.size}</p>
            </div>
            </div>    
            <input type='Number' min={1} className='quan' defaultValue={item.quantity} onChange={(e)=>e.target.value===""|| e.target.value==='0'?null:updateQuantity(item._id,item.size,Number(e.target.value))}/> 
            <img onClick={()=>{updateQuantity(item._id,item.size,0)}} className='bin' src={assets.bin_icon} alt="" />
            </div> 
            
           
        </div>
    )
   })
} <CartTotal></CartTotal>

      
    </div>
  )
}

export default Cart
