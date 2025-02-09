var animationElements = []
var imageElements = []
var animationElementName = ".small-load"

// Hookable function
var loadAnimation = function (item) {
  let img = new Image()
  img.src = item.children[0].children[0].dataset.src
  img.onload = function () {
    item.classList.remove("small-load", "medium-load", "large-load")
    item.classList.add("small-loaded", "medium-loaded", "large-loaded")
  }
}

// Hookable function
var loadImage = function (index) {
  if (index >= imageElements.length) return
  let item = imageElements[index]
  let image = new Image()
  item.src = item.dataset.src
  image.src = item.src

  // if the image is loaded, load the next image
  image.onload = function () {
    loadImage(index + 1)
  }
  // if the image is not loaded, load the next image
  image.onerror = function () {
    loadImage(index + 1)
  }
}

function initImage() {
  // get all the images with data-src attribute
  imageElements = document.querySelectorAll("img[data-src]")
  // load the images one by one
  loadImage(0)

  animationElements = document.querySelectorAll(animationElementName)
  // load the images which are in the viewport
  viewPortLoad(0)
  const debouncedHandleScroll = debounce(lazyAnimation, 10)
  // add the event listener
  window.addEventListener("scroll", debouncedHandleScroll)
}

function viewPortLoad(index) {
  if (index >= animationElements.length) return
  let item = animationElements[index]
  if (!isElementInView(item)) {
    viewPortLoad(index + 1)
    return
  }

  loadAnimation(item)
  viewPortLoad(index + 1)
}

function lazyAnimation() {
  images = document.querySelectorAll(animationElementName)
  viewPortLoad(0)
}

// check if the element is in the viewport
function isElementInView(element) {
  const rect = element.getBoundingClientRect()
  const elementTop = rect.top
  const elementBottom = rect.bottom
  return elementTop >= 0 && elementBottom - 200 <= window.innerHeight
}

function debounce(fn, delay) {
  let timer = null
  return function () {
    let context = this
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

const featuredPosts = document.querySelector(".featured-posts")
const firstPost = featuredPosts.querySelector(".featured-post")
firstPost.classList.add("active")

const navLeft = document.querySelector(".featured-nav-left")
const navRight = document.querySelector(".featured-nav-right")
let currentPosition = 0

function setActivePost() {
  const posts = document.querySelectorAll(".featured-post")
  posts.forEach((post, index) => {
    if (index === currentPosition) {
      post.classList.add("active")
    } else {
      post.classList.remove("active")
    }
  })
}

const totalPosts = document.querySelectorAll(".featured-post").length;

navLeft.addEventListener("click", () => {
  // Move left, but wrap around
  currentPosition = (currentPosition === 0) ? totalPosts - 1 : currentPosition - 1;
  const transformValue = window.innerWidth <= 768 ? 119 : 107
  featuredPosts.style.transform = `translateX(-${currentPosition * transformValue}%)`
  setActivePost()
})

navRight.addEventListener("click", () => {
  // Move right, but wrap around
  currentPosition = (currentPosition === totalPosts - 1) ? 0 : currentPosition + 1;
  const transformValue = window.innerWidth <= 768 ? 119 : 107
  featuredPosts.style.transform = `translateX(-${currentPosition * transformValue}%)`
  setActivePost()
})
