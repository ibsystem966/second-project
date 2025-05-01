 // Load contacts from localStorage on page load
 document.addEventListener('DOMContentLoaded', loadContacts);

 function addContact() {
     const name = document.getElementById('name').value.trim();
     const phone = document.getElementById('phone').value.trim();
     const email = document.getElementById('email').value.trim();

     if (!name || !phone || !email) {
         alert('Please fill in all fields');
         return;
     }

     const contact = { id: Date.now(), name, phone, email };
     let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
     contacts.push(contact);
     localStorage.setItem('contacts', JSON.stringify(contacts));

     // Clear form
     document.getElementById('name').value = '';
     document.getElementById('phone').value = '';
     document.getElementById('email').value = '';

     // Reload contacts
     loadContacts();
 }

 function loadContacts() {
     const contactList = document.getElementById('contactList');
     contactList.innerHTML = '';
     const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');

     contacts.forEach(contact => {
         const li = document.createElement('li');
         li.className = 'py-2 flex justify-between items-center';
         li.innerHTML = `
             <div>
                 <p class="font-semibold">${contact.name}</p>
                 <p class="text-sm text-gray-600">${contact.phone}</p>
                 <p class="text-sm text-gray-600">${contact.email}</p>
             </div>
             <button onclick="deleteContact(${contact.id})" class="text-red-500 hover:text-red-700">Delete</button>
         `;
         contactList.appendChild(li);
     });
 }

 function deleteContact(id) {
     let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
     contacts = contacts.filter(contact => contact.id !== id);
     localStorage.setItem('contacts', JSON.stringify(contacts));
     loadContacts();
 }


