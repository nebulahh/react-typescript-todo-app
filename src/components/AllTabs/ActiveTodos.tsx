import { Draggable, Droppable } from "react-beautiful-dnd"
import "./AllTodos.css"

type TodoType = {
  todos: [
    {
      id: number,
      isCompleted: boolean,
      item: string | number
    }
  ],
  deleteItem: React.MouseEventHandler<HTMLButtonElement>,
  onToggle: React.MouseEventHandler<HTMLButtonElement>,
}

type ItemType = {
  name: string | number
  status: boolean
}

export default function Active(props: TodoType) {
  const active = props.todos.filter(task => task.isCompleted === false)

  return (
    <div className="toggle">
      <Droppable droppableId="active">
        {(provided) => (
          <div className="todo-container" {...provided.droppableProps} ref={provided.innerRef}>
             {active.map((todo, i) => {
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
                     <p onClick = {() => props.deleteItem(todo.id)} className="deletePointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/> </svg>
                    </p>
                   </div>
                  )}
                </Draggable>
              )
    })
    }
      {provided.placeholder}
          </div>
        )}

      </Droppable>
     <div className="selector">
      <p> { active.length } items left</p> 
     </div>
  </div>
)
}

function Task({ name, status }: ItemType) {
  return (
    <p className="item">
  {status ? (<s>{name}</s>): (name)}
    </p>
  )
}