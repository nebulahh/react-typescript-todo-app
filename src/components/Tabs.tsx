import {
  useState
} from "react";
import Todolist from './AllTabs/Todolist.tsx'
import Active from './AllTabs/Active.tsx'
import Completed from './AllTabs/Completed.tsx'

type TodoType = {
  todos: {}[],
  deleteItem: React.MouseEventHandler < HTMLButtonElement >
  markAsCompleted: React.MouseEventHandler < HTMLButtonElement >
  setTodos: React.Dispatch<React.SetStateAction<[]>>
}

function Section ({
  tab, deleteItem, onToggle, todos, deleteAll
}) {
  if (tab === 'tab1') {
    return <Todolist todos={todos} deleteItem={deleteItem} onToggle={onToggle} />
  } else if (tab === 'tab2') {
    return <Active todos={todos} deleteItem={deleteItem} onToggle={onToggle} />
  } else {
    return <Completed todos={todos} deleteItem={deleteItem} onToggle={onToggle} />
  }
}

const Tabs = (props: TodoType) => {
  const [activeTab,
    setActiveTab] = useState("tab1");

  const handleTab1 = () => {
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    setActiveTab("tab2");
  };

  const handleTab3 = () => {
    setActiveTab("tab3")
  }
  return (
    <div className="Tabs">
      <div className="outlet">
      <Section tab={activeTab} todos={props.todos} deleteItem={props.deleteItem} onToggle={props.onToggle} setTodos={props.setTodos}/>
      </div>
       <div style = {
      {
        display: "flex",
        justifyContent: "center",
        marginTop: "20px"
      }} >
      <div style={ { gap: "10px",
          display: "flex" }}>
    <p className={activeTab === "tab1" ? "active": ""} onClick={handleTab1}>
All
        </p>
    <p className={activeTab === "tab2" ? "active": ""} onClick={handleTab2}>
Active
        </p>
    <p className={activeTab === "tab3" ? "active": ""} onClick={handleTab3}>
Completed
        </p>
      </div>
    </div>
    </div>
  );
};
export default Tabs;