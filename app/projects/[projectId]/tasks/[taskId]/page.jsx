import EditTask from '@/app/components/EditTask';

export default function ProjectsPage({ params }) {
    const { projectId , taskId} = params;
  return (
    <div>
      
      <EditTask projectId={projectId} taskId = {taskId} />
      
    </div>
  );
}