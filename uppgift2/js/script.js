let currentSlide = 0;
const slideTxt = [ 
  { "slide-nr": "Bild 1", "slide-heading": "Häst", "slide-text": "En väldigt fin häst."}, 
  { "slide-nr": "Bild 2", "slide-heading": "Hund", "slide-text": "En lojal hund."},
  { "slide-nr": "Bild 3", "slide-heading": "Varg", "slide-text": "En vild varg."} 
];

const imageSlides = ["img/hast.jpg", "img/hund.jpg", "img/varg.jpg"];

function countUpd(val) {
    currentSlide += val;
    
    if(currentSlide < 0) {
        currentSlide = 2;
    } else if(currentSlide > 2) {
        currentSlide = 0;
    }
    document.getElementById("slide-img").src = imageSlides[currentSlide];
    document.getElementById("slide-nr").innerHTML = slideTxt[currentSlide]["slide-nr"] + " / " + slideTxt.length;
    document.getElementById("slide-heading").innerHTML = slideTxt[currentSlide]["slide-heading"];
    document.getElementById("slide-text").innerHTML = slideTxt[currentSlide]["slide-text"];


    // document.getElementById("slide-value").innerHTML = currentSlide; Testar att countUpd fungerar
    // document.getElementById("slide-value").textContent =  (currentSlide + 1) + " / " + imageSlides.length;
    }