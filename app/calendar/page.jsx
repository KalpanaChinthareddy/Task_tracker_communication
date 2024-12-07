// app/calendar/page.jsx

"use client";

import NavBar from "../components/NavBar"; // Ensure this path is correct


export default function Page() {
    console.log("Page rendered");
    
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
            <NavBar />
           
        </div>
    );
}
