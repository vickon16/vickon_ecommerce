

const blogContainer = document.getElementById("blog");
// popupContainer, popUpImage, h1, and paragraph has already been declared in the product.js file

async function getBlog() {
  const gotten = await fetch("blog.json");
  const blogJson = await gotten.json();
  const blog =blogJson.blog;
  return blog;

}


function displayBlog(blog, center) {
  let display = blog.map(({item, image, h2}) => {
    return `<figure class="gallery-item item-${item}">
      <img src="${image}" alt="" class="gallery-img">
      <div class="content">
        <h2>${h2}</h2>
        <a href="javascript:void(0)" class="view-more" id="${item}">View More</a>
      </div>
    </figure>`
  })

  display = display.join("");
  center.innerHTML = display;
}



async function popUpBlog() {
  const blog = await getBlog()
  displayBlog(blog, blogContainer);

  // adding to the popup
  blogContainer.addEventListener("click", (e) => {
    const buttons = e.target.closest(".view-more");
    if(!buttons) return;

    popupContainer.classList.add("show");
    blog.forEach(blogItem => {
      if(buttons.id == blogItem.item) {
        popUpImage.src = blogItem.image;
        h1.innerHTML = blogItem.h2;
        paragraph.innerHTML = blogItem.paragraph;
        document.querySelector(".image-right-content .price").innerHTML = "";
        document.querySelector(".purchase").style.display = "none"
      }
    });
  })
}

popUpBlog()



