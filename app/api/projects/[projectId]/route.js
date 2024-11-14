import { connectMongoDB } from '@/app/lib/mongodb';
import Project from '@/app/models/project';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
  await connectMongoDB();
  const { id } = params;  
  try {
    await Project.findByIdAndDelete(id);  // Delete the project by ID
    return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return NextResponse.json({ message: "Failed to delete project" }, { status: 500 });
  }
}