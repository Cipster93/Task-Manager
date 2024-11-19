import React, { useContext } from "react";
import { GlobalContext } from "../context/TMContext";

const UnderHeader = () => {
    const { orderByStatus } = useContext(GlobalContext);
    const { openModal } = useContext(GlobalContext)
        
  return (
    <div className="w-[70%] h-8 items-center flex gap-5 justify-between mt-4">
      <button className="bg-black text-white font-semibold py-1 px-2 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out" onClick={openModal}>
        Add Task ➕
      </button>
      <select
        name="status"
        className="bg-black text-white py-1 px-2 rounded-lg font-semibold text-center"
        onChange={(e) => orderByStatus(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="In progress">In progress</option>
        <option value="Not started">Not started</option>
      </select>
    </div>
  );
};

export default UnderHeader;
