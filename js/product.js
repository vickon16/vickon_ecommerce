
const popupContainer = document.querySelector(".image-popup");
const productSum = document.querySelector(".product-sum");
const shoppingCart = document.getElementById("shopping-cart");
const cartPopup = document.querySelector(".cart-popup");
const cartPopupCloseButton = document.querySelector(".cart-popup-close")


const cartCount = document.getElementById("cart-count");
const clearCart = document.querySelector(".clearCart");
let count = 0

  
async function getProducts() {
  const res = await fetch("products.json");
  const data = await res.json(); //the method returns a promise, so we have to convert to json
  const products = data.products;
  return products;
};

let cartContainerArray = []
const cartItemContainer = document.querySelector(".cart-item-container");

// display Product
function displayProducts(products, center, name) {
  let display = products.map(({title, image, price}) => 
  `<div class="product">
  <div class="product-header">
    <img src="${image}" alt="" class="product-${name}" onclick="clickedImage(this)">
  </div>
  <div class="product-footer">
    <h3><span class="casual">Casual</span> ${title}</h3>
    <div class="rating">
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
    </div>
    <div class="product-price"> <h4><sup>$</sup>${price}</h4> </div>
    <ul>
      <li><a href="#"><i class="far fa-eye"></i></a></li>
      <li><a href="#"><i class="far fa-heart"></i></a></li>
      <li><a href="#"><i class="fas fa-sync"></i></a></li>
    </ul>
  </div>
</div>`
)
  
  display = display.join("");
  center.innerHTML = display;

  // getImages(products, name)
};


async function clickedImage(clicked) {
  const products = await getProducts()
  popupContainer.classList.add("show");

  const productDOM = products.filter(product => product.image.slice(-16) === clicked.src.slice(-16));

  const popupContainerContent = document.querySelector(".image-popup-content");
  
  const contentTag = `
    <div class="image-popup-close" onclick="closeImagePopup()">
    <i class="fas fa-times"></i>
    </div>

    <div class="image-popup-left">
    <div class="image-popup-img">
      <img src="${productDOM[0].image}" class="popup-image" alt="">
    </div>
    </div>

    <div class="image-popup-right">
    <div class="image-right-content">
      <h1>${productDOM[0].h1}</h1>
      <p class="paragraph">${productDOM[0].paragraph}</p>
      <p class="price">Price: ${productDOM[0].price}</p>

        <a href="javascript:void(0)" class="purchase">Add to Cart</a>
        <span id="cart-message"></span>
    </div>
    </div>
  `;
  popupContainerContent.innerHTML = contentTag;

  const purchaseButton = document.querySelector(".purchase");
  const cartMessage = document.getElementById("cart-message");

  purchaseButton.addEventListener("click", ()=> {
      if (count < 5) {
      count++;
      cartCount.classList.remove("display-count");
      setTimeout(function() {
        cartCount.classList.add("display-count");
      }, 350)
      cartMessage.innerHTML = " Added " + count + " items <i class='far fa-check-circle'></i>";
      cartCount.innerHTML = count;

      addProductToCart(productDOM[0])
    } else {
      popupContainer.classList.remove("show");
      alert("cart is full, Purchase these items first.")
    }
  })
}

// cart
function addProductToCart(product) {
  const div = document.createElement("div");
  div.classList.add("selected-item");
  let displayCartProduct = 
    `<div class="selected-image">
        <img src="${product.image}" alt="">
      </div>
      <div class="selected-name">
        <p>${product.title}</p>
      </div>
      <div class="selected-price">
        <p>${product.price}</p>
      </div>
      <div class="remove-product" onclick="removeProduct(this)"><i class="fas fa-window-close"></i>
      </div>`;

    div.innerHTML = displayCartProduct;
    cartItemContainer.appendChild(div);

    cartContainerArray.push(parseFloat(product.price)) 
    const sum = cartContainerArray.reduce((total, n) => total + n);
    productSum.innerHTML = sum.toFixed(2);
    console.log(cartContainerArray)
}

function removeProduct(item) {
  if (item) {
    item.parentNode.remove();
    count--;
    cartCount.innerHTML = count;

    cartContainerArray.forEach((price, index) => {
      if (item.parentNode.childNodes[4].innerText == price) {
        cartContainerArray.splice(index, 1);
        const sum = cartContainerArray.reduce(reduceFunc, 0);
        productSum.innerHTML = sum.toFixed(2);
      } else {
        return;
      }
    })
  }
}

const reduceFunc = (total, n) => total + n;

shoppingCart.addEventListener("click", () => {
  cartPopup.classList.add("show-cart")
})

cartPopupCloseButton.addEventListener("click", () => {
  cartPopup.classList.remove("show-cart")
})

clearCart.addEventListener("click", () => {
  count = 0;
  cartCount.innerHTML = count;
  cartItemContainer.innerHTML = "";
  cartContainerArray = [];
  productSum.innerHTML = 0;
})

function closeImagePopup() {
  popupContainer.classList.remove("show")
}






// filtering

const catContainer = document.querySelector(".sort-category");
const productCenter = document.querySelector(".product-center")
const filterBtns = [...document.querySelectorAll(".filter-btn")]

if(catContainer) {
  catContainer.addEventListener("click", async e => {
    const target = e.target.closest(".section-title");
    if(!target) return;

    const id = target.dataset.id;
    const products = await getProducts();

    if(id) filterBtns.forEach(btn => btn.classList.remove("active"));
    target.classList.add("active");

    const menuCat = products.filter(product => product.category === id);
    productCenter.classList.add("animate__animated", "animate__backInDown");

    setTimeout(() => {
      productCenter.classList.remove("animate_animated", "animate__backInDown");
    }, 1000);

    displayProducts(menuCat, productCenter, "menu_cat")
  });
}

const filterArray = async (type) => {
  const products = await getProducts();
  return products.filter(product => product.category === type);
};

const shopCenter = document.querySelector(".shop-center");
const LatestCenter = document.querySelector(".latest-center");
const recentCenter = document.querySelector(".recent-center");


window.addEventListener("DOMContentLoaded", async () => {
  const products = await getProducts();
  const defaultProducts = await filterArray("trend");
  const LatestProducts = await filterArray("latest");
  const recentProducts = await filterArray("recent");
  displayProducts(defaultProducts, productCenter, "default_product");
  displayProducts(products, shopCenter, "shop")
  displayProducts(LatestProducts, LatestCenter, "latest")
  displayProducts(recentProducts, recentCenter, "recent")
})













