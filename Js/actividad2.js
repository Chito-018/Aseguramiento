// Variables globales
const form = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const btn = document.getElementById('btn');
const messageDiv = document.getElementById('message');
const tableBody = document.getElementById("user_table");

messageDiv.setAttribute('role', 'alert');
messageDiv.setAttribute('aria-live', 'assertive');

// Funciones de validación
function emailIsValid(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validatePassword(password) {
    const minLength = password.length >= 6;
    const hasUppercase = /[A-Z]/.test(password);

    return {
        minLength,
        hasUppercase,
        isValid: minLength && hasUppercase
    };
}

// Mostrar mensajes
function showMessage(text, type = 'info') {
    messageDiv.textContent = text;
    messageDiv.className = type;
}

// Validar formulario
function validateForm() {
    const email = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!emailIsValid(email)) {
        showMessage('Invalid email format.', 'error');
        btn.disabled = true;
        return;
    }

    const passwordCheck = validatePassword(password);

    if (!passwordCheck.minLength) {
        showMessage('Password must be at least 6 characters long.', 'error');
        btn.disabled = true;
        return;
    }

    if (!passwordCheck.hasUppercase) {
        showMessage('Password must contain at least one uppercase letter.', 'error');
        btn.disabled = true;
        return;
    }

    // Si ambos son válidos
    showMessage('Email and password look good.', 'success');
    btn.disabled = false;
}

// Eventos en tiempo real
usernameInput.addEventListener('input', validateForm);
passwordInput.addEventListener('input', validateForm);

// Guardar usuario en localStorage y validar login
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const passwordCheck = validatePassword(password);

    if (emailIsValid(username) && passwordCheck.isValid) {
        // Guardar en localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));

        showMessage('Login successful!', 'success');
        window.location.href = "html/dashboard.html";
    } else {
        showMessage('Login failed. Please try again.', 'error');
    }
});
