import { Outlet } from "react-router-dom";
import CartList from "./cart/CartList"
import CategoriesList from "./categories/CategoriesList"


interface LayoutProps {
    items:{
        id: string
        productName:string
        description:string 
        unitPrice:number 
        category:string 
        imageUrl:string
    }[];
  }

const Layout:React.FC<LayoutProps> = ({items}) => {

  return (
    <main className="flex">
        <CategoriesList items={items}/>
        <Outlet/>
        <CartList/>
    </main> 
  )
}

export default Layout
