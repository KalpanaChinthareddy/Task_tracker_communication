'use client';

import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi'; // Icons for menu and delete button
import NavBar from '../components/NavBar';

// Card Component: Represents an individual task with details (no title, file upload displays images)
const Card = ({ card, updateCardDetails, deleteCard }) => {
  const [description, setDescription] = useState(card.description || '');
  const [files, setFiles] = useState([]); // Use array for multiple files

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    updateCardDetails(card.id, e.target.value, files); // Update card details
  };

  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);

    // No need to modify the description, just store the files
    updateCardDetails(card.id, description, [...files, ...uploadedFiles]);
  };

  const removeFile = (fileToRemove) => {
    const updatedFiles = files.filter(file => file !== fileToRemove);
    setFiles(updatedFiles);
    updateCardDetails(card.id, description, updatedFiles); // Update after file removal
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-2 w-64 relative">
      {/* Delete (X) Button for the Card */}
      <div className="flex justify-end mb-2">
        <button onClick={() => deleteCard(card.id)} className="text-red-500">
          <FiX className="w-6 h-6" />
        </button>
      </div>

      {/* Task Details (Description) */}
      <textarea
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Enter task details or notes..."
        className="block w-full h-20 p-2 border rounded mt-2 resize-none"
        style={{ height: files.length ? 'auto' : '5rem' }} // Dynamic height based on files
      />

      {/* Display uploaded images inside the task details section with scrollbar */}
      <div className="mt-2 max-h-40 overflow-y-auto">
        {files.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {files.map((file, index) => (
              <div key={index} className="relative w-20 h-20">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />
                <button
                  className="absolute top-0 right-0 text-red-500"
                  onClick={() => removeFile(file)}
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* File Upload (Multiple) */}
      <div className="mt-2">
        <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
          Upload Files
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            multiple // Allow multiple uploads
          />
        </label>
      </div>
    </div>
  );
};

// List Component: Represents a list of tasks (cards)
const List = ({ list, updateCardDetails, addCard, deleteList, deleteCard }) => {
  const handleAddCard = () => {
    addCard(list.id); // Add card without title
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md w-80 mr-4 relative">
      {/* List Title with Delete (X) Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{list.title}</h2>
        <button onClick={() => deleteList(list.id)} className="text-red-500">
          <FiX className="w-6 h-6" />
        </button>
      </div>

      {/* Display Cards vertically in each list */}
      <div className="space-y-4">
        {list.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            updateCardDetails={updateCardDetails}
            deleteCard={deleteCard}
          />
        ))}

        {/* New Card Button */}
        <div className="w-full bg-gray-100 p-2 rounded-lg shadow">
          <button
            onClick={handleAddCard}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Add Card
          </button>
        </div>
      </div>
    </div>
  );
};

// Board Component: Represents a board that contains lists of tasks (cards)
const Board = ({ board, updateCardDetails, addCard, addList, deleteBoard, deleteList, deleteCard }) => {
  const [newListTitle, setNewListTitle] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAddList = () => {
    if (newListTitle.trim()) {
      addList(board.id, newListTitle);
      setNewListTitle('');
    }
  };

  const handleShare = () => {
    const shareableLink = `https://shareboard.com/${board.id}`;
    alert(`Share this board using the link: ${shareableLink}`);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">{board.title}</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleShare}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Share
          </button>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              {/* Three-line Hamburger Icon */}
              <FiMenu className="w-6 h-6" />
            </button>
            {showDropdown && (
              <ul className="absolute right-0 bg-white shadow-lg rounded mt-2 p-2">
                <li className="p-2 hover:bg-gray-200 cursor-pointer">Add</li>
                <li
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => deleteBoard(board.id)}
                >
                  Delete
                </li>
                <li className="p-2 hover:bg-gray-200 cursor-pointer">Archive</li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Display Lists horizontally */}
      <div className="flex overflow-x-auto">
        {board.lists.map((list) => (
          <List
            key={list.id}
            list={list}
            updateCardDetails={updateCardDetails}
            addCard={addCard}
            deleteList={deleteList}
            deleteCard={deleteCard}
          />
        ))}

        {/* New List Input */}
        <div className="w-80 bg-gray-100 p-4 rounded-lg shadow">
          <input
            type="text"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            placeholder="New List Title"
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleAddList}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2 w-full"
          >
            Add List
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Projects Component
export default function Projects() {
  const [boards, setBoards] = useState([]); // Store boards
  const [newBoardTitle, setNewBoardTitle] = useState('');

  const handleAddBoard = () => {
    if (newBoardTitle.trim()) {
      const newBoard = {
        id: boards.length + 1,
        title: newBoardTitle,
        lists: [],
      };
      setBoards([...boards, newBoard]);
      setNewBoardTitle('');
    }
  };

  const addList = (boardId, listTitle) => {
    setBoards(
      boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              lists: [...board.lists, { id: board.lists.length + 1, title: listTitle, cards: [] }],
            }
          : board
      )
    );
  };

  const addCard = (listId) => {
    setBoards(
      boards.map((board) => ({
        ...board,
        lists: board.lists.map((list) =>
          list.id === listId
            ? { ...list, cards: [...list.cards, { id: list.cards.length + 1, description: '' }] }
            : list
        ),
      }))
    );
  };

  const updateCardDetails = (cardId, description, files) => {
    setBoards(
      boards.map((board) => ({
        ...board,
        lists: board.lists.map((list) => ({
          ...list,
          cards: list.cards.map((card) =>
            card.id === cardId ? { ...card, description, files } : card
          ),
        })),
      }))
    );
  };

  const deleteCard = (cardId) => {
    setBoards(
      boards.map((board) => ({
        ...board,
        lists: board.lists.map((list) => ({
          ...list,
          cards: list.cards.filter((card) => card.id !== cardId),
        })),
      }))
    );
  };

  const deleteList = (listId) => {
    setBoards(
      boards.map((board) => ({
        ...board,
        lists: board.lists.filter((list) => list.id !== listId),
      }))
    );
  };

  const deleteBoard = (boardId) => {
    setBoards(boards.filter((board) => board.id !== boardId));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <NavBar />

      {/* Main Content */}
      <h1 className="text-4xl font-bold mb-6">Project Boards</h1>

      {/* Add new board */}
      <div className="mb-6">
        <input
          type="text"
          value={newBoardTitle}
          onChange={(e) => setNewBoardTitle(e.target.value)}
          placeholder="New Board Title"
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={handleAddBoard}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Add Board
        </button>
      </div>

      {/* Display Boards */}
      <div className="space-y-6">
        {boards.map((board) => (
          <Board
            key={board.id}
            board={board}
            updateCardDetails={updateCardDetails}
            addCard={addCard}
            addList={addList}
            deleteBoard={deleteBoard}
            deleteList={deleteList}
            deleteCard={deleteCard}
          />
        ))}
      </div>
    </div>
  );
}
