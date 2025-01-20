// components/ContactForm.tsx
import React, { useState, useEffect } from 'react';
import { Contact } from './types';

interface ContactFormProps {
  getContacts: () => void;
  editingContact: Contact | null;
  setEditingContact: (contact: Contact | null) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ getContacts, editingContact, setEditingContact }) => {
  const [name, setName] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name);
      setMobile(editingContact.mobile);
      setEmail(editingContact.email);
    } else {
      setName('');
      setMobile('');
      
      setEmail('');
    }
  }, [editingContact]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newContact = { name, mobile, email };

    if (editingContact) {
      await fetch(`http://localhost:5001/api/contacts/${editingContact.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContact),
      });
      setEditingContact(null);
    } else {
      await fetch('http://localhost:5001/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContact),
      });
    }

    setName('');
    setMobile('');
    setEmail('');
    getContacts();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
       <div className="space-y-4">
      <input 
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Mobile"
        required
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
        {editingContact ? 'Update Contact' : 'Add Contact'}
      </button>
      </div>
    </form>
  );
};

export default ContactForm;
