// Obtener elementos del DOM
const messageForm = document.getElementById('message-form');
const nameInput = document.getElementById('name-input');
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');

// Array para almacenar los mensajes
let messages;

// Función para mostrar los mensajes en pantalla
function displayMessages() {
    // Vaciar contenedor de mensajes antes de actualizarlo
    messageContainer.innerHTML = '';

    // Recorrer el array de mensajes y crear elementos HTML para cada uno
    messages.forEach((message) => {
        const divMessage = document.createElement("div");
        divMessage.classList.add("message");

        const spanName = document.createElement("span");
        spanName.classList.add("name");
        spanName.textContent = `${message.name}: `;

        const spanText = document.createTextNode(message.text);

        divMessage.appendChild(spanName);
        divMessage.appendChild(spanText);

		// Crear botones para editar y eliminar mensaje		
		const editButton=	document.createElement("button");			
		editButton.textContent="Editar";
		
		const deleteButton=document.createElement("button");			
		deleteButton.textContent="Eliminar";	
		
	    editButton.addEventListener('click', () => {				
			let newText=prompt(`Editar mensaje "${spanText.nodeValue}"`);			
			if (newText) {
				message.text=newText;
				displayMessages();
			}				
		});
		
	    deleteButton.addEventListener('click', () => {							
			let index=messages.indexOf(message);
			messages.splice(index,1);
	        displayMessages();	
	    });
		
        divMessage.appendChild(editButton);		
        divMessage.appendChild(deleteButton);

        messageContainer.appendChild(divMessage);
    });
}

// Función para guardar los mensajes en el localStorage
function saveMessages() {
    localStorage.setItem('messages', JSON.stringify(messages));
}

// Función para cargar los mensajes del localStorage
function loadMessages() {
    const storedMessages = localStorage.getItem('messages');
  
  	// Si no hay mensajes almacenados, crea un array vacío
    messages = storedMessages ? JSON.parse(storedMessages) : [];
}

// Función para guardar un mensaje en el array y mostrarlo
function addMessage(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const text = messageInput.value.trim();

    if (name && text) {
        const newMessage = {
            name: name,
            text: text
        };

        messages.push(newMessage);

        // Limpiar los campos del formulario después de enviar el mensaje
        nameInput.value = '';
      	messageInput.value='';

      	displayMessages();
      	saveMessages();
   }
}

// Evento para enviar el mensaje al hacer clic en "Enviar"
messageForm.addEventListener('submit', addMessage);

// Cargar los mensajes almacenados al cargar la página
loadMessages();
displayMessages();
