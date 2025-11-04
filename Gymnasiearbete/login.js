document.addEventListener('DOMContentLoaded', function() {
    // 1. Hämta formuläret från DOM:en
    const loginForm = document.querySelector('form');

    // 2. Kontrollera att formuläret hittades
    if (loginForm) {
        // 3. Lägg till en händelselyssnare för "submit"
        loginForm.addEventListener('submit', handleLogin);
    }
});

/**
 * Funktion som hanterar inloggningsförsöket
 * @param {Event} event - Standard event-objektet för formulärinlämning
 */
function handleLogin(event) {
    // Förhindra standardformulärinlämningen/sidoomladdningen
    event.preventDefault(); 

    // Hämta inputfälten med deras id
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Hämta värdena från inputfälten
    const username = usernameInput.value;
    const password = passwordInput.value;

    // --- ENKEL VALIDERINGSLOGIK (INTE SÄKERT!) ---
    // I en riktig applikation skulle du skicka dessa värden till en server
    // (t.ex. via en AJAX-förfrågan) för att verifiera dem mot en databas.
    
    const validUsername = 'admin';
    const validPassword = '1234';

    if (username === validUsername && password === validPassword) {
        // Lyckad inloggning
        <a href="sida.html"></a>
        // Här kan du omdirigera användaren: window.location.href = 'startsida.html';
    } else {
        // Misslyckad inloggning
        alert('Inloggning misslyckades. Kontrollera ditt användarnamn och lösenord.');
        // Valfritt: Rensa lösenordsfältet vid misslyckande
        passwordInput.value = ''; 
    }
}