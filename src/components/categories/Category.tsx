import { NavLink } from "react-router-dom";
interface CategoryProps {
    uniqueCategories: string[] 
}
const Category: React.FC<CategoryProps> = ({uniqueCategories}) => {

  return (
    <nav className=" py-8 flex flex-col gap-4">
      <NavLink to="/"className={`py-2 px-8 text-lg capitalize cursor-pointer hover:bg-yellow-green`}>All Items</NavLink>
      {uniqueCategories.map((uniqueCategory, index)=>(
        <NavLink to={`/${uniqueCategory}`} key={index} className={`py-2 px-8 text-lg capitalize cursor-pointer hover:bg-yellow-green`}>{uniqueCategory}</NavLink>
      ))}
    </nav>
  )
}

export default Category
