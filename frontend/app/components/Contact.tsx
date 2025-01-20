'use client';

import React, { useState } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import { Contact } from './types';

interface ContactManagerProps {
  initialContacts: Contact[];
}

export default function ContactManager({ initialContacts }: ContactManagerProps) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const getContacts = async () => {
    const response = await fetch('http://localhost:5001/api/contacts');
    const data = await response.json();
    setContacts(data);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
  };

  const handleDeleteContact = async (id: number) => {
    await fetch(`http://localhost:5001/api/contacts/${id}`, { method: 'DELETE' });
    getContacts();
  };

  return (
    <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-red-500 text-center">Contact Manager</h1>
        <div className="space-y-6">
      <ContactForm
        getContacts={getContacts}
        editingContact={editingContact}
        setEditingContact={setEditingContact}
      />
      <ContactList
        contacts={contacts}
        getContacts={getContacts}
        handleEditContact={handleEditContact}
        handleDeleteContact={handleDeleteContact}
      />
      </div>
    </div>
  );
}