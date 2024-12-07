// components/TaskForm.jsx
"use client";
/*import { useState } from 'react';

export default function TaskForm({ project, onCreateTask, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('To Do');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      deadline,
      assignedTo,
      status,
      projectId: project._id,
    };

    onCreateTask(newTask);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-semibold mb-4">Create New Task for {project.name}</h2>
      <div className="mb-4">
        <label className="block">Task Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block">Task Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block">Deadline</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block">Assign to User</label>
        <input
          type="text"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="border p-2 w-full"
          placeholder="Enter user name"
        />
      </div>
      <div className="mb-4">
        <label className="block">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Create Task
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="bg-gray-500 text-white py-2 px-4 rounded ml-4"
      >
        Cancel
      </button>
    </form>
  );
}*/ 
import { useState, useEffect } from 'react';
import {useRouter} from 'next/navigation';

export default function TaskForm({ projectId }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('');
  const [tasks,setTasks] = useState([]);
  const [users,setUsers] = useState([]);
  const [userEmailMap, setUserEmailMap] = useState({});
  useEffect(() => {
    async function fetchData() {
      const userRes = await fetch(`/api/users`);
      const userData = await userRes.json();
      setUsers(userData);
      const emailMap = {};
      userData.forEach((user) => {
        emailMap[user.username] = user.email;
      });
      setUserEmailMap(emailMap);
    
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      const taskRes = await fetch(`/api/projects/${projectId}/tasks`);
      const taskData = await taskRes.json();
      setTasks(taskData);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/projects/${projectId}/tasks`, {
      method: 'POST',
      headers:{
          "Content-Type": "application/json",
      },
      body: JSON.stringify({title,description,deadline,projectId,assignedTo,status}),
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    //console.log(session?.);

    const response = await fetch("/api/notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: userEmailMap[assignedTo],
        subject: "Task Assigned to You",
        content: `
          <h1>New Task Assigned</h1>
          <p>You have been assigned a new task.</p>
        <p><strong>Task ID:</strong>${title}</p>
          <p>Check your dashboard for more details.</p>
        `,
      }),
    });

    if (response.ok) {
      console.log("Email notification sent successfully!");
    } else {
      const error = await response.json();
      console.error("Failed to send email:", error.error);
    }
    if(res.ok){
      const form = e.target;
      form.reset();
      router.push(`/projects/${projectId}/tasks`);
      //router.push("/");
  };
}

  return (
    <div className='align-middle' >
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <label className="block text-gray-700 font-semibold mb-1">Task Title</label>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input border rounded px-3 py-2 w-full"
      />
    </div>

    <div>
      <label className="block text-gray-700 font-semibold mb-1">Task Description</label>
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="input border rounded px-3 py-2 w-full"
      />
    </div>

    <div>
      <label className="block text-gray-700 font-semibold mb-1">Deadline</label>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="input border rounded px-3 py-2 w-full"
      />
    </div>

    <div>
      <label className="block text-gray-700 font-semibold mb-1">Status</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="input border rounded px-3 py-2 w-full"
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>
    <div>
      <label className="block text-gray-700 font-semibold mb-1">Priority</label>
      <select
        value="Prority"
        className="input border rounded px-3 py-2 w-full"
      >
        <option value="P0">P0</option>
        <option value="P1">P1</option>
        <option value="P2">P2</option>
        <option value="P3">P3</option>
      </select>
    </div>
    

    <div className="sm:col-span-2">
      <label className="block text-gray-700 font-semibold mb-1">Assign User</label>
      <select
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        className="input border rounded px-3 py-2 w-full"
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

  <button type="submit" className="btn bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg mt-4 hover:bg-blue-600">
    Create Task
  </button>
</form>
</div>

  );
}
