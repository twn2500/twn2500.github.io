import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://ravafoaxjvtxhyduaibu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhdmFmb2F4anZ0eGh5ZHVhaWJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNDE1MzAsImV4cCI6MjA3ODYxNzUzMH0.WS001Y0lMo8gJDt1GCMpiBrBENGiiKEahaXmi4VHuxk'
const supabase = createClient(supabaseUrl, supabaseKey)

// Registrera användare
async function registerUser(username, email, password) {
    console.log('--- Registreringsförsök ---')
    console.log('Username:', username, 'Email:', email)

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username } } // sparas som user_metadata
    })

    console.log('SignUpData:', signUpData)
    console.log('SignUpError:', signUpError)

    if (signUpError) {
        alert('Registrering misslyckades: ' + signUpError.message)
        return
    }

    alert('Registrering lyckades! Kontrollera din e-post för verifiering. Därefter kan du logga in.')

    document.getElementById('regUsername').value = ''
    document.getElementById('regEmail').value = ''
    document.getElementById('regPass').value = ''
}

// --- Logga in användare ---
async function loginUser(email, password) {
    console.log('--- Loginförsök ---')
    console.log('Email:', email)

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    console.log('Login data:', data)
    console.log('Login error:', error)

    if (error) {
        alert('Fel inloggningsuppgifter eller e-post inte verifierad')
        return
    }

    const user = data.user
    if (!user) {
        alert('Inloggning misslyckades: user är null')
        return
    }

    console.log('Inloggad user ID:', user.id)

    // --- Lägg till användaren i users-tabellen (om inte redan finns) ---
    const { data: existingUsers, error: selectError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)

if (selectError) {
    console.error('Fel vid kontroll av existing user:', selectError)
} else if (existingUsers.length === 0) {
    // Insert eftersom användaren inte finns
    const { data: userData, error: insertError } = await supabase
        .from('users')
        .insert([{ id: user.id, username: user.user_metadata.username, email: user.email }])

    if (insertError) {
        console.error('Insert error:', insertError)
        alert('Misslyckades att spara användare i databasen: ' + insertError.message)
    } else {
        console.log('User sparad i tabell:', userData)
    }
} else {
    console.log('User finns redan i tabellen, inget insert görs')
}


    alert('Inloggad!')
    window.location.href = 'sidan.html' // Byt till din sida
}

// --- Event listeners ---
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm')
    const loginForm = document.getElementById('loginForm')

    if (registerForm) {
        registerForm.addEventListener('submit', e => {
            e.preventDefault()
            const username = document.getElementById('regUsername').value
            const email = document.getElementById('regEmail').value
            const pass = document.getElementById('regPass').value
            registerUser(username, email, pass)
        })
    } else console.error('registerForm finns inte!')

    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault()
            const email = document.getElementById('loginEmail').value
            const pass = document.getElementById('loginPass').value
            loginUser(email, pass)
        })
    } else console.error('loginForm finns inte!')
})
