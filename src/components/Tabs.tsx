import {useState} from "react";
import Todolist from './AllTabs/AllTodos'
import Active from './AllTabs/ActiveTodos'
import Completed from './AllTabs/CompletedTodos'
import './Tabs.css'
import {DragDropContext, DropResult} from 'react-beautiful-dnd'

type TodoType = {
  todos: any,
  deleteItem: (id: number) => void,
  onToggle: (id: number, status: boolean) => void
  deleteAllCompleted: () => void,
}

type SectionType = {
  tab: string,
  deleteItem: (id: number) => void,
  onToggle: (id: number, status: boolean) => void,
  deleteAllCompleted: () => void,
  todos: [
    {
      id: number,
      isCompleted: boolean,
      item: string | number
    }
  ],
  handleDragEnd(result: DropResult): void
}

const Tabs = (props: TodoType) => {
  const [newOrderItem, setNewOrderItem] = useState(props.todos)
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTab1 = () => {
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    setActiveTab("tab2");
  };

  const handleTab3 = () => {
    setActiveTab("tab3")
  }

  function handleDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }
    
  if (result.destination.index === result.source.index && result.destination.droppableId === result.source.droppableId) {
      return;
    }

    const items = Array.from(newOrderItem)
    
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setNewOrderItem(items)

    // props.setTodos(newOrderItem)

  }
  return (
    <div className="Tabs">
      <div className="outlet">
      <Section 
        handleDragEnd={handleDragEnd}
        tab={activeTab}
        todos={newOrderItem} 
        deleteItem={props.deleteItem} 
        deleteAllCompleted={props.deleteAllCompleted}
        onToggle={props.onToggle}
      />
      </div>
      <div className="tabs-container" >
      <div className="tabs-container__child">
       <p className={activeTab === "tab1" ? "active": ""} onClick={handleTab1}>All</p>
       <p className={activeTab === "tab2" ? "active": ""} onClick={handleTab2}>Active</p>
       <p className={activeTab === "tab3" ? "active": ""} onClick={handleTab3}>Completed</p>
      </div>
    </div>
    </div>
  );
};

function Section ({
  tab, deleteItem, onToggle, todos, handleDragEnd, deleteAllCompleted
}: SectionType) {
  if (tab === 'tab1') {
    return <DragDropContext onDragEnd={handleDragEnd}>
      <Todolist 
        deleteAllCompleted={deleteAllCompleted} 
        todos={todos} deleteItem={deleteItem} 
        onToggle={onToggle} 
      />
      </DragDropContext>
  } else if (tab === 'tab2') {
    return <DragDropContext onDragEnd={handleDragEnd}>
      <Active 
        todos={todos} 
        deleteItem={deleteItem} 
        onToggle={onToggle} 
      />
      </DragDropContext>
  } else {
    return <DragDropContext onDragEnd={handleDragEnd}>
      <Completed 
        deleteAllCompleted={deleteAllCompleted} 
        todos={todos} 
        deleteItem={deleteItem} 
        onToggle={onToggle} 
      />
      </DragDropContext>
  }
}

export default Tabs;
