const Dagar = document.getElementById("dagar")
const Timmar = document.getElementById("timmar")
const Minuter = document.getElementById("minuter")
const Sekunder = document.getElementById("sekunder")

const slutDatum = new Date("Juni 12 2026 12:00:00").getTime();

function timer () {
    
    const dagensDatum = new Date ().getTime();
    const distans = slutDatum - dagensDatum;

    const dagar = Math.floor(distans / 1000 / 60 / 60 / 24);
    const timmar = Math.floor(distans / 1000 / 60 / 60) % 24;
    const minuter = Math.floor(distans / 1000 / 60) % 60;
    const sekunder = Math.floor(distans / 1000) % 60;

    Dagar.innerHTML = dagar;
    Timmar.innerHTML = timmar;
    Minuter.innerHTML = minuter;
    Sekunder.innerHTML = sekunder;

    if(distans < 0) {
        Dagar.innerHTML = "00";
        Timmar.innerHTML = "00";
        Minuter.innerHTML = "00";
        Sekunder.innerHTML = "00";
    }
}
setInterval(timer, 1000)