import { auth } from './firebase-config.js';
import { 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded'); // Debug log

    // Get form elements
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    // Debug log to check if elements are found
    console.log('Show Register Link:', showRegisterLink);
    console.log('Show Login Link:', showLoginLink);

    // Switch to registration form
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Switching to register form'); // Debug log
        loginSection.style.display = 'none';
        registerSection.style.display = 'block';
    });

    // Switch to login form
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Switching to login form'); // Debug log
        registerSection.style.display = 'none';
        loginSection.style.display = 'block';
    });

    // Login form handler
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Login attempt'); // Debug log
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const errorElement = document.getElementById('login-error');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Login error:', error);
            errorElement.textContent = 'שגיאה בהתחברות. אנא בדוק את פרטי ההתחברות שלך.';
        }
    });

    // Registration form handler
    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Registration attempt'); // Debug log
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const passwordConfirm = document.getElementById('register-password-confirm').value;
        const errorElement = document.getElementById('register-error');

        if (password !== passwordConfirm) {
            errorElement.textContent = 'הסיסמאות אינן תואמות';
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Registration error:', error);
            errorElement.textContent = 'שגיאה בהרשמה. ייתכן שהאימייל כבר קיים במערכת.';
        }
    });
});
