"use client"
import { useState } from 'react';
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const ProfileDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {data: session} = useSession();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button onClick={handleToggle} className="bg-transparent focus:outline-none">
        👤 {/* Profile Icon */}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
          <div className="p-4">
            <p className="text-black font-bold">{session?.user?.name}</p>
            <p className="text-sm text-gray-600">{session?.user?.email}</p>
          </div>
          <hr />
          <button
            className="w-full text-left p-2 text-red-600 hover:bg-gray-100 rounded-b-md"
            onClick = {()=>signOut()}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
