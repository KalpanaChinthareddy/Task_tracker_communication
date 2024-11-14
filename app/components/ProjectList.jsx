// components/ProjectList.jsx
"use client";
/*
import TaskList from './TaskList';

export default function ProjectList({ projects, onCreateTask, onDeleteProject, onDeleteTask }) {
  return (
    <div>
      {projects.map((project) => (
        <div key={project._id} className="bg-white shadow-md rounded p-4 mb-4">
          <h2 className="text-xl font-bold">{project.name}</h2>
          <p>{project.description}</p>
          <button
            onClick={() => onDeleteProject(project._id)}
            className="bg-red-500 text-white py-1 px-3 rounded mt-2"
          >
            Delete Project
          </button>
          <button
            onClick={() => onCreateTask(project)}
            className="bg-green-500 text-white py-1 px-3 rounded mt-2 ml-2"
          >
            Add Task
          </button>

          <TaskList tasks={project.tasks} projectId={project._id} onDeleteTask={onDeleteTask} />
        </div>
      ))}
    </div>
  );
}
*/ 
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProjectList() {
  const router = useRouter();
  const [projects,setProjects] = useState([]); 
  
  useEffect(() => {
    async function fetchData() {
      const projectRes = await fetch('/api/projects');
      const projectData = await projectRes.json();
      setProjects(projectData);
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/projects`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    setProjects((prevProjects) => prevProjects.filter((project) => project._id !== id));
    
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
    {/* Heading centered */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-center flex-1">Projects</h1>
      {/* Create New Project button on the top right */}
      <Link href="/projects/create">
      <button
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
      >
        Create New Project
      </button>
    </Link>
    </div>
  
    {/* Project list */}
    <div className="space-y-6">
      {projects.map((project) => (
        <div key={project._id} className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{project.name}</h2>
          <p className="text-gray-600 mb-4">{project.description}</p>
          
          <div className="flex space-x-4">
            <button
              onClick={() => handleDelete(project._id)}
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
            >
              Delete Project
            </button>
            
            <a
              href={`/projects/${project._id}/tasks`}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Manage Tasks
            </a>

            <a
              href={`/projects/${project._id}/summary`}
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
            >
              Get Summary Using AI
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  
  );
}
