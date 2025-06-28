import React, { useEffect, useState } from 'react'
import './TodoList.css'




const todolist = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState(""); 
    const [Message, setMessage] = useState("");
   const [editText, setEditText] = useState("");    //It stores the new text you're typing when editing a todo.
    const [editId, setEditId] = useState(null) ;      // It stores the id of the todo that you want to edit.
   


    //load from local storage on first load
    useEffect(()=>{
        const storedTodos = localStorage.getItem("todos");
        if(storedTodos){
            setTodos(JSON.parse(storedTodos));
        }
    }, []);   //Fetch data when the page loads. //Load todos from localStorage when the page opens.

     const onChange = (e) =>{
        setInput(e.target.value);
    };

     const onSubmit = (e) =>{
        e.preventDefault();

        if(input.trim()=== ""){
            setMessage("Can you add your todo-list");
            return;
        }
        const newTodos =[
        ...todos,{
            name:input,
            autoComplete: "off",
            id: Date.now()
        
        }  
     ];

     setTodos(newTodos);
     

     //save updated todos to localStorage
     localStorage.setItem("todos", JSON.stringify(newTodos));

     setInput('');
     setMessage("");
     };


     //delete the todolist
     const handleDelete =(id) =>{
        const updatedTodos = todos.filter(todo => todo.id !== id );
        setTodos(updatedTodos);
        localStorage.removeItem("todos", JSON.stringify(updatedTodos));
     };

    //  editing the text
     const handleEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.name);
  };

     //to save or edit text
   const handleEditSave = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, name: editText } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setEditId(null);
    setEditText("");
  };

  //mark todo 



  return (

    <div className='Todo-App'>
      <div className='header'>

       <h1>Todo-List App</h1>
   </div>
       <form  onSubmit={onSubmit}>
            <input className='form-input'
            type="text"
            placeholder='Enter your todolist'
            autoComplete='off'  //you may want to prevent autofill for security.
            value={input}
            onChange={onChange} 
            />
            
            <button className='form-button' type="Submit">Add</button>
        {Message && ( <p style={{color: "red", marginTop: "5px"}}>{Message}</p>)}
        </form>
         {/* ✅ Display your todos */}
        <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {editId === todo.id ? (          //When editId === todo.id, React will show an input box instead of normal text.
              <>
                <input
                className='textInput-area'
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                 onKeyDown={(e) => {     //e is the event object. It contains details like e.key, e.code, etc.
                 if (e.key === "Enter") {  // Checks if the user pressed the Enter key
                handleEditSave(todo.id);   //we call your save function: handleEditSave(todo.id)
      }
    }}
                />
                {/* <button onClick={() => handleEditSave(todo.id)}>Save</button> */}
              </>
            ) : (

              < div className='todo-content'>
                {todo.name}
            <div className='todo-actions'>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="delete-btn"
                  
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
                <button
                  onClick={() => handleEdit(todo)}
                  className="update-text"
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
              </div>
             </div> 
            )}
          </li>
        ))}
      </ul>
       
     
      {/* <div className=''></div> */}
    </div>
    
  )
}

export default todolist;
