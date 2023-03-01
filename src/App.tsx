import './App.css'
import {
  useState, useEffect
} from 'react'
import Todolist from './components/Todolist.tsx'
import Completed from './components/Completed.tsx'
import Active from './components/Active.tsx'
import Tabs from './components/Tabs.tsx'
import './index.css'
//import darkImg from './assets/night-mode.png'
//import lightImg from './assets/brightness.png'

//type ChangeEvent = React.ChangeEvent<HTMLInputElement>
type Theme = 'dark' | 'light'
let next = 0
function App() {
  const [todos,
    setTodos] = useState([])
const [theme, setTheme] = useState<Theme>('light')
//const [bg, setBg] = useState<string>(darkImg)

const handleChange = (e: ChangeEvent) => setTheme(e.target.checked ? 'dark' : 'light');

useEffect(() => {
document.body.setAttribute('data-theme', theme);
  }, [theme]);

  function handleSubmit(e) {
    e.preventDefault()
    if (e.target[0].value.length === 0) {
      alert("The task input field is empty")
    } else {
      setTodos([...todos.slice(0, 0), {
       id: next++ ,isCompleted: false, item: e.target[0].value
      }, ...todos.slice(0)])
    }
  }

  function deleteItem(id) {
    setTodos(
      todos.filter((item, i) => item.id !== id)
    )
  }
  
function deleteAllCompleted() {
  alert("hhh")
    setTodos(
      todos.filter((item, i) => item.isCompleted !== true)
    )
  }

  function onToggle(id, status) {
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
       <h2 style={{letterSpacing: ".8rem"}}>TODO</h2>
       <p>
  <div className="container-switch">
            <label className="switch">
                <input type="checkbox" onChange={handleChange} checked={theme === 'dark'} />
                <span className="slider"></span>
            </label>
        </div>
    </p>
    </div>
      <div className="form">
      <form onSubmit={e => handleSubmit(e)} className="add_todo">
      <div className="circle"></div>
      <input type="text"
        placeholder="click here create a new todo..." />
    </form>
    </div>
    <Tabs setTodos={setTodos} todos={todos} deleteItem={deleteItem} onToggle={onToggle}/>
      <p style={{marginTop: "30px", textAlign: "center"}}>
Drag and drop to reorder list
    </p>
    </main>
  </div>
)
}

export default App