const path = require('path');
const fs = require('fs/promises');

const contactsPath = path.resolve('./db/contacts.json');

const updateContact = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));

}

module.exports  = updateContact;