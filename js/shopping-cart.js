import { updateCart } from "./cart.js";

// Function to get cart items from localStorage
function getCartItems() {
	return JSON.parse(localStorage.getItem("cart")) || [];
}

// Function to save cart back to localStorage
function saveCartItems(cart) {
	localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to display cart items
function displayCart() {
	const cartContainer = document.getElementById("cart-container");
	const cartTotal = document.getElementById("cart-total");
	cartContainer.innerHTML = ""; // Clear existing content

	const cart = getCartItems();

	if (cart.length === 0) {
		cartContainer.innerHTML = "<p>Your cart is empty.</p>";
		cartTotal.textContent = "0.00";
		return;
	}

	let total = 0;

	cart.forEach((item, index) => {
		const cartItem = document.createElement("div");
		cartItem.classList.add("cart-item");

		cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-img">
            <div class="cart-details">
                <h2>${item.title}</h2>
                <p>Size: ${item.size}</p>
                <p>Price: $${item.price}</p>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
        `;

		cartContainer.appendChild(cartItem);
		total += item.price;
	});

	cartTotal.textContent = total.toFixed(2); // Update total price

	// Attach remove button event listeners
	document.querySelectorAll(".remove-btn").forEach((button) => {
		button.addEventListener("click", removeFromCart);
	});
}

// Function to remove item from cart
function removeFromCart(event) {
	const index = event.target.getAttribute("data-index");
	let cart = getCartItems();
	cart.splice(index, 1); // Remove item from array
	saveCartItems(cart); // Save updated cart
	displayCart(); // Re-render cart
}

// Display cart on page load
displayCart();
