const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');
const argv = require("yargs").argv;

const updateContacts = require('./updateContacts')

const contactsPath = path.resolve('./db/contacts.json');

// console.log(contactsPath)
// TODO: задокументировать каждую функцию
const list = async () => {
    try {
        const data = await fs.readFile (contactsPath);    
        const contacts = JSON.parse(data);   
        // console.log(contacts)
        return contacts;
       
    } catch (error) {
        console.log(error.message)
    }
  
};

const get = async (id)  => {
    // console.log(id)
    const contacts = await list();
    // console.log(contacts[4].id)
    const result = contacts.find(contact => contact.id === String(id));
//    console.log(result)
    if(!result) {
        return null
      }
    // console.log(result)
    return result;
 
}

const remove = async(id) => {
    const contacts = await list();
    // console.log(contacts)
    const idx = contacts.findIndex(contact => contact.id === String(id));
    console.log(id)
    if(idx === -1) {
        return null
    }

    const [remove] = contacts.splice(idx, 1)
    await updateContacts(contacts);
    return remove

}

const add = async({name, email, phone}) => {
    const contacts = await list();
    const newContact = {...{name, email, phone, id: v4()} };
    // console.log(newContact)
    contacts.push(newContact);
    await updateContacts(contacts);
    return contacts
}

const updateContact = async({id, name, email, phone}) => {
    const contacts = await list();
    const idx = contacts.findIndex(contact => contact.id === String(id));
    if(idx === -1) {
        return null
    }
    contacts[idx] = {...{name, email, phone}, id}
    await updateContacts(contacts);
    return contacts[idx];
}

module.exports = {
    list,
    get,
    remove,
    add,
    updateContact,
    
  }