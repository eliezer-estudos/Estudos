document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Verifica se os campos estão preenchidos
            if (!name || !email || !message) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            const contact = { name, email, message };

            // Recupera contatos existentes ou cria um array vazio
            const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');

            contacts.push(contact);
            localStorage.setItem('contacts', JSON.stringify(contacts));

            alert('Contato armazenado com sucesso!');
            form.reset();
        });
    }

    const contactList = document.getElementById('contact-list');

    if (contactList) {
        const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');

        if (contacts.length === 0) {
            contactList.innerHTML = '<li>Nenhum contato encontrado.</li>';
        } else {
            contacts.forEach((contact, index) => {
                const li = document.createElement('li');
                li.innerHTML = `${contact.name} - ${contact.email} - ${contact.message}
                    <button onclick="removeContact(${index})">Remover</button>`;
                contactList.appendChild(li);
            });
        }
    }
});

// Função para remover contatos
function removeContact(index) {
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    location.reload(); // Recarrega a página para atualizar a lista
}
