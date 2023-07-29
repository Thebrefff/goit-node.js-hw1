import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");
console.log(contactsPath);

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

export const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const oneMovie = allContacts.find(({ id }) => id === contactId);
  return oneMovie || null;
};

export const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
  // return allContacts; - поверне масив з доданим контатом
};

export const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const result = allContacts.splice(index, 1)[0];
  return result;
};

export default { listContacts, getContactById, addContact, removeContact };
