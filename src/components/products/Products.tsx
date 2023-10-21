import React, { useState } from 'react'
import { useCartStore } from '../../store/store';
import useCalculateTotalItems from '../../hooks/useCalculateTotalItems';

interface ProductsProps {
  item:{
      id: string
      productName:string
      description:string 
      unitPrice:number 
      category:string 
      imageUrl:string
  };
}

interface CartItems {
  id: string
  productName:string
  description:string 
  unitPrice:number 
  category:string 
  imageUrl:string
}

  
const Products:React.FC<ProductsProps> = ({item}) => {
  const {cartItems, setCartItems} = useCartStore() as {cartItems: CartItems[], setCartItems: (value:CartItems[])=> void};
  const [isOpen, setIsOpen] =  useState<boolean>(true);
  const {getTotalItems} = useCalculateTotalItems();

  const toggleDescription = () => {
    setIsOpen(!isOpen)
  }

  const addToCart =()=>{
    const  storageCartItems= JSON.parse(localStorage.getItem("cartItems") as string) || [];
    const  storedCartItems= storageCartItems.find((storedItem: { id: string; })=>storedItem.id === item.id);
    const itemObject = JSON.parse(JSON.stringify(item));

    
    if(storedCartItems === undefined){
      const storedAttributes = JSON.parse(localStorage.getItem("attributes") as string) || []
      cartItems.unshift(itemObject)
      setCartItems(cartItems)
      getTotalItems();
      const newAttribute = { id: itemObject.id, quantity: 1 };
      storedAttributes.push(newAttribute);
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }else{
      return;
    }
  }

  return (
    <article className='bg-primary p-8 flex gap-4 justify-between'>
      <img src={item.imageUrl} alt={item.productName} className='w-40 h-40 object-cover flex-[20%]'/>
      <div className='flex flex-col gap-2 flex-[50%]'>
        <h1 className='text-bold text-2xl'>{item.productName}</h1>
        <h6 className='text-green'>{item.category}</h6>
        <p className={` ${isOpen? "line-clamp-2":""}`}>{item.description}</p>
        <p className='self-end cursor-pointer' onClick={toggleDescription}>{isOpen? "see more":"see less"}</p>
      </div>
      <div className='flex flex-col justify-center gap-8 flex-[20%]'>
        <p className='text-red text-4xl self-end'>₱{item.unitPrice.toLocaleString()}</p>
        <button onClick={addToCart} className={` bg-yellow-green p-4 w-full `}>Add to cart</button>
      </div>
    </article>
  )
}

export default Products
