  import React from "react";
  import TaskView from "./components/TaskView";
  import { FetchData } from "./context/TMContext";
  import UnderHeader from "./components/UnderHeader";
  import Modals from "./components/Modal";

  function App() {
    return (
      <div className="bg-gradient-to-r from-blue-500 to-slate-200 w-full h-screen flex justify-center items-center flex-col m-0 p-0">
        <div className="w-full h-14 justify-center items-center text-center border-b-2 border-b-black">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Task-Manager
          </h1>
        </div>
        <FetchData>
          <UnderHeader /> 
          <TaskView /> 
          <Modals /> 
        </FetchData>
      </div>
    );
  }

  export default App;
