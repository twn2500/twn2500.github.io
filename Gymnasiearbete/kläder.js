console.log("Skriptet är laddat!");

const trojor = ["Bilder/troja1.png", "Bilder/troja2.jpg"];
const jeans = ["Bilder/530205s6.webp"];
const skor = ["Bilder/daze.webp", "Bilder/jack.jpg" ];

const knapp = document.getElementById("slumpa-knapp");


if (knapp) {
    knapp.addEventListener("click", function() {
        console.log("Knappen klickades!");

        const rTroja = trojor[Math.floor(Math.random() * trojor.length)];
        const rJeans = jeans[Math.floor(Math.random() * jeans.length)];
        const rSkor = skor[Math.floor(Math.random() * skor.length)];

        document.getElementById("img-troja").src = rTroja;
        document.getElementById("img-jeans").src = rJeans;
        document.getElementById("img-skor").src = rSkor;
    });
} else {
    console.error("Kunde inte hitta knappen med id 'slumpa-knapp'");
}