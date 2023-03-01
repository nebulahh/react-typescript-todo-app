import "./Todolist.css"
//import TabSelector from "./TabSelector.tsx"
type TodoType = {
  todos: {}[],
  deleteItem: React.MouseEventHandler < HTMLButtonElement >
  markAsCompleted: React.MouseEventHandler < HTMLButtonElement >
}


function Item ({
  name,
  status
}) {
  return (
    <p className="item">
  {status ? (<s>{name}</s>): (name)}
    </p>
  )
}

export default function Todolist(props: TodoType) {

  return (
    <div>
    {props.todos.map((todo, i) => {
      return (
        <div className="todo" key={i}>
        <label>
        <input type="checkbox" checked={todo.isCompleted} onChange={e => {
          props.onToggle(i, e.target.checked)
          // alert(e.target.checked)
        }} />
        </label>
        <Item name={todo.item} status={todo.isCompleted} />
         < p onClick = {() => props.deleteItem(i)} >
        X < /p> < /div>
      )
      })
        }
        <div className="todo">
       < p > {
          props.todos.length
          } items left < /p> < p > Clear completed < /p >
        </div>
       {/* <TabSelector />*/}
      </div>
    )
    }