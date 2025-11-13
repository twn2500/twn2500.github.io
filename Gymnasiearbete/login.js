import { createClient } from 'https://esm.sh@supabase/supabase-js@2'

// Din Supabase URL och anon key
const supabaseUrl = 'https://ravafoaxjvtxhyduaibu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhdmFmb2F4anZ0eGh5ZHVhaWJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNDE1MzAsImV4cCI6MjA3ODYxNzUzMH0.WS001Y0lMo8gJDt1GCMpiBrBENGiiKEahaXmi4VHuxk'  // Byt ut mot din anon key
const supabase = createClient(supabaseUrl, supabaseKey)

// Registrera användare
async function registerUser(username, email, password) {
    console.log('Försöker registrera:', username, email)

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username } }
    })

    if (signUpError) {
        console.error('SignUp error:', signUpError)
        alert('Registrering misslyckades: ' + signUpError.message)
        return
    }

    const user = signUpData.user
    if (!user) {
        alert('Något gick fel, användaren skapades inte.')
        return
    }

    console.log('Auth user skapad:', user.id)

    // Lägg till användaren i users-tabellen
    const { data: userData, error: insertError } = await supabase
        .from('users')
        .insert([{ id: user.id, username, email }])

    if (insertError) {
        console.error('Insert error:', insertError)
        alert('Registrering misslyckades vid databasinlägg: ' + insertError.message)
    } else {
        console.log('User sparad i tabell:', userData)
        alert('Registrerad! Kolla din e-post för verifiering.')
    }
}

// Logga in användare
async function loginUser(email, password) {
    console.log('Försöker logga in:', email)

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
        console.error('Login error:', error)
        alert('Fel inloggningsuppgifter')
    } else {
        console.log('Inloggad user:', data.user)
        alert('Inloggad!')
        window.location.href = 'loading.html'  // Se till att denna fil finns
    }
}

// Lägg till event listeners när DOM är klar
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
        console.error('registerForm finns inte i DOM!')
    }

    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault()
            const email = document.getElementById('loginEmail').value
            const pass = document.getElementById('loginPass').value
            loginUser(email, pass)
        })
    } else {
        console.error('loginForm finns inte i DOM!')
    }
})
