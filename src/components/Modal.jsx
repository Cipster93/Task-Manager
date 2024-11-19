import React, { useContext, useState, useEffect } from "react";
import Modal from "react-modal";
import { GlobalContext } from "../context/TMContext";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    padding: "2rem",
    borderRadius: "0.5rem",
    maxWidth: "600px",
    width: "100%",
  },
};

function Modals() {
  const { modalIsOpen, closeModal, addNewTask, selectedTask, updateTask, resetSelectedTask } = useContext(GlobalContext);
  
  const [newTaskData, setNewTaskData] = useState({
    status: "",
    details: "",
    dueDate: "",
  });

  useEffect(() => {
    if (selectedTask) {
      setNewTaskData({
        status: selectedTask.status,
        details: selectedTask.details,
        dueDate: selectedTask.dueDate,
      });
    }
  }, [selectedTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTaskData({ ...newTaskData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTaskData.status === "Select Status" || newTaskData.status === "") {
      alert("Please select a status for the task.");
      return;
    }
    if (selectedTask) {
      const updatedTask = {
        ...selectedTask, 
        status: newTaskData.status || selectedTask.status, 
        details: newTaskData.details || selectedTask.details, 
        dueDate: newTaskData.dueDate || selectedTask.dueDate,
      };
  
      updateTask(updatedTask);  
    } else {
      const newTask = {
        id: new Date().getTime(),
        status: newTaskData.status,
        details: newTaskData.details,
        dueDate: newTaskData.dueDate,
      };
      addNewTask(newTask); 
    }
    closeModal(); 
    resetSelectedTask();
  };
  const handleClose = () => {
    closeModal();  
    resetSelectedTask();  
  };
  

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleClose}
      style={customStyles}
      contentLabel={selectedTask ? "Edit Task" : "Add New Task"}
    >
      <h2 className="text-red-400 text-4xl font-bold">
        {selectedTask ? "Edit Task" : "Add New Task"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="w-full h-auto flex flex-col gap-4">
          <p className="text-2xl font-bold">
            <u>Status:</u>
          </p>
          <select
            name="status"
            value={newTaskData.status}
            className="mt-1 p-2 border border-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
            onChange={handleChange}
            aria-required
            required
          >
            <option value="Select Status">All</option>
            <option value="Completed">Completed</option>
            <option value="In progress">In progress</option>
            <option value="Not started">Not started</option>
          </select>
          <p className="text-2xl font-bold">
            <u>Description:</u>
          </p>
          <input
            type="text"
            name="details"
            value={newTaskData.details}
            className="border border-black rounded-md h-[80px] flex"
            onChange={handleChange}
          />
          <p className="text-2xl font-bold">
            <u>Date:</u>
          </p>
          <input
            type="date"
            name="dueDate"
            value={newTaskData.dueDate}
            onChange={handleChange}
            className="border border-black rounded-md"
          />
        </div>
        <div className="w-full flex items-center justify-center gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md shadow mt-2"
          >
            {selectedTask ? "Update Task" : "Add Task"}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-md shadow mt-2"
          >
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default Modals;
