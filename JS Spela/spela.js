var circle = document.querySelector(".circle")
circle.style.position = "absolute"



const getRandomIntegerx = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min)) + min
}
const randomIntegerx = getRandomIntegerx(20, 500)

const getRandomIntegery = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min)) + min
}
const randomIntegery = getRandomIntegery(20, 500)


circle.style.top = randomIntegerx + "px"
circle.style.left = randomIntegery + "px"

addEventListener ("click", function() {
    alert (" Du har klickat");
})
