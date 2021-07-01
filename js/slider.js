
const glide1 = document.getElementById("glide1");
const glide2 = document.getElementById("glide2");

if(glide1) {

  new Glide(glide1, {
    type: "carousel", 
    startAt: 0,
    autoplay: 5000,
    hoverpause: true,
    perView: 1,
    animationDuration: 800,
    animationTimingFunc: "linear",
  }).mount()
}

if(glide2) {

  new Glide(glide2, {
    type: "carousel", 
    startAt: 0,
    autoplay: 5000,
    hoverpause: false,
    perView: 4,
    animationDuration: 800,
    animationTimingFunc: "linear",
    breakpoints: {
      1200: { perView: 4},
      768: { perView: 3},
      567: {perView: 2},
      400: {perView: 1},
    }
  }).mount()
}

