const fs = require('fs/promises');
const path = require('path');
const ObjectID = require('bson-objectid');

const contactsPath = path.join(__dirname, 'db/contacts.json');
console.log(__dirname);

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    throw new Error('It is not possible to read contacts list');
  }
};

const getContactById = async (id) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === id);
    return result || null;
  } catch (error) {
    console.error(error);
    throw new Error('It is not possible to get contact by id');
  }
};

const addContact = async (data) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: ObjectID(),
      ...data,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error(error);
    throw new Error('It is not possible to add contact');
  }
};

const removeContact = async (id) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === id);
    if (idx === -1) {
      return null;
    }
    const [result] = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('It is not possible to remove contact');
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
