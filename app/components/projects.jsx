'use client';

import React, { useState } from 'react';
import NavBar from '../components/NavBar';

// Card Component: Represents an individual task with details
const Card = ({ card, updateCardDetails }) => {
  const [description, setDescription] = useState(card.description || '');

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    updateCardDetails(card.id, e.target.value); // Update card details on change
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-2 w-64">
      <h4 className="font-bold">{card.title}</h4>
      <textarea
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Enter task details or notes..."
        className="block w-full h-20 p-2 border rounded mt-2 resize-none"
      />
      <input type="file" accept="image/*" onChange={(e) => console.log(e.target.files)} className="mt-2" />
    </div>
  );
};

// List Component: Represents a list of tasks (cards)
const List = ({ list, updateCardDetails, addCard }) => {
  const [newCardTitle, setNewCardTitle] = useState('');

  const handleAddCard = () => {
    addCard(list.id, newCardTitle);
    setNewCardTitle('');
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md w-80 mr-4">
      <h2 className="text-xl font-bold mb-4">{list.title}</h2>

      {/* Display Cards vertically in each list */}
      <div className="space-y-4">
        {list.cards.map((card) => (
          <Card key={card.id} card={card} updateCardDetails={updateCardDetails} />
        ))}

        {/* New Card Input */}
        <div className="w-full bg-gray-100 p-2 rounded-lg shadow">
          <input
            type="text"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            placeholder="New Card Title"
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleAddCard}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full"
          >
            Add Card
          </button>
        </div>
      </div>
    </div>
  );
};

// Board Component: Represents a board that contains lists of tasks (cards)
const Board = ({ board, updateCardDetails, addCard, addList }) => {
  const [newListTitle, setNewListTitle] = useState('');

  const handleAddList = () => {
    addList(board.id, newListTitle);
    setNewListTitle('');
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4">{board.title}</h2>

      {/* Display Lists horizontally */}
      <div className="flex overflow-x-auto">
        {board.lists.map((list) => (
          <List key={list.id} list={list} updateCardDetails={updateCardDetails} addCard={addCard} />
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
    const newBoard = {
      id: boards.length + 1,
      title: newBoardTitle,
      lists: [],
    };
    setBoards([...boards, newBoard]);
    setNewBoardTitle('');
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

  const addCard = (listId, cardTitle) => {
    setBoards(
      boards.map((board) => ({
        ...board,
        lists: board.lists.map((list) =>
          list.id === listId
            ? { ...list, cards: [...list.cards, { id: list.cards.length + 1, title: cardTitle, description: '' }] }
            : list
        ),
      }))
    );
  };

  const updateCardDetails = (cardId, description) => {
    setBoards(
      boards.map((board) => ({
        ...board,
        lists: board.lists.map((list) => ({
          ...list,
          cards: list.cards.map((card) =>
            card.id === cardId ? { ...card, description } : card
          ),
        })),
      }))
    );
  };

  return (
    <div>
      <NavBar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Projects</h1>

        {/* Board Creation Form */}
        <div className="mb-6">
          <input
            type="text"
            value={newBoardTitle}
            onChange={(e) => setNewBoardTitle(e.target.value)}
            placeholder="Enter Board Name"
            className="border p-2 rounded w-1/2"
          />
          <button
            onClick={handleAddBoard}
            className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
          >
            Create Board
          </button>
        </div>

        {/* Display boards */}
        <div className="flex flex-wrap">
          {boards.map((board) => (
            <Board
              key={board.id}
              board={board}
              updateCardDetails={updateCardDetails}
              addCard={addCard}
              addList={addList}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
