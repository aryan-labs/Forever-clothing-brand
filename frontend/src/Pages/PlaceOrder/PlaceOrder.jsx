import { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import './PlaceOrder.css'
import './PlaceOrder.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import CartTotal from '../../components/CartTotal/CartTotal';
import { StoreContext } from '../../components/Context/StoreContext';

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const { search,
setseach,
searchbar,
setsearchbar,addToCart,
cartItem,updateQuantity
,getTotalAmount,navigate,setShowLogin,showLogin,token,setToken,products,setCartItem } = useContext(StoreContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))
    }
 const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name:'Order Payment',
            description:'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response)
                try {
                    
                    const { data } = await axios.post( 'http://localhost:4000/api/order/verifyRazorpay',response,{headers:{token}})
                    if (data.success) {
                        navigate('/orders')
                        setCartItem({})
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error)
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }
    
    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {

            let orderItems = []

            for (const items in cartItem) {
                for (const item in cartItem[items]) {
                    if (cartItem[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItem[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getTotalAmount() + 2
            }
            

            switch (method) {

                // API Calls for COD
                case 'cod':
                    const response = await axios.post('http://localhost:4000/api/order/place',orderData,{headers:{token}})
                    if (response.data.success) {
                        setCartItem({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break;

                case 'stripe':
                    const responseStripe = await axios.post( 'http://localhost:4000/api/order/stripe',orderData,{headers:{token}})
                    if (responseStripe.data.success) {
                        const {session_url} = responseStripe.data
                        window.location.replace(session_url)
                    } else {
                        toast.error(responseStripe.data.message)
                    }
                    break;

                }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    return (
        <form onSubmit={onSubmitHandler} className='placeorder'>
            {/* ------------- Left Side ---------------- */}
            <div className='del-info'>

                <div className='del-info'>
                   <h1>Delivery<span>Infornmation</span></h1>
                </div>
                <div className='del-name'>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
                </div>
                <div className="del-name">
                <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
                </div>
                <div className='del-name'>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
                    <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
                </div>
                <div className='del-name'>
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
                </div>
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
            </div>

            {/* ------------- Right Side ------------------ */}
            
            
             

                <div className='place-mon'>
                    <p className='pl'> Payment<span>Infornmation</span></p>
                    {/* --------------- Payment Method Selection ------------- */}
                    <div className='pay'>
                        <div onClick={() => setMethod('stripe')} className='pay-met'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <img className={`${method==='stripe'?"active1":""}`} src={assets.stripe_logo} alt="" />
                        </div>
                      
                            <div onClick={() => setMethod('cod')} className='pay-met2'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className={`${method==='cod'?"active1":""}`}>CASH ON DELIVERY</p>
                        </div>
 
                    </div>

                    <div className='w-full text-end mt-8'>
                        <button type='submit'  className='but'>PLACE ORDER</button>
                    </div>
                </div>
           
        </form>
    )
}

export default PlaceOrder
