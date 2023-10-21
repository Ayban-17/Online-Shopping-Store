import { create } from 'zustand';

interface CartItem {
  id: string;
  productName: string;
  description: string;
  unitPrice: number;
  category: string;
  imageUrl: string;
}

export const useCartStore = create((set) => ({
  cartItems: [] as CartItem[] ,
  setCartItems: (value: CartItem[])=>{
    set({ cartItems: value });
  }
}));

export const useTotalItemsStore = create((set) => ({
  totalItems: 0,
  setTotalItems: (value:number) => {
    set({ totalItems: value });
  }
}));
