import { useState } from "react";
import Products from "./Products"
import { useParams } from "react-router-dom";
interface ProductsListProps {
  items:{
      id: string
      productName:string
      description:string 
      unitPrice:number 
      category:string 
      imageUrl:string
  }[];
}

const ProductsList: React.FC<ProductsListProps> = ({items}) => {
  const {category} = useParams();
  const [searchWord, setSearchWord] = useState<string>("");
  const [sortedItems, setSortedItems] = useState<ProductsListProps["items"]>(items)

  const sortHighToLow = () => {
    const sortResults = items.sort((a,b)=> b.unitPrice - a.unitPrice)
    setSortedItems(sortResults)
  }

  return (
    <section className="p-10 flex flex-col gap-4 flex-[50%] h-screen" >
      
      <input type="search" placeholder="Search Item" className="bg-primary w-full py-4 px-8" onChange={e=> setSearchWord(e.target.value)}/>

      <button className="text-right" onClick={sortHighToLow}>Sort price high to low</button>    
      
      <div className="flex flex-col gap-8 overflow-scroll">
        {sortedItems.length === 0 ?
        items.filter((item)=>{
          return category === undefined? 
          searchWord === "" ? 
          item: 
          item.productName.toLowerCase().includes(searchWord.toLowerCase())
          :
          item.category.toLowerCase() === category.toLowerCase() &&
          item.productName.toLowerCase().includes(searchWord.toLowerCase())
        }).map((item)=>(
          <Products item={item} key={item.id}/>
        )):sortedItems.filter((item)=>{
          return category === undefined? 
          searchWord === "" ? 
          item: 
          item.productName.toLowerCase().includes(searchWord.toLowerCase())
          :
          item.category.toLowerCase() === category.toLowerCase() &&
          item.productName.toLowerCase().includes(searchWord.toLowerCase())
        }).map((item)=>(
          <Products item={item} key={item.id}/>
        ))}
      </div>
    </section>
  )
}

export default ProductsList
