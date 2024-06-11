document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', enviarFormulario);
});

function enviarFormulario() {
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const mensaje = document.getElementById('mensaje').value;

    // Validar los campos
    if (nombre === '' || correo === '' || mensaje === '') {
        swal({
            title: "Error",
            text: "Por favor, completa todos los campos.",
            icon: "error",
            button: "Cerrar"
        });
        return;
    }
    swal({
        title: "¡Gracias por tu comentario!",
        text: `${nombre}, pronto te contactaremos.`,
        icon: "success",
        button: "Cerrar"
    });
    document.getElementById('contact-form').reset();
}
