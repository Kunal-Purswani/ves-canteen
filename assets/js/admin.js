// --- Admin Product Management Btns ---
const addProductBtn = document.querySelector("#add-product-menu");
const removeProductBtn = document.querySelector("#remove-product-menu");
const todaysSpl = document.querySelector('#todays-spl');

// Admin Management Containers
const addContainer = document.querySelector(".add-container");
const removeContainer = document.querySelector(".remove-container");
const todaysSplContainer = document.querySelector('.todays-spl-container');

// Admin Side URL
const adminSRC = "https://kunal-purswani.github.io/ves_canteen/admin-side.html";

// --- Admin Side ---
if (adminSRC === window.location.href) {
  console.log("admin side");
  // Admin Management Btns
  addProductBtn.addEventListener("click", () => {
    addContainer.classList.toggle("show-container");
    removeContainer.classList.remove("show-container");
    todaysSplContainer.classList.remove("show-container");
  });

  // Admin Management Btns
  removeProductBtn.addEventListener("click", () => {
    removeContainer.classList.toggle("show-container");
    addContainer.classList.remove("show-container");
    todaysSplContainer.classList.remove("show-container");
  });

  // Admin Management Btns
  todaysSpl.addEventListener("click", () => {
    todaysSplContainer.classList.toggle("show-container");
    addContainer.classList.remove("show-container");
    removeContainer.classList.remove("show-container");
  });
}

// console.log(todaysSplContainer.innerHTML)
