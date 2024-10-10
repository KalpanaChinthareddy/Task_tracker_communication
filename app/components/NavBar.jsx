"use client"
import Link from 'next/link';
import ProfileDropdown from './ProfileDropdown';

export default function NavBar(){
 return(
  <nav className="flex items-center justify-between p-4 bg-blue-600 text-white">
    <div className="text-lg font-bold">
      <Link href="/">Task Tracker</Link>
    </div>
    <ul className="flex space-x-6">
      <li><Link href="/dashboard">Dashboard</Link></li>
      <li><Link href="/projects">Projects</Link></li>
      <li><Link href="/tasks">Tasks</Link></li>
      <li><Link href="/calendar">Calendar</Link></li>
      <li><Link href="/reports">Reports</Link></li>
    </ul>
    <div className="flex items-center space-x-4">
      <button className="bg-transparent">🔔</button> {/* Notifications Icon */}
      <ProfileDropdown  />
    </div>
  </nav>
 );


}
