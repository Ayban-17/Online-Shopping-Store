import { useTotalItemsStore } from "../store/store";


const useCalculateTotalItems= () => {
    const {setTotalItems} = useTotalItemsStore() as {setTotalItems: (value:number)=>void}

    const getTotalItems = () => {
        const attributes = JSON.parse(localStorage.getItem("attributes") as string)||[{id:"id", quantity:0}]
        const totalItems = attributes.map((attribute: { quantity: number; })=> attribute.quantity)
        const sum = totalItems.reduce((acc: number, curVal: number)=> acc + curVal, 1)
        setTotalItems(sum) 
    }
    return{getTotalItems}

}

export default useCalculateTotalItems
