import NavBar from "../components/NavBar";
import LeftSidebar from "../components/LeftSidebar"
import Chat from "../components/Chat"

export default function Dashboard(){
    return (
    <div>
        <NavBar />
        <div className="flex" >
        <LeftSidebar className = "w-[50%]"/>
        <Chat className = "w-[50%]" />
        </div>
        
    </div>
    );
    
}