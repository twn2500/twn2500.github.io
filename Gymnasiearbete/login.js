import { createClient } from 'https://esm.sh/@supabase/supabase-js@2' // Importerar SupaBase in till vscode

// API nycklarna
const supabaseUrl = 'https://ravafoaxjvtxhyduaibu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhdmFmb2F4anZ0eGh5ZHVhaWJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNDE1MzAsImV4cCI6MjA3ODYxNzUzMH0.WS001Y0lMo8gJDt1GCMpiBrBENGiiKEahaXmi4VHuxk'
const supabase = createClient(supabaseUrl, supabaseKey)

//Registeringen
async function registerUser(username, email, password) {
    console.log("Försöker registrera:", email); 

    // Skapar kontot i supabse auth
    const { data, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: { username: username } 
        }
    });

    if (authError) {
        console.error("Fel vid registrering:", authError.message);
        alert('Registrering misslyckades: ' + authError.message);
        return;
    }

    const user = data.user;
    if (!user) {
        alert('Något gick fel, ingen användare skapades.');
        return;
    }

    // Skapar profilraden
    // OBS: Se till att tabellen 'users' har en kolumn 'id' som är UUID
    const { error: dbError } = await supabase
        .from('users')
        .insert([
            {
                id: user.id, // Kopplar ihop auth kontot med tabellrad
                username: username,
                email: email
            }
        ]);

    if (dbError) {
        console.error("Kunde inte spara i tabellen 'users':", dbError.message);
        alert('Konto skapat, men profilinfo kunde inte sparas. Kolla dina RLS-inställningar i Supabase!');
    } else {
        alert('Registrering lyckades! Kontrollera din e-post för bekräftelse (om aktiverat).');
        document.getElementById('registerForm').reset();
    }
}

// =====================================================
// INLOGGNING
// =====================================================
async function loginUser(email, password) {
    console.log("Försöker logga in:", email);

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        console.error("Inloggningsfel:", error.message);
        alert('Inloggning misslyckades: ' + error.message);
        return;
    }

    if (data.user) {
        alert('Inloggad!');
        window.location.href = 'klocka.html';
    }
}

// =====================================================
// EVENT LISTENERS
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('regUsername').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPass').value;
            await registerUser(username, email, password);
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPass').value;
            await loginUser(email, password);
        });
    }
});