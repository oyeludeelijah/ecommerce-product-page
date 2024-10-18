const cartToggle = document.getElementById("cart-toggle");
const cartDropdown = document.getElementById("cart-dropdown");
const decreaseQuantity = document.getElementById("decrease-quantity");
const quantityDisplay = document.getElementById("quantity-display");
const increaseQuantity = document.getElementById("increase-quantity");
const mainProductImage = document.getElementById("main-product-image");
const thumbnails = document.querySelectorAll(".thumbnail");
const btnCheckout = document.getElementById("btn-checkout");
const btnAddToCart = document.getElementById("btn-add-to-cart");

const cartItemPrice = document.getElementById("cart-item-price");
const currentPrice = document.getElementById("current-price");

const cartItem = document.getElementById("cart-item");
const clearCart = document.getElementById("cart-remove");
const cartEmpty = document.getElementById("cart-empty");

const cartItemQuantity = document.getElementById("cart-item-quantity");

const cartTotal = document.getElementById("cart-total");

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", function () {
    // Update main image
    mainProductImage.src = this.getAttribute("data-image");
    // Update active thumbnail
    thumbnails.forEach((thumb) => thumb.classList.remove("active"));
    this.classList.add("active");
    // Add a small animation to the main image
    mainProductImage.style.transform = "scale(1.05)";
    setTimeout(() => {
      mainProductImage.style.transform = "scale(1)";
    }, 300);
  });
});

let timeoutId;
if (cartToggle && cartDropdown) {
  cartToggle.addEventListener("mouseenter", function () {
    clearTimeout(timeoutId);
    cartDropdown.classList.remove("hidden");
  });
  cartToggle.addEventListener("mouseleave", function () {
    timeoutId = setTimeout(() => {
      if (!cartDropdown.matches(":hover")) {
        cartDropdown.classList.add("hidden");
      }
    }, 300); // 300ms delay, adjust as needed
  });
  cartDropdown.addEventListener("mouseenter", function () {
    clearTimeout(timeoutId);
  });
  cartDropdown.addEventListener("mouseleave", function () {
    cartDropdown.classList.add("hidden");
  });
}

let quantity = parseInt(quantityDisplay.textContent, 10) || 0;

decreaseQuantity.addEventListener("click", function () {
  if (quantity > 0) {
    quantity--;
    quantityDisplay.textContent = quantity.toString();
  }
});

increaseQuantity.addEventListener("click", function () {
  quantity++;
  quantityDisplay.textContent = quantity.toString();
});

// ADD TO CART
btnAddToCart.addEventListener("click", function () {
  // console.log("Added to cart");
  cartEmpty.classList.add("hidden");
  cartItem.classList.remove("hidden");

  // Update cart item price
  let CP = parseFloat(currentPrice.textContent.replace(/[^0-9.-]+/g, "")); // Remove non-numeric characters before parsing
  if (isNaN(CP)) CP = 0; // Ensure there's no NaN value
  // console.log(CP);
  cartItemPrice.textContent = `$${CP.toFixed(2)}`; // Format to 2 decimal places for currency

  // Update cart item quantity
  let quantity = parseInt(quantityDisplay.textContent, 10); // Ensure quantity is an integer
  if (isNaN(quantity)) quantity = 1; // Default to 1 if quantity is not valid
  cartItemQuantity.textContent = quantity;

  let TP = CP * quantity;
  // console.log(TP);
  cartTotal.textContent = `$${TP}`;
});

// CLEAR CART
clearCart.addEventListener("click", function () {
  cartEmpty.classList.remove("hidden");
  cartItem.classList.add("hidden");
});

// CHECKOUT
btnCheckout.addEventListener("click", function () {
  // console.log("working...");
});
