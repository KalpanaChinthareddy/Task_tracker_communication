"use client";

import {useState,useEffect} from 'react';
import Link from 'next/link';

export default function TaskList( {projectId} ) {
  const [tasks,setTasks] = useState([]); 
  
  useEffect(() => {
    async function fetchData() {
      const taskRes = await fetch(`/api/projects/${projectId}/tasks`);
      const taskData = await taskRes.json();
      setTasks(taskData);
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/projects/${projectId}/tasks`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    
  };

    return (
      <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className=" font-bold">Project Details</h1>
        <Link href={`/projects/${projectId}/tasks/create`}>
          <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
            Create Task
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-gray-100 p-4 rounded-lg shadow-md border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
            <p className="text-gray-600 mt-1">{task.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              Deadline: {new Date(task.deadline).toLocaleDateString()}
            </p>
            <p
              className={`text-sm font-medium mt-1 ${
                task.status === "Completed" ? "text-green-600" : "text-yellow-600"
              }`}
            >
              Status: {task.status}
            </p>

            <div className="flex justify-between mt-3">
              <Link href={`/projects/${projectId}/tasks/${task._id}`}>
                <button className="bg-green-500 text-white font-semibold py-1 px-4 rounded hover:bg-green-400 focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
                  Edit
                </button>
              </Link>

              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-500 text-white font-semibold py-1 px-4 rounded hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
              >
                Delete Task
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
  }
  

  