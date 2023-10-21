import { useEffect } from "react";
import Button from "../shared/Button"
import Cart from "./Cart"
import { useCartStore, useTotalItemsStore } from "../../store/store";
import useCalculateTotalItems from "../../hooks/useCalculateTotalItems";

interface CartItems {
  id: string
  productName:string
  description:string 
  unitPrice:number 
  category:string 
  imageUrl:string
  quantity?:number
}

const storedCartItems = JSON.parse(localStorage.getItem("cartItems") as string) || []


const CartList: React.FC = () => {
  const {cartItems, setCartItems} = useCartStore() as {cartItems: CartItems[], setCartItems: (value:CartItems[])=> void};
  const {totalItems, setTotalItems} = useTotalItemsStore() as {totalItems: number, setTotalItems: (value:number)=>void};
  const {getTotalItems} = useCalculateTotalItems();
  
  const handleClearCart =()=>{
    localStorage.removeItem("cartItems");
    localStorage.removeItem("attributes");
    setTotalItems(0);
    setCartItems([]); 
  }

  useEffect(() => {
    setCartItems(storedCartItems);
  }, [setCartItems]);

  useEffect(()=>{
    getTotalItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return (
    <section className="flex-[20%] h-[calc(100vh-80px)] bg-primary flex flex-col justify-between">
      <header className="flex justify-between bg-secondary px-8 pt-8 pb-2">
        <h1 className="text-3xl text-bold">My Cart</h1>
        <button className="self-end bg-red text-white px-2 mt-8" onClick={handleClearCart}>Clear Cart</button>
      </header>
      <main className="flex flex-col flex-1 p-8 gap-8 overflow-scroll">
       {cartItems.map((cartItem: { id: string; productName: string; description: string; unitPrice: number; category: string; imageUrl: string; })=>(
        <Cart key={cartItem.id} cartItem={cartItem}/>
       ))}
      </main>
      <footer className="px-8 py-4 bg-secondary flex flex-col gap-4">
        <div className="flex justify-between">
            <p>Total Items:</p>
            <p className="text-red">{totalItems}</p>
        </div>
        <div className="flex justify-between">
            <p className="self-end">Total Amount:</p>
            <p className="text-red text-3xl">P320.50</p>
        </div>
        <Button label="Checkout"/>
      </footer>
    </section>
  )
}

export default CartList
