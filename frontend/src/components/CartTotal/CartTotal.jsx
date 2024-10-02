import React, { useContext } from 'react'
import './CartTotal.css'
import { StoreContext } from '../Context/StoreContext'
const CartTotal = () => {
    const {getTotalAmount,navigate}=useContext(StoreContext)
  return (
    <div className='Cart-total'>
        <h2>CART TOTALS</h2>
        <div className="subtotal">
        <p >SubTotal</p>
        <p className='pirce'>${getTotalAmount()}</p>
        
        </div>
        <hr></hr>
        <div className="ship">
        <p>Shipping Fee</p>
        <p className='shipping'>$10</p>
        </div>
        <hr></hr>
        <div className="total">
        <p>Total</p>
        <p className='pirce'>${getTotalAmount()+10}</p>
        </div>
 
        <button className='btn' onClick={()=>navigate('/placeorder')}>PROCEED TO CHECKOUT</button>
        </div>


  )
}

export default CartTotal
