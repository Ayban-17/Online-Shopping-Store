import { useState } from "react"


const useGetItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean | null> (null);
  const [error, setError] = useState<Error | null > (null);
  
  const getItems = async () => {

    setIsLoading(true);
    try {
        const response = await fetch("/items.json");
        const data = await response.json();
        setItems(data); 
    } catch (e) {
        console.log(e);
        setError(new Error("There is an error on fetching the data")); 
    }
    setIsLoading(false);
  }

  return { getItems, items, isLoading, error }
}

export default useGetItems
