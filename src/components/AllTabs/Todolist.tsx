import "./Todolist.css"
import { useRef } from 'react'
//import TabSelector from "./components/TabSelector.tsx"
import { DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';


type TodoType = {
  todos: {}[],
  deleteItem: React.MouseEventHandler < HTMLButtonElement >,
  onToggle: React.MouseEventHandler < HTMLButtonElement >

}


function Item ({
  name,
  status
}) {
  return (
    <p className="item">
  {status ? (<s style={{color: "#e4e5f1"}}>{name}</s>): (name)}
    </p>
  )
}

export default function Todolist(props: TodoType) {

const dragItem = useRef();
const dragOverItem = useRef();
const dragStart = (position) => {
    dragItem.current = position;
  //  console.log(e.target.innerHTML);
  };
  
const dragEnter = ( position) => {
    dragOverItem.current = position;
    //console.log(e.target.innerHTML);
  };
  
const drop = (e) => {
    const copyListItems = [...props.todos];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    props.setTodos(copyListItems);
  };
  
  
function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    
if (result.destination.index === result.source.index) {
      return;
    }
  }

  return (
    <div class="toggle">
<DragDropContext onDragEnd={onDragEnd}>
<Droppable droppableId="characters">
    {(provided) => (
    <div className="todo_container" {...provided.droppableProps} ref={provided.innerRef}>
    {props.todos.map((todo, i) => {
      return (
<Draggable key={i} draggableId={i} index={i}>
      {(provided) => (
        <div className="todo" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>

        <label className="checkbox">
        <input type="checkbox" checked={todo.isCompleted} onChange={e => {
          props.onToggle(i, e.target.checked)
    
        }} />
      
        </label>
        <Item name={todo.item} status={todo.isCompleted} />
         <p onClick = {() => props.deleteItem(todo.id)} >
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/> </svg>
        
         </p> 
{provided.placeholder}
        </div>
)}
    </Draggable>
      )
        }
      )}
      </div>
)}
  </Droppable>
</DragDropContext>
<div className="selector">
       <p> 
       {
          props.todos.length
          } items left 
      </p>
<p onClick={() => {  }}> Clear completed </p>
</div>
</div>
    )
    }