import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Supabase-konfiguration
const supabaseUrl = 'https://ravafoaxjvtxhyduaibu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhdmFmb2F4anZ0eGh5ZHVhaWJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNDE1MzAsImV4cCI6MjA3ODYxNzUzMH0.WS001Y0lMo8gJDt1GCMpiBrBENGiiKEahaXmi4VHuxk' // Byt ut mot din anon key
const supabase = createClient(supabaseUrl, supabaseKey)

// Registrera användare
async function registerUser(username, email, password) {
    console.log('--- Registreringsförsök ---')
    console.log('Username:', username, 'Email:', email)

    // 1️⃣ Skapa auth-användare
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

    const user = signUpData.user
    if (!user) {
        alert('SignUp misslyckades: user är null')
        return
    }

    console.log('Auth user skapad med ID:', user.id)

    // 2️⃣ Lägg till användaren i users-tabellen
    const { data: userData, error: insertError } = await supabase
        .from('users')
        .insert([{ id: user.id, username, email }])
    console.log('Insert data:', userData)
    console.log('Insert error:', insertError)

    if (insertError) {
        alert('Misslyckades att spara i users-tabellen: ' + insertError.message)
    } else {
        alert('Registrerad! Kolla din e-post för verifiering.')
    }
}

// Logga in användare
async function loginUser(email, password) {
    console.log('--- Loginförsök ---')
    console.log('Email:', email)

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    console.log('Login data:', data)
    console.log('Login error:', error)

    if (error) {
        alert('Fel inloggningsuppgifter')
    } else {
        alert('Inloggad!')
        window.location.href = 'loading.html'
    }
}

// Lägg till event listeners
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
    } else {
        console.error('registerForm finns inte!')
    }

    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault()
            const email = document.getElementById('loginEmail').value
            const pass = document.getElementById('loginPass').value
            loginUser(email, pass)
        })
    } else {
        console.error('loginForm finns inte!')
    }
})
