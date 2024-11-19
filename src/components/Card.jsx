import React, { useContext } from "react";
import { GlobalContext } from "../context/TMContext";

const Card = ({ item }) => {
  const { deleteById, editTask } = useContext(GlobalContext);

  return (
    <div className="w-1/5 h-4/6 bg-slate-200 rounded-xl flex flex-col p-6 gap-2 hover:translate-y-[-10px] transition-all duration-0.7 ease-in-out hover:shadow-[0px_0px_15px_0px_black]">
      <div className="w-11 h-auto bg-slate-400 rounded-xl text-center">
        T - {item.id}
      </div>
      <div
        className={`w-40 relative -ml-6 rounded-tr-lg rounded-br-lg text-center ${
          item.status === "Completed"
            ? "bg-green-500"
            : item.status === "In progress"
            ? "bg-orange-500"
            : "bg-blue-500"
        }`}
      >
        {item.status}
      </div>
      <div className="w-full h-4/6 p-1">{item.details}</div>
      <div className="w-auto h-auto justify-end items-end flex gap-1">
        <div className="justify-center items-center gap-3 flex w-auto h-full">
          <button onClick={() => deleteById(item.id)}>❌</button>
          <button onClick={() => editTask(item)}>🔧</button>
        </div>
        <div className=" w-3/4 items-end flex flex-col">
          <div className="w-2/3 h-auto text-right">Due Date</div>
          <div className="w-2/3 h-auto text-right font-bold">
            {item.dueDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
