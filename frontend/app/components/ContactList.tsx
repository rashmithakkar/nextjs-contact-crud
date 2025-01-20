// components/ContactList.tsx
import React from 'react';
import { Contact } from './types';

interface ContactListProps {
  contacts: Contact[];
  getContacts: () => void;
  handleEditContact: (contact: Contact) => void;
  handleDeleteContact: (id: number) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, handleEditContact, handleDeleteContact }) => {
  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="space-x-4">
          <span className="font-medium">{contact.name}</span> 
           <span className="text-gray-600">{contact.mobile}</span> 
            <span className="text-gray-600">{contact.email}</span>
            </div>
            <div className="space-x-4">
          <button onClick={() => handleEditContact(contact)}
            className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">Edit</button>
          <button onClick={() => handleDeleteContact(contact.id)}
            className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors">Delete</button>
            </div>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
