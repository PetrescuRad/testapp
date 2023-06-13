import React, { useState } from 'react';
import axios from 'axios';
import ContactTable from './ContactTable';

function App() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [courriel, setCourriel] = useState('');

  const handleAddContact = async () => {
    try {
      await axios.post('http://localhost:8000/contacts', { nom, prenom, courriel });
      setNom('');
      setPrenom('');
      setCourriel('');
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Management</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
        <h2 className="text-xl font-bold mb-4">Add Contact</h2>
        <div className="mb-4">
          <label className="block mb-2">Nom:</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Prenom:</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Courriel:</label>
          <input
            type="email"
            value={courriel}
            onChange={(e) => setCourriel(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleAddContact}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
        >
          Add Contact
        </button>
      </div>
      <ContactTable />
    </div>
  );  
}

export default App;
