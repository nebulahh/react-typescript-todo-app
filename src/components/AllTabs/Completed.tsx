import "./Todolist.css"
type TodoType = {
  todos: {}[],
  deleteItem: React.MouseEventHandler < HTMLButtonElement >,
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

export default function Completed(props: TodoType) {
const done = props.todos.filter(task => task.isCompleted === true)

function deleteAll() {
  done = done.forEach((task) => props.deleteItem(task.id))
}

  return (
    <div className="toggle">
    {done.map((todo, i) => {
        return (
          <div className="todo" key={i}>
        <label>
        <input type="checkbox" checked={todo.isCompleted} onChange={e => {
            props.onToggle(i, e.target.checked)
          }} />
        </label>
        <Item name={todo.item} status={todo.isCompleted} />
         <p onClick={() => props.deleteItem(todo.id)}>
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/> </svg>
        </p> </div>
      )
      
      })
        }
        <div className="selector">
       <p> {
            done.length
            } items left </p>
            <p onClick={deleteAll}> Clear completed </p>
          </div>
        </div>
      )
    }