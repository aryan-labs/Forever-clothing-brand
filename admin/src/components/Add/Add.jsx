import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import './Add.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { toast } from 'react-toastify'
const Add = () => {
    

     const [image1,setImage1] = useState(false)
 
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");
   const [category, setCategory] = useState("Men");
   const [subCategory, setSubCategory] = useState("Topwear");
   const [bestseller, setBestseller] = useState(false);
   const [sizes, setSizes] = useState([]);

   const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      
      const formData = new FormData()

      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))

      image1 && formData.append("image1",image1)
    

      const response = await axios.post( "https://forever-clothing-brand-backend.onrender.com/api/product/add",formData)

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
      
        setPrice('')
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
   }
  return (
    <>
<form onSubmit={onSubmitHandler}>
    <div className='add-item'>
        <div className="add-image">
        <p>Upload image</p>
        <label htmlFor='image'>  
            <img src={image1?URL.createObjectURL(image1):assets.upload_area} alt=''/>
         
             </label>
            <input onChange={(e)=>setImage1(e.target.files[0])} type='file' id='image' hidden required/>
            
        </div>
        <div className="add-name">
        <p>Product Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} name='name' type='text' placeholder='name' />
        </div>
        <div className="add-desc">
      <p>Product Description</p>
      <input onChange={(e)=>setDescription(e.target.value)} value={description} name='description' type='text' placeholder='write description here'></input>
      </div>
      <div className="add-cat">
        <p>Product Category</p>
        <select onChange={(e) => setCategory(e.target.value)} name='category'> 
            <option value='Men'>Men</option>
            <option value='Women'>Women</option>
            <option value='Kids'>Kids</option>
        </select>
        
        <p>Product Subcategory</p>
        <select onChange={(e) => setSubCategory(e.target.value)} name='subcategory'>
            <option value='top-wear'>top-wear</option>
            <option value='bottom-wear'>bottom-wear</option>
            <option value='winter-wear'>winter-wear</option>
        </select>
        <input value={price} type='Number'  name='price' placeholder='25' onChange={(e) => setPrice(e.target.value)} ></input>
      </div>
      <div className="sizes"  >
        <p>Produuct Sizes</p>
       <div className='size1'>
        <p className={`${sizes.includes("S")?"soize":"soize1"}`} onClick={()=>setSizes(prev=>prev.includes("S")?prev.filter(item=>item!=="S"):[...prev,"S"])}>S</p>
        <p className={`${sizes.includes("M")?"soize":"soize1"}`} onClick={()=>setSizes(prev=>prev.includes("M")?prev.filter(item=>item!=="M"):[...prev,"M"])} >M</p>
        <p className={`${sizes.includes("L")?"soize":"soize1"}`} onClick={()=>setSizes(prev=>prev.includes("L")?prev.filter(item=>item!=="L"):[...prev,"L"])} >L</p>
        <p className={`${sizes.includes("XL")?"soize":"soize1"}`} onClick={()=>setSizes(prev=>prev.includes("XL")?prev.filter(item=>item!=="XL"):[...prev,"XL"])}>XL</p>
        <p className={`${sizes.includes("XXL")?"soize":"soize1"}`} onClick={()=>setSizes(prev=>prev.includes("XXL")?prev.filter(item=>item!=="XXL"):[...prev,"XXL"])}>XXL</p>
       </div>
      
      </div>
      
    </div>
    <div className="best">
    <input type='checkbox' ></input><p>Add to bestseller</p>
    
    </div>
    <button className='add'>ADD CLOTHES</button>
    </form>
    </>
    
  )
}

export default Add
