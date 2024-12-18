import ChatList from "@/app/components/ChatList"
import Contacts from "@/app/components/Contacts"
import React from 'react';

const Chats = () => {
  return (
    <div className="main-container">
      <div className="w-1/3 max-lg:w-1/2 max-md:w-full">
        <ChatList />
      </div>
      <div className="w-2/3 max-lg:w-1/2 max-md:hidden">
        <Contacts />
      </div>
    </div>
  )
}

export default Chats