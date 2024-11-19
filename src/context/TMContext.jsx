import React, { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const FetchData = ({ children }) => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const allData = async () => {
    try {
      const res = await fetch("/data.json");
      const response = await res.json();
      setData(response);
      setOrder(response);
    } catch (e) {
      console.log("Fetch failed", e);
    }
  };

  useEffect(() => {
    allData();
  }, []);

  const orderByStatus = (status) => {
    if (status === "All") {
      setOrder(data);
    } else {
      setOrder(data.filter((item) => item.status === status));
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const addNewTask = (newTask) => {
    const maxId = Math.max(...data.map((task) => task.id), 0);
    const newId = maxId + 1;

    const taskWithId = { ...newTask, id: newId };
    const updatedData = [...data, taskWithId];

    setData(updatedData);
    setOrder(updatedData);   
};

  const deleteById = (id) => {
    const filterData = data.filter((item) => item.id !== id);
    setData(filterData);
    setOrder(filterData);
  };


  const editTask = (task) => {
    setSelectedTask(task);
    openModal();
  };

  const updateTask = (updatedTask) => {
    const updatedData = data.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setData(updatedData);
    setOrder(updatedData);
  };

  const resetSelectedTask = () => {
    setSelectedTask(null);
  };

  return (
    <GlobalContext.Provider
      value={{
        data,
        order,
        orderByStatus,
        deleteById,
        modalIsOpen,
        openModal,
        closeModal,
        addNewTask,
        selectedTask, 
        editTask,  
        updateTask,
        resetSelectedTask
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
