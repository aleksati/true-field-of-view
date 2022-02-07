import React, { useState } from "react";
import Menubar from "./components/menubar/menubar";
import Chart from "./components/chart/chart";
import initCanvasData from "./data/canvas-data";

const App = () => {
  // this is the same as localGlobalData, only updated less frequent
  const [globalCanvasData, setGlobalCanvasData] = useState(initCanvasData);

  return (
    <React.StrictMode>
      <div className="App">
        <Menubar setGlobalCanvasData={setGlobalCanvasData} />
        <Chart globalCanvasData={globalCanvasData} />
      </div>
    </React.StrictMode>
  );
};

export default App;