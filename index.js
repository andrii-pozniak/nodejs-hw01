const argv = require("yargs").argv;const contactsOptions = require("./contacts")

const invokeAction = async({ action, id, name, email, phone } ) => {
    // console.log(contactsOptions)
  switch (action) {
    case "list":
      const contacts = await contactsOptions.list();
       contacts.map(contact => {
        return {
            name: "name",
            email: "email",
            phone: "phone"
        }
        
      })
      console.table(contacts)

      break;

    case "get":
       
      const contactId = await  contactsOptions.get(id);
    //   console.log(contactId)
      if(!contactId) {
        throw new Error(`Contacts with id = "${id}" not found`)
      }
      break;

    case "add":
        console.log(action)
       const {name, email, phone} = argv
     const newContact = await contactsOptions.add({name, email, phone});
     console.log(newContact)
      break;

    case "remove":
      const remove = await contactsOptions.remove(id);
      console.log(remove);
      break;
      case "updateContact":
        const updateContact = await contactsOptions.updateContact(id, argv);
        // console.log(updateContact);
        if(!updateContact) {
            throw new Error(`Contacts with id = ${id} not found`)
          }
        break;

    default:
     console.warn("\x1B[31m Unknown action type!");
     
  }
}


invokeAction(argv);
