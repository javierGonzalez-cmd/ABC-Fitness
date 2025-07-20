document.addEventListener("DOMContentLoaded", function () {
  // Newsletter Form Submission
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (event) {
      event.preventDefault();
      alert("Thank you for subscribing");
    });
  }

  // Feedback/Custom Order Form
  const feedbackForm = document.getElementById("feedback-custom-form");
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (name && email && message) {
        const customOrder = {
          name,
          email,
          message,
          timestamp: new Date().toISOString()
        };

        const existingOrders = JSON.parse(localStorage.getItem("customOrders")) || [];
        existingOrders.push(customOrder);
        localStorage.setItem("customOrders", JSON.stringify(existingOrders));

        alert("Thank you for your message!");
        feedbackForm.reset();
      } else {
        alert("Please fill out all fields.");
      }
    });
  }

  // Shopping Cart Logic
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    if (!cartContainer) return;
    
    cartContainer.innerHTML = "";

    if (Object.keys(cart).length === 0) {
      cartContainer.innerHTML = "<p>No items yet!</p>";
      return;
    }

    for (let [name, item] of Object.entries(cart)) {
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <img src="${item.image}" width="50" height="50">
        <span>${name}</span>
        <span>Quantity: ${item.quantity}</span>
      `;
      cartContainer.appendChild(div);
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
  }

  renderCart(); // Initial render

  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = button.closest(".product");
      const name = product.querySelector("p").innerText;
      const image = product.querySelector("img").src;

      if (cart[name]) {
        cart[name].quantity += 1;
      } else {
        cart[name] = { image, quantity: 1 };
      }

      renderCart();
      alert("Item added to cart!");
    });
  });

  const clearCartBtn = document.getElementById("clear-cart");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      if (Object.keys(cart).length > 0) {
        cart = {};
        sessionStorage.removeItem("cart");
        renderCart();
        alert("Cart cleared!");
      } else {
        alert("No items to clear");
      }
    });
  }

  const processOrderBtn = document.getElementById("process-order");
  if (processOrderBtn) {
    processOrderBtn.addEventListener("click", () => {
      if (Object.keys(cart).length > 0) {
        cart = {};
        sessionStorage.removeItem("cart");
        renderCart();
        alert("Thank you for your order");
      } else {
        alert("Cart is empty");
      }
    });
  }

  // Modal Logic
  const cartButton = document.getElementById("cart-button");
  const cartModal = document.getElementById("cart-modal");
  const closeBtn = document.querySelector(".close-btn");

  if (cartButton && cartModal) {
    cartButton.addEventListener("click", function () {
      cartModal.style.display = "block";
    });

    closeBtn.addEventListener("click", function () {
      cartModal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target === cartModal) {
        cartModal.style.display = "none";
      }
    });
  }
});
