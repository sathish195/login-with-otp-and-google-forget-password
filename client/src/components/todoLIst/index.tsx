import React,{useEffect, useState} from 'react'
import { useNavigate  } from 'react-router-dom'

import Cookies from 'js-cookie';

const Todo = () =>{


    const [newItem, setNewItem] = useState("");
    const [age, setNewAge] = useState("");

    const [items, setItes] = useState([] as any);
    const [temporyVal, setTemporyVal] = useState({} as any)
    const [open,setOpen] = useState(true)
  
    function addItem() {
      if (!newItem) {
        alert("Enter an item....");
        return;
      }
      if (!age) {
        alert("Enter an age....");
        return;
      }
      const item = {
        id: Math.floor(Math.random() * 100),
        value: newItem,
        age:age
      };
      setItes([...items, item ]); 

      setNewItem("");
      setNewAge("");
    }
     console.log(items);
    function deleteItem(id:any) {
      const newArry = items.filter((item:any) => item.id !== id);
      setItes(newArry);
    }
    const navigate = useNavigate();

  useEffect(()=>{
    const token= Cookies.get("jwt_token")

    // if(token) {
    //     navigate('/', { replace: true });

    // }
  
  },[])
  const edit = (data:any) =>{
    const filter = items.filter((x:any)=>x.id === data.id)
    setNewItem(filter[0].value)
    setNewAge(filter[0].age)
    console.log(filter)

    setTemporyVal(filter[0])

    setOpen(false)
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

    setItes(modData)

    setOpen(true)
    setNewItem("");
    setNewAge("") 


  }
  return (
    <div className="App">
      <h1>To do list </h1>
      <input
        type="text"
        placeholder="Add on item..."
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <input
        type="text"
        placeholder="Add on age..."
        value={age}
        onChange={(e) => setNewAge(e.target.value)}
      />
{open?
      <button onClick={addItem}>Add</button> :
      <button onClick={updata}>updata</button>
}
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
    </div>
  );
}

export default Todo