import { useState } from 'react'
import './App.css'
import  TodoList from "./components/todolist";
import 'bootstrap/dist/css/bootstrap.min.css';
 import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// {/* <FontAwesomeIcon icon="fa-regular fa-circle-check" /> */}

  
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <TodoList/>
    </>
  )
}

export default App
