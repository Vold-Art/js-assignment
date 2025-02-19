export function updateCart(product = null) {
	let cart = JSON.parse(localStorage.getItem("cart")) || [];

	if (product) {
		cart.push(product); // Add product if provided
		localStorage.setItem("cart", JSON.stringify(cart));

		// Dispatch a custom event to notify other scripts
		window.dispatchEvent(new Event("cartUpdated"));
	}

	document.getElementById("cart-count").textContent = cart.length; // Update the icon count
}

// Call it on page load to initialize the count
updateCart();
