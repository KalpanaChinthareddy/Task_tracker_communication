"use client"; // Mark this file as a Client Component

import React, { useState } from 'react';
import Calendar from 'react-calendar'; // Import the Calendar component
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles

const MyCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]); // State to hold events
    const [isModalOpen, setModalOpen] = useState(false);
    const [eventTitle, setEventTitle] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateClick = (value) => {
        setSelectedDate(value); // Set the selected date
        setModalOpen(true); // Open the modal for event input
    };

    const handleEventAdd = () => {
        if (eventTitle) {
            const newEvent = {
                date: selectedDate.toDateString(),
                title: eventTitle,
            };
            setEvents([...events, newEvent]); // Add the new event to the events state
            setModalOpen(false); // Close the modal
            setEventTitle(''); // Clear the input
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Calendar</h1>
            <div className="bg-white rounded-lg shadow-md p-4">
                <Calendar
                    onChange={setDate}
                    value={date}
                    onClickDay={handleDateClick} // Add click handler
                />
                <p className="mt-4">Selected Date: {date.toDateString()}</p>

                {/* Display events */}
                <div className="mt-4">
                    <h2 className="text-lg font-bold">Events</h2>
                    {events.map((event, index) => (
                        <div key={index} className="bg-gray-200 p-2 rounded mt-2">
                            <strong>{event.date}: </strong>{event.title}
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for Adding Event */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-md">
                        <h2 className="text-xl font-bold">Add Event</h2>
                        <input
                            type="text"
                            placeholder="Event Title"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                            className="border p-2 rounded w-full mt-2"
                        />
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEventAdd}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Add Event
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCalendar;
