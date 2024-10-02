import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export const StoreContext=createContext(null);


const StoreContextProvider = (props) => {
  const backendUrl="http://localhost:4000"
    const [search,setseach]=useState("")
    const [searchbar,setsearchbar]=useState(false)
    const [cartItem,setCartItem]=useState([]) 
    const [token,setToken]=useState("")
    const[showLogin,setShowLogin]=useState(false)
    const [products,setProducts]=useState([])
    const navigate=useNavigate();
    
   
    const getProductsData = async () => {
        try {

            const response = await axios.get( 'http://localhost:4000/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products.reverse())
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
      getProductsData()
    },[])
    useEffect(()=>{
      async function loadData(){
      
        if(localStorage.getItem("token")){
          setToken(localStorage.getItem("token"))
          getUserCart(localStorage.getItem('token'))
  
      }
      
    }
  loadData()},[])


    const addToCart= async(itemId,size)=>{


      let cartData=structuredClone(cartItem)

      if(cartData[itemId]){
        if(cartData[itemId][size]){
          cartData[itemId][size]+=1
        }
        else{
          cartData[itemId][size]=1
        }
      }
      else{
        cartData[itemId]={}
        cartData[itemId][size]=1
      }
      setCartItem(cartData)
      
if(token){
  try{
  const response=await axios.post("http://localhost:4000/api/cart/add",{itemId,size},{headers:{token}})
}
catch(error){

  console.log(error)
  toast.error(error)
}}

    }
    useEffect(()=>{

    },[cartItem])


    const updateQuantity=async(itemId,size,quantity)=>{
      let cartData=structuredClone(cartItem
      )
      cartData[itemId][size]=quantity;
      setCartItem(cartData)

if(token){
  try{
  const response=await axios.post("http://localhost:4000/api/cart/update",{itemId,size,quantity},{headers:{token}})
  }
  catch(error){
console.log(error)
toast.error(error.message)
  }
}


    }

    const getUserCart=async(token)=>{
      try{
        const response=await axios.post("http://localhost:4000/api/cart/get",{},{headers:{token}})
        if(response.data.success){
          setCartItem(response.data.cartData)
        }
      }
      catch(error){
        console.log(error)
      }
    }
 
    const getTotalAmount=()=>{
      let TotalAmount=0
      for( const items in cartItem){
        let  itemInfo=products.find((product)=>product._id===items)
          for(const item in cartItem[items]){
try {
  if(cartItem[items][item]>0){
    TotalAmount+=itemInfo.price*cartItem[items][item]
  }
} catch (error) {
  
}
          }
        
      }
      return TotalAmount
    }


 const contextvalue={
search,
setseach,
searchbar,
setsearchbar,addToCart,
cartItem,updateQuantity
,getTotalAmount,navigate,setShowLogin,showLogin,token,setToken,products,setCartItem,setToken
 }

  return (
    <div>
      <StoreContext.Provider value={contextvalue}>
        {props.children}
      </StoreContext.Provider>
    </div>
  )
}

export default StoreContextProvider
