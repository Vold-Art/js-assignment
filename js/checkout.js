import { updateCart } from "./cart.js";

function getCartItems() {
	return JSON.parse(localStorage.getItem("cart")) || [];
}

function displayOrderSummary() {
	const orderContainer = document.getElementById("cart-items");
	const orderTotal = document.getElementById("total-price");
	orderContainer.innerHTML = "";

	const cart = getCartItems();

	if (cart.length === 0) {
		orderContainer.innerHTML = "<p>Your cart is empty.</p>";
		orderTotal.textContent = "$0.00";
		return;
	}

	let total = 0;

	cart.forEach((item) => {
		const orderItem = document.createElement("div");
		orderItem.classList.add("cart-item");

		orderItem.innerHTML = `
                <h2>${item.title}</h2>
                <p>Size: ${item.size}</p>
                <p>Price: $${item.price.toFixed(2)}</p>
            </div>
        `;

		orderContainer.appendChild(orderItem);
		total += item.price;
	});

	orderTotal.textContent = `$${total.toFixed(2)}`;
}

function submitOrder(event) {
	event.preventDefault();

	localStorage.removeItem("cart");

	window.location.href = "../confirmation/index.html";
}

document.addEventListener("DOMContentLoaded", () => {
	displayOrderSummary();

	const checkoutButton = document.getElementById("submit-order");
	if (checkoutButton) {
		checkoutButton.addEventListener("click", submitOrder);
	}
});
