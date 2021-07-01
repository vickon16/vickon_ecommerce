
const navMenu = document.querySelector(".nav-menu");
const navigation = document.querySelector(".navigation");
const openBtn = document.querySelector(".hamburger");
const closeBtn = document.querySelector(".close");

const navLeft = navMenu.getBoundingClientRect().left;
openBtn.addEventListener("click", function(){
  if(navLeft < 0) {
    navigation.classList.add("show");
    navMenu.classList.add("show");
    document.body.classList.add("show")
  }
})

closeBtn.addEventListener("click", function(){
  if(navLeft < 0) {
    navigation.classList.remove("show");
    navMenu.classList.remove("show");
    document.body.classList.remove("show");
  }
})

// Fixed Nav
const navHeight = navigation.getBoundingClientRect().height;
window.addEventListener("scroll", function(){
  const scrollHeight = window.pageYOffset;
  if (scrollHeight > navHeight) {
    navigation.classList.add("fix-nav")
  } else {
    navigation.classList.remove("fix-nav")
  }
})

 // bxslider
 $(document).ready(function(){
  $('.bxslider').bxSlider({
    mode: 'horizontal',
    slideMargin: 40,
    infiniteLoop:true,
    speed: 1000,
    controls: false,
    auto: true,
  });
 });


 // popup 
const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".popup-close")

closePopup.addEventListener("click", function() {
    popup.classList.remove("show")
})


window.addEventListener("load", function(){
  // preloader
  const loader = document.getElementById("preloader");
    setTimeout(() => {
      loader.classList.add("hide");
    }, 2000)

    setTimeout(() => {
      popup.classList.add("show");

    //  remove one popup if two appears
      if (popup.classList.contains("show") && imagePopup.classList.contains("show")) {
        popup.classList.remove("show");
      }
      
  }, 4000)

  setTimeout(function() {
        alert("Click the images to automatically add them to cart")
  }, 6000)
})

//  image Popup



// smooth scroll 
const links = [...document.querySelectorAll(".scroll-link")]
links.map(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const id = e.target.getAttribute("href").slice(1)
    const element = document.getElementById(id);
    const fixNav = navigation.classList.contains("fix-nav");
    let position = element.offsetTop - navHeight;

    if(!fixNav) {
      position = position - navHeight;
    }

    window.scrollTo({
      top: position,
      left: 0,
    })
    
    navigation.classList.remove("show");
    navigation.classList.remove("show");
    document.body.classList.remove("show");
  })
})







