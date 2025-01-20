import ContactManager from "./components/Contact";

async function getContacts() {
  try {
    const response = await fetch('http://localhost:5001/api/contacts', { 
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Failed to fetch contacts:', error);
    return []; // Return empty array as fallback
  }
}

export default async function Home() {
  const initialContacts = await getContacts();

  return (
    <div>
      <ContactManager initialContacts={initialContacts} />
    </div>
  );
}
