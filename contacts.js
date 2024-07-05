const fs = require('fs').promises;
const path = require('path');

// Calea către fișierul contacts.json
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// Funcție pentru a citi toate contactele
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading contacts file:', error);
    return [];
  }
}

// Funcție pentru a adăuga un nou contact
async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: String(Date.now()), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf8');
    return newContact;
  } catch (error) {
    console.error('Error writing to contacts file:', error);
  }
}

// Funcție pentru a șterge un contact după ID
async function removeContact(id) {
  try {
    let contacts = await listContacts();
    contacts = contacts.filter(contact => contact.id !== id);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf8');
    return contacts;
  } catch (error) {
    console.error('Error writing to contacts file:', error);
  }
}

// Funcție pentru a găsi un contact după ID
async function getContactById(id) {
  try {
    const contacts = await listContacts();
    return contacts.find(contact => contact.id === id);
  } catch (error) {
    console.error('Error reading contacts file:', error);
  }
}

// Exportarea funcțiilor
module.exports = {
  listContacts,
  addContact,
  removeContact,
  getContactById
};
