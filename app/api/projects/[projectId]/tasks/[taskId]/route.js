import { connectMongoDB } from '@/app/lib/mongodb'; // Import your MongoDB connection utility
import Task from '@/app/models/task'; // Import your Task model
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const {projectId, taskId} = params;
    await connectMongoDB();
    const tasks = await Task.findById(taskId);
    return NextResponse.json(tasks);
  }
  
export async function PUT(request, { params }) {
  const { taskId, projectId } = params; // Extract taskId and projectId from URL parameters
  const { title, description, status, deadline, assignedTo } = await request.json(); // Parse the request body
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Find the task by ID and projectId, then update it
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, projectId: projectId }, // Match by taskId and projectId
      { title, description, status, deadline, assignedTo },
      { new: true } // Return the updated task
    );

    if (!updatedTask) {
      return NextResponse.json(
        { message: 'Task not found or not updated' },
        { status: 404 }
      );
    }

    // Return the updated task as a response
    return NextResponse.json(
      { message: 'Task updated successfully', task: updatedTask },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { message: 'Failed to update task' },
      { status: 500 }
    );
  }

}
export async function DELETE(request,params) {
    const { taskId, projectId } = params; 
    await connectMongoDB();
    await Task.findByIdAndDelete(taskId);
    return NextResponse.json({ message: 'Task deleted' }, { status: 200 });
  }