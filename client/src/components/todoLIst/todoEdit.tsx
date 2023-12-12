import React, { useState } from "react";

const Edit = (props:any) => {
  
  const [newItem, setNewItem] = useState("");
  const [age, setNewAge] = useState("");

  const [items, setItems] = useState([] as any);
  const [temporyVal, setTemporyVal] = useState({} as any)
  const [open,setOpen] = useState(true)
  
  

  function deleteItem(id:any) {
    const newArry = items.filter((item:any) => item.id !== id);
    setItems(newArry);
  }
    
  const updata = () =>{
    const findIndex = items.findIndex((x:any)=>x.id === temporyVal.id)
    items[findIndex].value =newItem
    items[findIndex].age =age
    
    
    console.log(items);
    
    const modData = items?.map((x:any) =>( {
        ...x,
        value : x?.id == findIndex?.id ?  findIndex?.value  : x?.value,
        age : x?.id == findIndex?.id ? findIndex?.age : x?.age
    }) )

    setItems(modData)

    setOpen(true)
    setNewItem("");
    setNewAge("") 


  }
  const edit = (data:any) =>{
    const filter = items.filter((x:any)=>x.id === data.id)
    setNewItem(filter[0].value)
    setNewAge(filter[0].age)
    console.log(filter)

    setTemporyVal(filter[0])

    setOpen(false)
  }

    return(
        <div>
          div
            {items.map((item:any) => (
          <table key={item.id}>
            
  <tr>
    <th>name</th>
    <th>age</th>
  </tr>
  <tr>
    <td> {item.value}</td>
    <td>{item.age}</td>
    <td>  <button onClick={() => deleteItem(item.id)}>X</button>
            <button onClick={() => edit(item)}>E</button></td>

  
  </tr>

          
            
          
</table>
            
        ))}
        <div>
          <Edit />
        </div>

        </div>
    )
}

export default Edit