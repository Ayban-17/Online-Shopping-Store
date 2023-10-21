import Category from "./Category";

interface CategoriesListProps {
    items:{
        id: string
        productName:string
        description:string 
        unitPrice:number 
        category:string 
        imageUrl:string
    }[];
}

const CategoriesList: React.FC<CategoriesListProps> = ({items}) => {
    const categories = items.map(item => item.category);
    const uniqueCategories = [...new Set(categories)]

  return (
    <aside className="bg-primary flex-[10%] h-[calc(100vh-80px)]">
      <Category uniqueCategories={uniqueCategories}/>
    </aside>
  )
}

export default CategoriesList;
