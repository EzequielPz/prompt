// script.js

// Variables para almacenar datos de usuarios registrados
let usuarios = [];

// Función para mostrar/ocultar contraseña
function togglePassword(idInput, idIcon) {
    const input = document.getElementById(idInput);
    const icon = document.getElementById(idIcon);
    if (input.type === "password") {
        input.type = "text";
        icon.textContent = "🙈";
    } else {
        input.type = "password";
        icon.textContent = "👁️";
    }
}

// Mostrar/Ocultar contraseña en registro
document
  .getElementById("toggleContrasena")
  .addEventListener("click", () => {
    togglePassword("contrasena", "toggleContrasena");
  });

// Mostrar/Ocultar contraseña en login
document
  .getElementById("toggleContrasenaLogin")
  .addEventListener("click", () => {
    togglePassword("contrasenaLogin", "toggleContrasenaLogin");
  });

// Mostrar formulario de registro
document
  .getElementById("mostrarLogin")
  .addEventListener("click", () => {
    document.getElementById("registro").style.display = "none";
    document.getElementById("login").style.display = "block";
  });

// Mostrar formulario de login
document
  .getElementById("mostrarRegistro")
  .addEventListener("click", () => {
    document.getElementById("login").style.display = "none";
    document.getElementById("registro").style.display = "block";
  });

// Validación de la contraseña con expresión regular
function validarContrasena(contrasena) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8}$/;
  return regex.test(contrasena);
}

// Registro de usuario
document.getElementById("registroForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const usuario = document.getElementById("nombreUsuario").value.trim();
  const email = document.getElementById("correo").value.trim();
  const contrasena = document.getElementById("contrasena").value;

  if (!validarContrasena(contrasena)) {
    alert(
      "La contraseña debe tener exactamente 8 caracteres e incluir al menos una letra mayúscula, un número y un símbolo."
    );
    return;
  }

  // Guardar usuario
  usuarios.push({ usuario, email, contrasena });
  alert("Cuenta creada con éxito");
  // Limpiar formulario
  document.getElementById("registroForm").reset();
  // Mostrar login
  document.getElementById("registro").style.display = "none";
  document.getElementById("login").style.display = "block";
});

// Inicio de sesión
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const usuario = document.getElementById("nombreUsuarioLogin").value.trim();
  const contrasena = document.getElementById("contrasenaLogin").value;

  const usuarioEncontrado = usuarios.find(
    (u) => u.usuario === usuario && u.contrasena === contrasena
  );

  if (usuarioEncontrado) {
    alert("Bienvenido, " + usuario + "!");
    // Ocultar login y mostrar menú
    document.getElementById("login").style.display = "none";
    document.getElementById("menu").style.display = "block";
    // Ocultar sección cita si estaba visible
    document.getElementById("citaMedica").style.display = "none";
    document.getElementById("resultadoCita").style.display = "none";
    // Limpiar formularios
    document.getElementById("loginForm").reset();
  } else {
    alert("Credenciales incorrectas");
  }
});

// Funciones para mostrar la sección de cita
document.getElementById("btnCita").addEventListener("click", () => {
  document.getElementById("citaMedica").style.display = "block";
  document.getElementById("resultadoCita").style.display = "none";
});

// Reportes y Ver datos (solo alertas en este ejemplo)
document.getElementById("btnReportes").addEventListener("click", () => {
  alert("Sección de reportes en desarrollo");
});
document.getElementById("btnVerDatos").addEventListener("click", () => {
  alert("Sección de datos en desarrollo");
});

// Enviar formulario de cita
document.getElementById("formCita").addEventListener("submit", function(e) {
  e.preventDefault();
  const duenio = document.getElementById("nombreDuenio").value.trim();
  const mascota = document.getElementById("nombreMascota").value.trim();
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const sintomas = document.getElementById("sintomas").value.trim();

  if (!duenio || !mascota || !fecha || !hora || !sintomas) {
    alert("Por favor, complete todos los campos");
    return;
  }

  // Mostrar datos en la sección de resultados
  document.getElementById("resDuenio").textContent = duenio;
  document.getElementById("resMascota").textContent = mascota;
  document.getElementById("resFecha").textContent = fecha;
  document.getElementById("resHora").textContent = hora;
  document.getElementById("resSintomas").textContent = sintomas;

  document.getElementById("resultadoCita").style.display = "block";

  // Generar número de ficha aleatorio
  const ficha = Math.floor(Math.random() * 1000000);
  alert(
    `Cita agendada para el ${fecha} a las ${hora}. Número de ficha: ${ficha}. Se ha enviado un email con los detalles.`
  );

  // Limpiar formulario
  document.getElementById("formCita").reset();
  // Ocultar formulario de cita
  document.getElementById("citaMedica").style.display = "none";
});