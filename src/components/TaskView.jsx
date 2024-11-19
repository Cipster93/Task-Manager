import React, { useContext } from "react";
import Card from "./Card";
import { GlobalContext } from "../context/TMContext";

const TaskView = () => {
  const { order } = useContext(GlobalContext);

  return (
    <div className="w-11/12 h-screen rounded-x overflow-y-auto no-scrollbar justify-center flex p-4 gap-3 flex-wrap">
      {order.map((item, index) => {
        return (
          <Card key={index} item={item} />
        )
      })}
    </div>
  );
};

export default TaskView;
