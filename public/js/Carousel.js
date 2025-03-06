const featuredPosts = document.querySelector(".featured-posts");
const firstPost = featuredPosts.querySelector(".featured-post");
firstPost.classList.add("active");

const navLeft = document.querySelector(".featured-nav-left");
const navRight = document.querySelector(".featured-nav-right");
let currentPosition = 0;

function setActivePost() {
  const posts = document.querySelectorAll(".featured-post");
  posts.forEach((post, index) => {
    if (index === currentPosition) {
      post.classList.add("active");
    } else {
      post.classList.remove("active");
    }
  });
}

const totalPosts = document.querySelectorAll(".featured-post").length;

navLeft.addEventListener("click", () => {
  // Move left, but wrap around
  currentPosition =
    currentPosition === 0 ? totalPosts - 1 : currentPosition - 1;
  const transformValue = window.innerWidth <= 768 ? 119 : 107;
  featuredPosts.style.transform = `translateX(-${
    currentPosition * transformValue
  }%)`;
  setActivePost();
});

navRight.addEventListener("click", () => {
  // Move right, but wrap around
  currentPosition =
    currentPosition === totalPosts - 1 ? 0 : currentPosition + 1;
  const transformValue = window.innerWidth <= 768 ? 119 : 107;
  featuredPosts.style.transform = `translateX(-${
    currentPosition * transformValue
  }%)`;
  setActivePost();
});
