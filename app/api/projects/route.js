import { NextResponse } from 'next/server';
import {connectMongoDB} from '@/app/lib/mongodb'; 
import Project from '@/app/models/project';

  export async function GET() {
    await connectMongoDB();
    const projects = await Project.find();
    return NextResponse.json(projects);
  }
  
  export async function POST(request) {
    await connectMongoDB();
    const { name, description } = await request.json();
    const newProject = await Project.create({ name, description });
    console.log("project created ");
    return NextResponse.json({message: "project created", project: { _id: newProject._id, name: newProject.name, description: newProject.description }}, { status: 201 });
  }

  export async function DELETE(request) {
    await connectMongoDB();
    const { id } = await request.json();
    await Project.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Project deleted' }, { status: 200 });
  }