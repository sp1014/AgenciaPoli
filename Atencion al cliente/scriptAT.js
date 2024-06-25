function validarFormulario(event) {
    const nombre = document.getElementById('nombre');
    const CC = document.getElementById('CC');
    const correo = document.getElementById('correo');
    const mensaje = document.getElementById('mensaje');
    
    // Validar que todos los campos requeridos estén llenos
    if (nombre.value.trim() === '' || 
        CC.value.trim() === '' ||
        correo.value.trim() === '' ||
        mensaje.value.trim() === '') 
    {
        alert('Por favor Verifique que no queden espacios en blanco.');
        event.preventDefault(); // Evitar que el mensaje se envíe
        return false;
    }
    
    // Mostrar ventana de confirmación
    if (confirm('¿Está seguro de que deseas radicar el mensaje?')) {
        // Si el usuario confirma, el mensaje se enviará
        return true;
    } else {
        // Si el usuario cancela, se previene el envío del mensaje
        event.preventDefault();
        return false;
    }
}


