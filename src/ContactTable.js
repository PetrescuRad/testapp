import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ContactTable() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleDeleteContact = async (courriel) => {
    try {
      await axios.delete(`http://localhost:8000/contacts/${courriel}`);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Contact List</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-2 text-center">Nom</th>
            <th className="py-2 text-center">Prenom</th>
            <th className="py-2 text-center">Courriel</th>
            <th className="py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.courriel}>
              <td className="py-2 text-center">{contact.nom}</td>
              <td className="py-2 text-center">{contact.prenom}</td>
              <td className="py-2 text-center">{contact.courriel}</td>
              <td className="py-2 text-center">
                <button
                  onClick={() => handleDeleteContact(contact.courriel)}
                  className="bg-red-600 hover:bg-red-700 text-white rounded px-4 py-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );   
}

export default ContactTable;
