import "./App.css";
import { CanvasComponent } from "./components/canvas/Canvas";
import SidePaneComponent from "./components/sidepane/SidePane";

function App() {

  return (
    <div className="root-container">
      <SidePaneComponent />
      <CanvasComponent/>
    </div>
  )
}

export default App;
