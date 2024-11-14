import {connectMongoDB} from '@/app/lib/mongodb'; 
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import Task from '@/app/models/task';

export async function GET(request, { params }) {
  const {projectId} = params;
  await connectMongoDB();
  const tasks = await Task.find({projectId});
  return NextResponse.json(tasks);
}

export async function POST(request, { params }) {
  await connectMongoDB();
  
  const {title,description,deadline,status,assignedTo,projectId} = await request.json();
  const result = await Task.create({title,description,deadline,status,assignedTo,projectId});
  return NextResponse.json({task: result}, { status: 201 });
}
export async function DELETE(request) {
    await connectMongoDB();
    const { id } = await request.json();
    await Task.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Task deleted' }, { status: 200 });
  }