import {createClient} from 'https://esm.sh/@supabase/supabase-js@2'
const SupaBaseURL = 'https://ravafoaxjvtxhyduaibu.supabase.co'
const SupaBaseNyckel = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhdmFmb2F4anZ0eGh5ZHVhaWJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNDE1MzAsImV4cCI6MjA3ODYxNzUzMH0.WS001Y0lMo8gJDt1GCMpiBrBENGiiKEahaXmi4VHuxk'
const SupaBase = createClient(SupaBaseURL, SupaBaseNyckel)

const loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const AnvändarNamn = document.getElementById('loginAnvändarNamn').value + "@app.se";
    const Lösenord = document.getElementById('loginLösenord').value;

    const { data, error } = await SupaBase.auth.signInWithPassword({
        email: AnvändarNamn,
        password: Lösenord
    });

    if (error) {
        alert("Inloggningen misslyckades: " + error.message)
    } else {
        alert("Välkommen till min sida")
        window.location.href = 'hub.html';
    }
})