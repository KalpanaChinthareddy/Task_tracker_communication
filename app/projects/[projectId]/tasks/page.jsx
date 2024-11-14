import TaskList from '@/app/components/TaskList';

export default function TaskPage({ params }) {
  const { projectId } = params;

  return (
  <div className="flex flex-col items-start space-y-4">
  <TaskList projectId={projectId} />
</div>

  );
}