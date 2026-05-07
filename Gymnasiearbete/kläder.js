const trojor = ["Bilder/troja1.png", "Bilder/troja2.jpg", "Bilder/tröja1.webp"];
const jeans = ["Bilder/530205s6.webp", "Bilder/jeans1.webp", "Bilder/jeans2.webp"];
const skor = ["Bilder/daze.webp", "Bilder/jack.jpg", "Bilder/skor1.avif" ];

const knapp = document.getElementById("slumpa-knapp");

function väljSlumpad (lista) {
    const siffra = Math.random() * lista.length
    const heltal = Math.floor(siffra);
    return lista[heltal];
}

knapp.addEventListener("click", () => {

    const valdTroja = väljSlumpad(trojor)
    const valdJeans = väljSlumpad(jeans)
    const valdSkor = väljSlumpad(skor)

    document.getElementById("img-troja").src = valdTroja;
    document.getElementById("img-jeans").src = valdJeans;
    document.getElementById("img-skor").src = valdSkor;
})