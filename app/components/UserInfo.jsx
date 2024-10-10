"use client"

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserInfo(){

    const {data: session} = useSession();

    return(
        <div className = "grid place-items-center h-0">
            User Info
            <div className = "shadow-lg bg-zince-300/10 flex flex-col gap-2 my-6">
                {session?.user?.name}<br></br>
                {session?.user?.email}
                <button onClick = {()=>signOut()} className = "bg-red-500 text-white font-bold">Log out</button>
            </div>
            

        </div>
    );
}  