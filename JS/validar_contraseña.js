document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formContra");
    const nuevaContra = document.getElementById("nuevaContra");
    const confirmarContra = document.getElementById("confirmarContra");
    const mensaje = document.getElementById("mensaje");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // evita envío si no pasa la validación

        const password = nuevaContra.value.trim();
        const confirm = confirmarContra.value.trim();

        const resultado = validarPassword(password, confirm);

        if (!resultado.valida) {
            mensaje.innerHTML = `<div style="color:red">${resultado.mensaje}</div>`;
        } else {
            mensaje.innerHTML = `<div style="color:green">Contraseña segura y coincidente</div>`;
            form.submit(); // envía el formulario si pasa la validación
        }
    });
});

/**
 * Valida la seguridad de una contraseña según reglas estándar
 * @param {string} pass - contraseña
 * @param {string} confirm - confirmación de contraseña
 * @returns {object} objeto con propiedades {valida, mensaje}
 */
function validarPassword(pass, confirm) {
    const minLength = 8;
    const regexMayus = /[A-Z]/;
    const regexMinus = /[a-z]/;
    const regexNumero = /[0-9]/;
    const regexEspecial = /[!@#$%^&*(),.?":{}|<>]/;

    if (pass.length < minLength) {
        return { valida: false, mensaje: "La contraseña debe tener al menos 8 caracteres." };
    }
    if (!regexMayus.test(pass)) {
        return { valida: false, mensaje: "Debe contener al menos una letra mayúscula." };
    }
    if (!regexMinus.test(pass)) {
        return { valida: false, mensaje: "Debe contener al menos una letra minúscula." };
    }
    if (!regexNumero.test(pass)) {
        return { valida: false, mensaje: "Debe contener al menos un número." };
    }
    if (!regexEspecial.test(pass)) {
        return { valida: false, mensaje: "Debe contener al menos un carácter especial como: !/&%$#" };
    }
    if (pass !== confirm) {
        return { valida: false, mensaje: "Las contraseñas no coinciden." };
    }

    return { valida: true, mensaje: "Contraseña válida." };
}
