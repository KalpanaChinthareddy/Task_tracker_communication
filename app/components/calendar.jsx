"use client"; // Mark this file as a Client Component

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';

const MyCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEventIndex, setCurrentEventIndex] = useState(null);
    const [eventTitle, setEventTitle] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventTags, setEventTags] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    // Check for reminders every 60 seconds
    useEffect(() => {
        const checkForReminders = () => {
            const now = new Date();

            setEvents((prevEvents) =>
                prevEvents.map((event) => {
                    const eventDateTime = new Date(`${event.date} ${event.time}`);

                    if (!event.reminded && eventDateTime <= now) {
                        // Send a reminder and mark the event as reminded
                        toast.info(`Reminder: ${event.title} at ${event.time}`);
                        return { ...event, reminded: true };
                    }
                    return event;
                })
            );
        };

        const interval = setInterval(checkForReminders, 1000 * 60); // Check every 60 seconds
        return () => clearInterval(interval);
    }, [events]);

    const handleDateClick = (value) => {
        setSelectedDate(value);
        setIsEditing(false);
        setModalOpen(true);
    };

    const handleEventAdd = () => {
        if (eventTitle && eventTime) {
            const newEvent = {
                date: selectedDate.toDateString(),
                time: eventTime,
                title: eventTitle,
                tags: eventTags.split(',').map((tag) => tag.trim()),
                reminded: false,
            };

            if (isEditing) {
                setEvents((prevEvents) => {
                    const updatedEvents = [...prevEvents];
                    updatedEvents[currentEventIndex] = newEvent;
                    return updatedEvents;
                });
                toast.success('Event updated successfully!');
            } else {
                setEvents((prevEvents) => [...prevEvents, newEvent]);
                toast.success('Event added successfully!');
            }

            handleModalClose();
        } else {
            toast.error('Please enter event title, time, and tags.');
        }
    };

    const handleEditEvent = (index) => {
        const eventToEdit = events[index];
        setEventTitle(eventToEdit.title);
        setEventTime(eventToEdit.time);
        setEventTags(eventToEdit.tags.join(', '));
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
                    tileClassName={({ date: tileDate }) =>
                        events.some((event) =>
                            format(new Date(event.date), 'yyyy-MM-dd') === format(tileDate, 'yyyy-MM-dd')
                        )
                            ? 'highlight'
                            : ''
                    }
                />
                <p className="mt-4 text-lg text-gray-700">
                    Selected Date: <strong>{date.toDateString()}</strong>
                </p>

                {/* Display events grouped by date */}
                <div className="mt-4">
                    <h2 className="text-xl font-bold">Events</h2>
                    {events.length > 0 ? (
                        events.map((event, index) => (
                            <div
                                key={index}
                                className="bg-gray-200 p-2 rounded mt-2 flex justify-between items-center"
                            >
                                <div>
                                    <strong>{event.date} - {event.time}:</strong> {event.title}
                                    {event.tags.length > 0 && (
                                        <span className="ml-2 text-sm text-gray-600">
                                            [{event.tags.join(', ')}]
                                        </span>
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
                        ))
                    ) : (
                        <p className="text-gray-500 mt-2">No events scheduled.</p>
                    )}
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
