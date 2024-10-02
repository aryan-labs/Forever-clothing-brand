import React, { useContext, useEffect, useState } from 'react'
import './Collection.css'
import Products from '../../components/Products/Products'
import { StoreContext } from '../../components/Context/StoreContext'
import axios from 'axios'


const Collection = () => {

  const [filterproducts,setfilterProducts]=useState([])
  const [category,setCategory]=useState([])
  const [subcategory,setSubCategory]=useState([])
const toggleCategory=(e)=>{
if(category.includes(e.target.value)){
  setCategory(prev=>prev.filter(item=>item!==e.target.value))

}
else{
  setCategory(prev=>[...prev,e.target.value])
}}
const togglesubCategory=(e)=>{

if(subcategory.includes(e.target.value)){
  setSubCategory(prev=>prev.filter(item=>item!==e.target.value))

}
else{
  setSubCategory(prev=>[...prev,e.target.value])
}
}
const applyFilter=()=>{
  let productCopy=products.slice()

  if(category.length>0){
    productCopy=products.filter(item=>category.includes(item.category))
  
  }
   if(subcategory.length>0){
    productCopy=products.filter(item=>subcategory.includes(item.subcategory))
  
  }
    setfilterProducts(productCopy)
 
    
}
  


useEffect(()=>{
 
  applyFilter()
},[category,subcategory])
   
    const {search,
        setseach,
        searchbar,
        setsearchbar,products}=useContext(StoreContext)
  
   
  return (
    <div className='collection-page' >
        <div className='search-box'>{searchbar?<p>
      <input onChange={(e)=>setseach(e.target.value)} type='text' placeholder='search products here'/><span onClick={()=>setsearchbar(false)}>X</span></p>:""}</div>
    
      
      <div className="filter">
        <p>FILTERS</p>
        <div className="category-filter">
            <p>CATEGORIES</p>
            <p>
            <input onChange={toggleCategory}   type='checkbox' value={'Men'}/>Men
            </p>
            <p>
            <input  onChange={toggleCategory} type='checkbox' value={'Women'}/>Women
            </p>
            <p>
            <input  onChange={toggleCategory} type='checkbox' value={'Kids'}/>Kids
            </p>
        </div>
        <div className="category-filter">
            <p>SUB-CATEGORIES</p>
            <p>
            <input onChange={togglesubCategory} type='checkbox' value={'TopWear'}/>TopWear
            </p>
            <p>
            <input onChange={togglesubCategory} type='checkbox' value={'BottomWear'}/>BottomWear
            </p>
            <p>
            <input onChange={togglesubCategory} type='checkbox' value={'WinterWear'}/>WinterWear
            </p>
        </div>
      </div>
      <div className="collection-display">
      {filterproducts.filter((item)=>{
            return search.toLowerCase()===""?item:item.name.toLowerCase().includes(search)
          }).map((item) => (
            <Products
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
      </div>
    </div>
  )
}

export default Collection
