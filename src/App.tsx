import './App.css'
import { useState, useEffect } from 'react'
import Tabs from './components/Tabs'
import './index.css'


type todosType = {
  id: number,
  isCompleted: boolean,
  item: string | number
}

type Theme = 'dark' | 'light'

function App() {
  const [todos, setTodos] = useState<todosType[]>([])
  const [theme, setTheme] = useState<Theme>('light')
  const [next, setNext] = useState(0)
  console.log(todos);
  

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    }, [theme]);  

  const handleChange = () => setTheme(theme === 'light' ? 'dark' : 'light');

  function handleSubmit(e: any) {
    e.preventDefault()
    if (e.target[0].value.length === 0) {
      alert("The task input field is empty")
    } else {
      setNext(next + 1)
      setTodos([...todos.slice(0, 0), {
        id: next ,isCompleted: false, item: e.target[0].value
      }, ...todos.slice(0)])
    }
  }

  function deleteItem(id: number) {
    setTodos(
      todos.filter((item, i) => item.id !== id)
    )
  }
  
function deleteAllCompleted() {
    setTodos(
      todos.filter(item => item.isCompleted !== true)
    )
  }

  function onToggle(id: number, status: boolean) {
    setTodos(todos.map((todo, i) => {
      if (i === id) {
        return {
          ...todo,
          isCompleted: status
        };
      } else {
        return todo;
      }
    }));
  }
  

  return (
    <div className="relative" >
    <header className='toggle_bg'></header>
     <main>
       <div className="flex">
       <h2 className='logo'>TODO</h2>
      
      <div className="container-switch">
        <img onClick={handleChange} className='toggleDarkLight' alt="..." />
      </div>

    </div>
      <div className="form">
      <form onSubmit={e => handleSubmit(e)} className="add_todo">
      <div className="circle"></div>
      <input type="text"
        placeholder="click here create a new todo..." />
    </form>
    </div>
    <Tabs 
      todos={todos} 
      deleteItem={deleteItem} 
      deleteAllCompleted={deleteAllCompleted} 
      onToggle={onToggle}
    />
      <p className='dragAndDropInfo'>Drag and drop to reorder list</p>
    </main>
  </div>
)
}

export default App
