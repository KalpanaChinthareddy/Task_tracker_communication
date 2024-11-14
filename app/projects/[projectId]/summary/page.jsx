import ProjectSummary from '@/app/components/ProjectSummary';

export default function SummaryPage({ params }) {
  const { projectId } = params;

  return (
  <div className="flex flex-col items-start space-y-4">
    <h1 className='text-center text-heading1-bold'>Project Summary</h1>
  <ProjectSummary projectId={projectId} />
</div>

  );
}