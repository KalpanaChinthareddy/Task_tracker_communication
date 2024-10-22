"use client"; // Mark this file as a Client Component

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Calendar CSS
import { ToastContainer, toast } from 'react-toastify'; // Import toast and ToastContainer for notifications
import 'react-toastify/dist/ReactToastify.css'; // Toast CSS
import { format } from 'date-fns'; // For date formatting

const MyCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]); // Events state
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEventIndex, setCurrentEventIndex] = useState(null);
    const [eventTitle, setEventTitle] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventTags, setEventTags] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const checkForReminders = () => {
            const now = new Date();
            setEvents((prevEvents) => 
                prevEvents.map(event => {
                    const eventDateTime = new Date(`${event.date} ${event.time}`);
                    if (!event.reminded && eventDateTime <= now) {
                        // Trigger a notification when the event time is reached
                        toast.info(`Reminder: ${event.title} at ${event.time}`);
                        return { ...event, reminded: true }; // Mark event as reminded
                    }
                    return event;
                })
            );
        };

        const interval = setInterval(checkForReminders, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    const handleDateClick = (value) => {
        setSelectedDate(value);
        setIsEditing(false); // Reset editing state
        setModalOpen(true);
    };

    const handleEventAdd = () => {
        if (eventTitle && eventTime) {
            const newEvent = {
                date: selectedDate.toDateString(),
                time: eventTime,
                title: eventTitle,
                tags: eventTags.split(',').map(tag => tag.trim()), // Split tags by comma and trim spaces
                reminded: false, // Track if the reminder was shown
            };

            if (isEditing) {
                // Update existing event
                setEvents((prevEvents) => {
                    const updatedEvents = [...prevEvents];
                    updatedEvents[currentEventIndex] = newEvent; // Replace the event
                    return updatedEvents;
                });
                toast.success('Event updated successfully!');
            } else {
                // Add new event
                setEvents((prevEvents) => [...prevEvents, newEvent]);
                toast.success('Event added successfully!');
            }

            handleModalClose();
        } else {
            toast.error('Please enter event title, time, and tags.'); // Error message
        }
    };

    const handleEditEvent = (index) => {
        const eventToEdit = events[index];
        setEventTitle(eventToEdit.title);
        setEventTime(eventToEdit.time);
        setEventTags(eventToEdit.tags.join(', ')); // Join tags into a string
        setCurrentEventIndex(index);
        setIsEditing(true);
        setModalOpen(true);
    };

    const handleDeleteEvent = (index) => {
        setEvents((prevEvents) => prevEvents.filter((_, i) => i !== index));
        toast.success('Event deleted successfully!');
    };

    const handleCancel = () => {
        handleModalClose();
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setEventTitle('');
        setEventTime('');
        setEventTags('');
        setCurrentEventIndex(null);
        setIsEditing(false);
    };

    return (
        <div className="p-6 min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
            <h1 className="text-4xl font-bold text-white mb-6">My Calendar</h1>
            <div className="bg-white rounded-lg shadow-md p-4">
                <Calendar
                    onChange={setDate}
                    value={date}
                    onClickDay={handleDateClick}
                    tileClassName={({ date, view }) =>
                        events.find((event) => format(new Date(event.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
                            ? 'highlight'
                            : ''
                    }
                />
                <p className="mt-4 text-lg text-gray-700">
                    Selected Date: <strong>{date.toDateString()}</strong>
                </p>

                {/* Display events for the selected date */}
                <div className="mt-4">
                    <h2 className="text-xl font-bold">Events</h2>
                    {events
                        .filter((event) => event.date === date.toDateString())
                        .map((event, index) => (
                            <div key={index} className="bg-gray-200 p-2 rounded mt-2 flex justify-between items-center">
                                <div>
                                    <strong>{event.time} - </strong> {event.title} 
                                    {event.tags.length > 0 && (
                                        <span className="ml-2 text-sm text-gray-600">[{event.tags.join(', ')}]</span>
                                    )}
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleEditEvent(index)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteEvent(index)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {/* Modal for Adding/Editing Event */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Event' : 'Add Event'}</h2>
                        <input
                            type="text"
                            placeholder="Event Title"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                            className="border p-2 rounded w-full mb-2"
                        />
                        <input
                            type="time"
                            value={eventTime}
                            onChange={(e) => setEventTime(e.target.value)}
                            className="border p-2 rounded w-full mb-2"
                        />
                        <input
                            type="text"
                            placeholder="Tags (comma separated)"
                            value={eventTags}
                            onChange={(e) => setEventTags(e.target.value)}
                            className="border p-2 rounded w-full mb-2"
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleCancel}
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEventAdd}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                {isEditing ? 'Update Event' : 'Add Event'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notifications */}
            <ToastContainer position="top-right" autoClose={5000} closeOnClick />
        </div>
    );
};

export default MyCalendar;
