// app/calendar/page.jsx

"use client";

import NavBar from "../components/NavBar";
import MyCalendar from "../components/Calendar";

export default function Page() {
    return (
        <div>
            <NavBar />
            <MyCalendar /> {/* Render the Calendar component */}
        </div>
    );
}
