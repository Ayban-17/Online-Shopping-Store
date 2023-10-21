import { Route, Routes } from "react-router-dom";
import Header from "./components/Header"
import Layout from "./components/Layout";


import { useEffect, useState } from "react";
import ProductsList from "./components/products/ProductsList";


const App: React.FC = () => {
  const [items, setItems] = useState([]);

  useEffect(()=>{

      const fetchCategories = async () => {
        try {
          const response = await fetch("/items.json");
          const data = await response.json();
          setItems(data); 
      } catch (e) {
          console.log(e);
          
      }
      }
      fetchCategories();

  },[])
  return (
    <div className="h-screen overflow-hidden">
      <Header/>
      <Routes>
        <Route path="/" element={<Layout items={items}/>}>
          <Route index element={<ProductsList items={items}/>}/>
          <Route path="/:category" element={<ProductsList items={items}/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
