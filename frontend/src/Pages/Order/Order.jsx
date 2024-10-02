import React, { useContext, useState,useEffect } from 'react'
import './Order.css'
import axios from 'axios';
import { StoreContext } from '../../components/Context/StoreContext';


const Orders = () => {

  const { backendUrl, token , currency} = useContext(StoreContext);

  const [orderData,setorderData] = useState([])

  const loadOrderData = async () => {
     
    try {
      if (!token) {
          
        return null
      }

      const response = await axios.post( 'http://localhost:4000/api/order/userorders',{},{headers:{token}})
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    loadOrderData()

  },[token])

  return (
    <div className='border-t pt-16'>

        <div className='text-2xl'>
 <h1>My<span>Orders</span></h1>
        </div>

        <div>
            {
              orderData.map((item,index) => (
                <div key={index} className='order-info'>
                    <div className='order-det'>
                        <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                        <div>
                          <div className='item-desc'>
                          <p className='order-name'>{item.name}</p>
                          <div className='order-desc'>
                            <p>${item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Size: {item.size}</p>
                          </div>
                          <p className='mt-1'>Date: <span className=' text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                        
                          <p className='mt-1'>Payment: <span className=' text-gray-400'>{item.paymentMethod}</span></p>
                        </div>
                        </div>

                    </div>
                    <div className='order-status'>
                        <div className='flex items-center gap-2'>
                            <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                            <p className='text-sm md:text-base'>{item.status}</p>
                        </div>
                        <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
                    </div>
                </div>
              ))
            }
        </div>
    </div>
  )
}

export default Orders
