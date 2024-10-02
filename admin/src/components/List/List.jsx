import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = () => {
    const[list,setList]=useState([])
 const fetchList = async () => {
    try {

      const response = await axios.get('http://localhost:4000/api/product/list')
      if (response.data.success) {
        setList(response.data.products.reverse());
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {

      const response = await axios.post('http://localhost:4000/api/product/remove', { id } )

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])


  return (
    
    <div className='list-table'>
      
      <p className='list-table-title'>All Clothes List</p>

<div >
  <div className="list-title">
    <b className='list-img'>Image</b>
    <b className='list-name'>Name</b>
  <b className='list-price'>Price</b>
    <b className='list-category'>Categroy</b>
    <b className='list-sub'>subcategory</b>

    <b className='list-act'>Action</b>

  </div>
  {list.map((item,index)=>{
   
    return(
    <div key={index} className="list-table-format">
      
<img src={item.image[0]}  alt=''/>
<p>{item.name}</p>
<p>{item.price}</p>
<p>{item.category}</p>
<p>{item.subCategory}</p>

<p className='list-remove' onClick={()=>removeProduct(item._id)}>X</p>
    </div>)
  })}
</div>

      
    </div>
  )
}

export default List
