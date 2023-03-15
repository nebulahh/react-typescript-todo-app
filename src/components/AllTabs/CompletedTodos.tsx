import { Draggable, Droppable } from "react-beautiful-dnd"
import { todosType } from "../../App"
import "./AllTodos.css"

type TodoType = {
  todos: todosType[],
  deleteAllCompleted: () => void,
  deleteItem: Function,
  onToggle: Function,
}

type ItemType = {
  name: string | number
  status: boolean
}

export default function Completed(props: TodoType) {
let done = props.todos.filter(task => task.isCompleted === true)

function deleteAll() {
  props.deleteAllCompleted()
}

return (
  <div className="toggle">
    <Droppable droppableId="completed">
      {(provided) => (
        <div className="todo-container" {...provided.droppableProps} ref={provided.innerRef}>
          {done.map((todo, i) => {
            return (
             <Draggable key={todo.id.toString()} draggableId={todo.id.toString()} index={i}>
              {(provided) => (
                 <div className="todo" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                 <label className="container">
                   <input 
                     type="checkbox" 
                     checked={todo.isCompleted} 
                     onChange={e => {props.onToggle(i, e.target.checked)}} 
                   />
                   <span className="checkmark"></span>
                 </label>
                 <Task name={todo.item} status={todo.isCompleted} />
                <p onClick={() => props.deleteItem(todo.id)} className="deletePointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/> </svg>
                </p> 
               </div>
              )}
             </Draggable>
            )
           }
           )}
      {provided.placeholder}
        </div>
      )}
    </Droppable>
    <div className="selector">
      <p>{done.length} items left </p>
      <p onClick={deleteAll} className="setPointer"> Clear completed </p>
    </div>
  </div>
)
}

function Task({name, status}: ItemType) {
  return (
    <p className="item">
  {status ? (<s>{name}</s>): (name)}
    </p>
  )
}