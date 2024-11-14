import TaskForm from "@/app/components/TaskForm";


export default function createTaskPage({params}){
    const { projectId } = params;
    return (
    <div>
        <TaskForm projectId={projectId}/>
        <div className="flex" >
        </div>     
    </div>
    ); 
}