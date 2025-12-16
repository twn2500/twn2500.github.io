import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Byt till anon key innan inlämning
const supabaseUrl = 'https://ravafoaxjvtxhyduaibu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhdmFmb2F4anZ0eGh5ZHVhaWJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNDE1MzAsImV4cCI6MjA3ODYxNzUzMH0.WS001Y0lMo8gJDt1GCMpiBrBENGiiKEahaXmi4VHuxk'
const supabase = createClient(supabaseUrl, supabaseKey)


// ---------------------------------------------------------
// Registrering
// ---------------------------------------------------------
async function registerUser(username, email, password) {
    if (!username || !email || !password) {
        alert('Alla fält måste fyllas i')
        return
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username } }
    })

    if (error) {
        alert('Registrering misslyckades: ' + error.message)
        return
    }

    alert('Registreringslänk skickad till din e-post.')

    // Rensa inputs
    document.getElementById('regUsername').value = ''
    document.getElementById('regEmail').value = ''
    document.getElementById('regPass').value = ''
}



// ---------------------------------------------------------
// Inloggning
// ---------------------------------------------------------
async function loginUser(email, password) {
    if (!email || !password) {
        alert('Du måste fylla i dina uppgifter')
        return
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
        alert('Fel uppgifter eller o-verifierad e-post')
        return
    }

    const user = data.user
    if (!user) {
        alert('Inloggning misslyckades.')
        return
    }

    // Kontrollera att användaren finns i users-tabellen
    const { data: existing, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .maybeSingle()

    if (!existing) {
        // Skapa ny rad om användaren inte finns
        const { error: insertError } = await supabase
            .from('users')
            .insert([
                {
                    id: user.id,
                    username: user.user_metadata.username,
                    email: user.email
                }
            ])

        if (insertError) {
            alert('Kunde inte spara användaren: ' + insertError.message)
            return
        }
    }

    alert('Inloggad!')
    window.location.href = 'klocka.html'
}



// ---------------------------------------------------------
// Event Listeners
// ---------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm')
    const loginForm = document.getElementById('loginForm')

    if (registerForm) {
        registerForm.addEventListener('submit', e => {
            e.preventDefault()
            registerUser(
                document.getElementById('regUsername').value,
                document.getElementById('regEmail').value,
                document.getElementById('regPass').value
            )
        })
    }

    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault()
            loginUser(
                document.getElementById('loginEmail').value,
                document.getElementById('loginPass').value
            )
        })
    }
})