import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// =====================================================
// KONFIGURATION
// =====================================================
const supabaseUrl = 'https://ravafoaxjvtxhyduaibu.supabase.co'
const supabaseKey = 'DIN_ANON_KEY_HÄR'
const supabase = createClient(supabaseUrl, supabaseKey)


// =====================================================
// REGISTRERING
// =====================================================
async function registerUser(username, email, password) {

    if (!username || !email || !password) {
        alert('Alla fält måste fyllas i')
        return
    }

    // 1. Skapa auth-användare
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: { username: username }
        }
    })

    if (error) {
        alert('Registrering misslyckades: ' + error.message)
        return
    }

    const user = data.user

    if (!user) {
        alert('Kunde inte skapa användare.')
        return
    }

    // 2. Skapa profilrad i users-tabellen
    const { error: insertError } = await supabase
        .from('users')
        .insert([
            {
                id: user.id,
                username: username,
                email: email
            }
        ])

    if (insertError) {
        alert('Kunde inte spara användardata: ' + insertError.message)
        return
    }

    alert('Registrering lyckades! Kontrollera din e-post.')

    document.getElementById('regUsername').value = ''
    document.getElementById('regEmail').value = ''
    document.getElementById('regPass').value = ''
}


// =====================================================
// INLOGGNING
// =====================================================
async function loginUser(email, password) {

    if (!email || !password) {
        alert('Du måste fylla i dina uppgifter')
        return
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })

    if (error) {
        alert('Fel uppgifter eller o-verifierad e-post')
        return
    }

    if (!data.user) {
        alert('Inloggning misslyckades')
        return
    }

    alert('Inloggad!')
    window.location.href = 'klocka.html'
}


// =====================================================
// EVENT LISTENERS
// =====================================================
document.addEventListener('DOMContentLoaded', () => {

    const registerForm = document.getElementById('registerForm')
    const loginForm = document.getElementById('loginForm')

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault()

            const username = document.getElementById('regUsername').value
            const email = document.getElementById('regEmail').value
            const password = document.getElementById('regPass').value

            registerUser(username, email, password)
        })
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault()

            const email = document.getElementById('loginEmail').value
            const password = document.getElementById('loginPass').value

            loginUser(email, password)
        })
    }
})