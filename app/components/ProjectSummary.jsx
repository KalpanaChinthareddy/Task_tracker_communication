"use client";
import { useState, useEffect } from 'react';

export default function ProjectSummary({ projectId }) {
  const [summary, setSummary] = useState('');
  const [tasks,setTasks] = useState([]); 
  const [project,setProject] = useState(); 
  const [projectData,setprojectData] = useState('How to Add AI in my application');
  
  // useEffect(() => {
  //   async function fetchProject() {
  //     const projectRes = await fetch(`/api/projects/${projectId}`);
  //     const projectData = await projectRes.json();
  //     setProject(projectData);
  //   }

  //   async function fetchTasks() {
  //     const taskRes = await fetch(`/api/projects/${projectId}/tasks`);
  //     const taskData = await taskRes.json();
  //     setTasks(taskData);
  //   } 

  //   // Fetch both project and tasks concurrently
  //   Promise.all([fetchProject(), fetchTasks()]).then(() => {
  //     if (project) {
  //       // Combine project and tasks data
  //       const combinedData = {
  //         ...project,
  //         tasks: tasks
  //       };
  //       setprojectData("How to Add AI in my application");
  //     }
  //   });
  // }, [project, tasks]);


  useEffect(() => {
    const fetchSummary = async () => {
      const response = await fetch('/api/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: JSON.stringify(projectData) }),
      });
      const result = await response.json();
      setSummary(result.summary);
    };

    fetchSummary();
  }, [projectData]);

  return (
    <div>
    
      <p>{summary}</p>
    </div>
  );
}
