"use client";
import { useState, useEffect } from 'react';
import {useRouter} from 'next/navigation';

export default function EditTask({ projectId, taskId }) {
  const router = useRouter();
 
  const [task,setTask] = useState([]);
  const [users,setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const userRes = await fetch(`/api/users`);
      const userData = await userRes.json();
      setUsers(userData);
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      const taskRes = await fetch(`/api/projects/${projectId}/tasks/${taskId}`);
      const taskData = await taskRes.json();
      setTask(taskData);
    }
    fetchData();
  }, []);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [deadline, setDeadline] = useState(task.deadline);
  const [assignedTo, setAssignedTo] = useState(task.assignedTo);
  const [status, setStatus] = useState(task.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
      method: 'PUT',
      headers:{
          "Content-Type": "application/json",
      },
      body: JSON.stringify({title,description,deadline,projectId,assignedTo,status}),
    });
    // const newTask = await res.json();
    // setTask([...task, newTask]);
    //console.log(session?.);
    if(res.ok){
      const form = e.target;
      //form.reset();
      router.push(`/projects/${projectId}/tasks`);
      //router.push("/");
  };
}

  return (
    <div className='text-center'>
    <h1 className='font-bold text-center'>Updating Task</h1>
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <label className="block text-gray-700 font-semibold mb-1">Task Title</label>
      <input
        type="text"
        placeholder="Task Title"
        defaultValue={task.title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />
    </div>

    <div>
      <label className="block text-gray-700 font-semibold mb-1">Task Description</label>
      <textarea
        placeholder="Task Description"
        defaultValue={task.description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />
    </div>

    <div>
      <label className="block text-gray-700 font-semibold mb-1">Deadline</label>
      <input
        type="date"
        defaultValue={task.deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />
    </div>

    <div>
      <label className="block text-gray-700 font-semibold mb-1">Status</label>
      <select
        defaultValue={task.status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>

    <div className="sm:col-span-2">
      <label className="block text-gray-700 font-semibold mb-1">Assign User</label>
      <select
        defaultValue={task.assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      >
        <option value="">Assign User</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  </div>

  <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg mt-4 hover:bg-blue-600">
    Update
  </button>
</form>
</div>
  );
}