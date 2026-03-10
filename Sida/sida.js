// 1. Hämta alla knappar
const buttons = document.querySelectorAll('.color-btn');

// 2. Lägg till klick-funktion på varje knapp
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Hämta bakgrundsfärgen från knappen du nyss klickade på
        const buttonColor = getComputedStyle(button).backgroundColor;
        
        // Applicera samma färg på hela sidans bakgrund
        document.body.style.backgroundColor = buttonColor;
        
        // Valfritt: Ändra textfärgen till vit så den syns mot de mörka färgerna
        document.body.style.color = "white";
    });
});