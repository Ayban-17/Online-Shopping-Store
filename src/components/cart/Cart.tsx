import {  useState } from "react";
import { useCartStore } from "../../store/store";
import useCalculateTotalItems from "../../hooks/useCalculateTotalItems";


interface CartProps {
    cartItem:{
        id: string
        productName:string
        description:string 
        unitPrice:number 
        category:string 
        imageUrl:string
        quantity?:number
    };
  }

  interface CartItems {
    id: string
    productName:string
    description:string 
    unitPrice:number 
    category:string 
    imageUrl:string
    quantity?:number
  }



  
const Cart:React.FC<CartProps> = ({cartItem}) => {
    const { cartItems, setCartItems } = useCartStore()as {cartItems: CartItems[], setCartItems: (value:CartItems[])=> void};
    const [quantity, setQuantity] = useState<number>(1)
    const {getTotalItems} = useCalculateTotalItems();
    const totalPriceByItem = cartItem.unitPrice * quantity

    const removeItem = () => {
        const updatedCartItems = cartItems.filter(item => item.id !== cartItem.id);
        setCartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems))
      }

    const addOne = () => {
        setQuantity(quantity + 1) 
        const storedAttributes = JSON.parse(localStorage.getItem("attributes") as string) || []
        const attributesStorage = storedAttributes.find((attributes: { id: string; })=>{
            return attributes.id == cartItem.id
        })
        
        getTotalItems();
        
        if (attributesStorage) {
            attributesStorage.quantity += 1;
        } else {
            const newAttribute = { id: cartItem.id, quantity: quantity+1 };
            storedAttributes.push(newAttribute);
        }
        localStorage.setItem("attributes", JSON.stringify(storedAttributes));
    }

    const minusOne = () => {
        if (quantity < 2){
            removeItem();
        }else{
            setQuantity(quantity - 1)
        }
    }



  return (
    <article className="flex justify-between gap-4 relative">
      <button className="bg-red px-2 text-white rounded-full -top-3 -left-3 absolute" onClick={removeItem}>x</button>
      <img src={cartItem.imageUrl} alt={cartItem.productName} className="w-20 h-20 "/>
      <div className="flex-1 flex flex-col justify-between">
        <h1 className="text-2xl">{cartItem.productName}</h1>
        <h2 className="text-xl text-red">₱{totalPriceByItem.toLocaleString("en-US", { maximumFractionDigits: 2 })}</h2>
      </div>
      <div className=" flex justify-center items-end">
        <button className="bg-secondary px-2" onClick={minusOne}>-</button>
        <input type="text" value={quantity} readOnly className="w-10 text-center"/>
        <button className="bg-secondary px-2" onClick={addOne}>+</button>
      </div>
    </article>
  )
}

export default Cart
