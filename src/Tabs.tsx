import {
  useState
} from "react";
import Todolist from './AllTabs/Todolist.tsx'
import Active from './AllTabs/Active.tsx'
import Completed from './AllTabs/Completed.tsx'

const Tabs = () => {
  const [activeTab,
    setActiveTab] = useState("tab1");
  return (
    <div className="Tabs">
      <div className="outlet">
      <Todolist />
      <Active />
      <Completed />
    </div>
      <div style={ { display: "flex", justifyContent: "center", marginTop: "20px" }}>
    <div style={ { gap: "10px", display: "flex" }}>
    <p className={activeTab === "tab1" ? "active": ""}>
All
      </p>
    <p className={activeTab === "tab2" ? "active": ""}>
Active
      </p>
    <p className={activeTab === "tab3" ? "active": ""}>
Completed
      </p>
      </div>
    </div>
    </div>
  );
};
export default Tabs;