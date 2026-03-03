// Listor med bildadresser för varje kategori
const trojor = [
  'troja1.jpg',
  'troja2.jpg',
  'https://unsplash.it/100?random=1'
];

const jeans = [
  'jeans1.jpg',
  'jeans2.jpg',
  'https://unsplash.it/100?random=2'
];

const annat = [
  'skor1.jpg',
  'keps1.jpg',
  'https://unsplash.it/100?random=3'
];

function randomizeOutfit() {
  // Funktion för att välja en slumpmässig bild från en lista
  const getRandomImg = (list) => list[Math.floor(Math.random() * list.length)];

  // Uppdatera bilderna i HTML-koden via deras ID
  document.getElementById('img-troja').src = getRandomImg(trojor);
  document.getElementById('img-jeans').src = getRandomImg(jeans);
  document.getElementById('img-annat').src = getRandomImg(annat);
}