"use client"; // Directive for Next.js indicating this component runs on the client-side

import { useSession } from "next-auth/react"; // Import hook to manage authentication session
import { useEffect, useState } from "react"; // React hooks for managing state and lifecycle
import Loader from "./Loader"; // Loader component to show while data is being fetched
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material"; // Icons for UI
import { useRouter } from "next/navigation"; // Router hook to navigate between pages

const Contacts = () => {
  // Local state for loading, contacts, and search input
  const [loading, setLoading] = useState(true); 
  const [contacts, setContacts] = useState([]); 
  const [search, setSearch] = useState("");

  // Retrieve the authenticated session for the current user
  const { data: session } = useSession();
  const currentUser = session?.user; // Get the current user from the session

  // Function to fetch contacts from the API, filtered by search or all contacts
  const getContacts = async () => {
    try {
      const res = await fetch(
        search !== "" ? `/api/users/searchContact/${search}` : "/api/users"
      );
      const data = await res.json();
      // Filter out the current user from the contact list
      setContacts(data.filter((contact) => contact._id !== currentUser._id));
      setLoading(false); // Set loading to false once data is fetched
    } catch (err) {
      console.log(err); // Log any errors that occur
    }
  };

  // Trigger getContacts when currentUser or search input changes
  useEffect(() => {
    if (currentUser) getContacts();
  }, [currentUser, search]);

  /* STATE FOR SELECTED CONTACTS AND GROUP */
  const [selectedContacts, setSelectedContacts] = useState([]); // State for selected contacts
  const isGroup = selectedContacts.length > 1; // Determine if more than one contact is selected (for group chat)

  // Function to handle selecting or deselecting contacts
  const handleSelect = (contact) => {
    if (selectedContacts.includes(contact)) {
      setSelectedContacts((prevSelectedContacts) =>
        prevSelectedContacts.filter((item) => item !== contact)
      );
    } else {
      setSelectedContacts((prevSelectedContacts) => [
        ...prevSelectedContacts,
        contact,
      ]);
    }
  };

  /* STATE FOR GROUP CHAT NAME */
  const [name, setName] = useState(""); // State for the group chat name

  const router = useRouter(); // Next.js router for navigation

  /* CREATE NEW CHAT */
  const createChat = async () => {
    const res = await fetch("/api/chats", {
      method: "POST", // POST method to create a new chat
      body: JSON.stringify({
        members: selectedContacts.map((contact) => contact._id), // Include selected contact IDs
        isGroup, // Determine if it’s a group chat
        name, // Set the group name
      }),
    });
    const chat = await res.json();

    // Redirect to the new chat if the request is successful
    if (res.ok) {
      router.push(`/chats/${chat._id}`);
    }
  };

  // Display a loader while data is being fetched, otherwise display the contacts and chat creation UI
  return loading ? (
    <Loader /> // Show Loader if still loading
  ) : (
    <div className="create-chat-container">
      {/* Search bar for contacts */}
      <input
        placeholder="Search contact..."
        className="input-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="contact-bar">
        {/* Contact list for selecting users */}
        <div className="contact-list">
          <p className="text-body-bold">Select or Deselect</p>

          {/* Display list of contacts */}
          <div className="flex flex-col flex-1 gap-5 overflow-y-scroll custom-scrollbar">
            {contacts.map((user, index) => (
              <div
                key={index}
                className="contact"
                onClick={() => handleSelect(user)} // Toggle contact selection
              >
                {/* Show selected or unselected icon */}
                {selectedContacts.find((item) => item === user) ? (
                  <CheckCircle sx={{ color: "red" }} />
                ) : (
                  <RadioButtonUnchecked />
                )}
                {/* User profile image and name */}
                <img
                  src={user.profileImage || "/assets/person.jpg"}
                  alt="profile"
                  className="profilePhoto"
                />
                <p className="text-base-bold">{user.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Create chat section */}
        <div className="create-chat">
          {/* Display group name input if multiple contacts are selected */}
          {isGroup && (
            <>
              <div className="flex flex-col gap-3">
                <p className="text-body-bold">Group Chat Name</p>
                <input
                  placeholder="Enter group chat name..."
                  className="input-group-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Display selected members */}
              <div className="flex flex-col gap-3">
                <p className="text-body-bold">Members</p>
                <div className="flex flex-wrap gap-3">
                  {selectedContacts.map((contact, index) => (
                    <p className="selected-contact" key={index}>
                      {contact.name}
                    </p>
                  ))}
                </div>
              </div>
            </>
          )}
          {/* Button to create a new chat or group chat */}
          <button
            className="btn"
            onClick={createChat}
            disabled={selectedContacts.length === 0} // Disable if no contacts are selected
          >
            FIND OR START A NEW CHAT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
