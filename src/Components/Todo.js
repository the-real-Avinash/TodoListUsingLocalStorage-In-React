import React, { useEffect, useState } from 'react'

const getLocalItems = () =>{
    let list = localStorage.getItem('lists');
    console.log(list);

    if(list){
        return JSON.parse(localStorage.getItem('lists'));
    }else{
        return[]; 
    }

}

const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItems());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);


    const addItem = () =>{
        if(!inputData){
            alert("Please fill data!!");
       }else if(inputData && !toggleSubmit){
        setItems(
            items.map((ele)=>{
                if(ele.id === isEditItem){
                    return {...ele, name: inputData}
                }
                return ele;
            })
        )

        setToggleSubmit(true);
        setInputData('');
        setIsEditItem(null);
    }else{
        const allInputData = {id: new Date().getTime().toString(), name: inputData }
        setItems([...items, allInputData]);
        setInputData('');
    }
    
    }

    const deleteItem = (index) =>{
        const updatedData = items.filter((ele)=>{
            return index !== ele.id;
        });
        setItems(updatedData);
    }

    const removeAll = () =>{
        setItems([]);
    }

    const editItem =(id)=>{
        let newEditItem = items.find((ele)=>{
            return ele.id === id 
        });
        console.log(newEditItem);
        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setIsEditItem(id);
    }

    useEffect(()=>{
        localStorage.setItem('lists',JSON.stringify(items));
    },[items]);
  return (
    <>
      <div className="main-div">
        <div className="child-div">
            <figure>
                <figcaption>Add Your List Here.</figcaption>
            </figure>
            <div className="addItems">
                <input type="text"  placeholder='Add Items'
                    value={inputData} 
                    onChange={(e)=>setInputData(e.target.value)}
                />
                {
                    toggleSubmit ?   <i className='fa fa-plus add-btn' title='Add Items' onClick={addItem}></i>:
                                    <i className='fa fa-edit add-btn' title='update Items' onClick={addItem}></i>
                }
              
            </div>
            <div className="showItems">
            {
                items.map((ele)=>{
                    return(
                        <>
                    <div className="eachItem" key={ele.id}>
                    <h3>{ele.name}</h3>
                    <div className="todo-btn">
                    <i className='far fa-edit add-btn' title='Edit Item' onClick={() => editItem(ele.id)}></i>
                    <i className='far fa-trash-alt add-btn' title='Delete Item' onClick={() => deleteItem(ele.id)}></i>
                </div>
                </div>
                </>
                    )
                })
            }
                
                {/* //Clear All Button */}
                <div className="showItems">
                    <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Todo
