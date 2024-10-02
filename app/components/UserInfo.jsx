export default function UserInfo(){
    return(
        <div className = "grid place-items-center h-screen">
            User Info
            <div className = "shadow-lg bg-zince-300/10 flex flex-col gap-2 my-6">
                User
                <button className = "bg-red-500 text-white font-bold">Log out</button>
            </div>

        </div>
    );
}  