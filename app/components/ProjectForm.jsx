// components/ProjectForm.jsx
"use client";

import { useState,useEffect } from 'react';
import {useRouter} from 'next/navigation';

export default function ProjectForm() {
  //const {data: session} = useSession();
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [projects,setProjects] = useState('');
  useEffect(() => {
    async function fetchData() {
      const projectRes = await fetch('/api/projects');
      const projectData = await projectRes.json();
      setProjects(projectData);
    }
    fetchData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/projects', {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name,description,}),
      });
      const newProject = await res.json();
      setProjects([...projects, newProject]);
     
      if(res.ok){
        const form = e.target;
        form.reset();
        router.push(`/projects/${newProject.project._id}/tasks`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
  <div className="flex flex-col">
    <label className="text-gray-700 mb-1" htmlFor="project-name">Project Name</label>
    <input
      type="text"
      id="project-name"
      placeholder="Enter project name"
      onChange={(e) => setName(e.target.value)}
      className="input border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <div className="flex flex-col">
    <label className="text-gray-700 mb-1" htmlFor="project-description">Project Description</label>
    <textarea
      id="project-description"
      placeholder="Enter project description"
      onChange={(e) => setDescription(e.target.value)}
      className="input border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <button type="submit" className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded focus:outline-none">
    Create Project
  </button>
</form>

  );
}

