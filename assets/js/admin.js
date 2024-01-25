// --- Admin Product Management Btns ---
const addProductBtn = document.querySelector("#add-product-menu");
const removeProductBtn = document.querySelector("#remove-product-menu");
const todaysSpl = document.querySelector('#todays-spl');

const sales = document.querySelector("#a-sales");
const mostSold = document.querySelector("#a-most-sold");

// Admin Management Containers
const addContainer = document.querySelector(".add-container");
const removeContainer = document.querySelector(".remove-container");
const todaysSplContainer = document.querySelector('.todays-spl-container');
const salesContainer = document.querySelector('.a-sales-container');
const mostSoldContainer = document.querySelector('.a-most-sold-container');

// Admin Side URL
const adminSRC = "https://kunal-purswani.github.io/ves_canteen/admin-side.html";
const analyticsSRC = "https://kunal-purswani.github.io/ves_canteen/analytics.html";

// --- Admin Side ---
if (window.location.href === adminSRC) {
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
if (window.location.href === analyticsSRC) {
  sales.addEventListener("click", () => {
    salesContainer.classList.toggle("show-container");
    mostSoldContainer.classList.remove("show-container");
  })
  mostSold.addEventListener("click", () => {
    mostSoldContainer.classList.toggle("show-container");
    salesContainer.classList.remove("show-container");
  })
}



// console.log(todaysSplContainer.innerHTML)
