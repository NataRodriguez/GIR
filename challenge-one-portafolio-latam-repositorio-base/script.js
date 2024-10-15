//La validación del formulário con javascript es considerada un desafío extra, no es obligatório realizar esta validación para realizar su entrega

document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.querySelector('.contacto__formulario');

    // Campo Nombre
    const nombreCampo = formulario.querySelector('input[type="text"]:nth-child(1)');
    const errorNombre = document.createElement('p');
    errorNombre.style.color = 'red';
    errorNombre.style.display = 'none';
    formulario.insertBefore(errorNombre, nombreCampo.nextSibling);

    // Campo Email
    const emailCampo = formulario.querySelector('input[type="email"]');
    const errorEmail = document.createElement('p');
    errorEmail.style.color = 'red';
    errorEmail.style.display = 'none';
    formulario.insertBefore(errorEmail, emailCampo.nextSibling);

    // Campo Asunto
    const asuntoCampo = formulario.querySelector('input[type="text"]:nth-child(3)');
    const errorAsunto = document.createElement('p');
    errorAsunto.style.color = 'red';
    errorAsunto.style.display = 'none';
    formulario.insertBefore(errorAsunto, asuntoCampo.nextSibling);

    // Campo Mensaje
    const mensajeCampo = formulario.querySelector('textarea');
    const errorMensaje = document.createElement('p');
    errorMensaje.style.color = 'red';
    errorMensaje.style.display = 'none';
    formulario.insertBefore(errorMensaje, mensajeCampo.nextSibling);

    // Validación del formulario al hacer submit
    formulario.addEventListener('submit', function (event) {
        let esValido = true;

        // Validación del campo Nombre
        if (nombreCampo.value.trim() === '') {
            errorNombre.textContent = 'El campo Nombre no puede estar vacío.';
            errorNombre.style.display = 'block';
            esValido = false;
        } else if (nombreCampo.value.length > 50) {
            errorNombre.textContent = 'El campo Nombre no puede tener más de 50 caracteres.';
            errorNombre.style.display = 'block';
            esValido = false;
        } else {
            errorNombre.style.display = 'none';
        }

        // Validación del campo Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailCampo.value.trim() === '') {
            errorEmail.textContent = 'El campo Correo Electrónico no puede estar vacío.';
            errorEmail.style.display = 'block';
            esValido = false;
        } else if (!emailRegex.test(emailCampo.value)) {
            errorEmail.textContent = 'El formato del correo electrónico es inválido.';
            errorEmail.style.display = 'block';
            esValido = false;
        } else {
            errorEmail.style.display = 'none';
        }

        // Validación del campo Asunto
        if (asuntoCampo.value.trim() === '') {
            errorAsunto.textContent = 'El campo Asunto no puede estar vacío.';
            errorAsunto.style.display = 'block';
            esValido = false;
        } else if (asuntoCampo.value.length > 100) {
            errorAsunto.textContent = 'El campo Asunto no puede tener más de 100 caracteres.';
            errorAsunto.style.display = 'block';
            esValido = false;
        } else {
            errorAsunto.style.display = 'none';
        }

        // Validación del campo Mensaje
        if (mensajeCampo.value.trim() === '') {
            errorMensaje.textContent = 'El campo Mensaje no puede estar vacío.';
            errorMensaje.style.display = 'block';
            esValido = false;
        } else if (mensajeCampo.value.length < 10) {
            errorMensaje.textContent = 'El campo Mensaje debe tener al menos 10 caracteres.';
            errorMensaje.style.display = 'block';
            esValido = false;
        } else if (mensajeCampo.value.length > 300) {
            errorMensaje.textContent = 'El campo Mensaje no puede tener más de 300 caracteres.';
            errorMensaje.style.display = 'block';
            esValido = false;
        } else {
            errorMensaje.style.display = 'none';
        }

        // Si hay algún error, prevenimos el envío del formulario
        if (!esValido) {
            event.preventDefault();
        }
    });
});
