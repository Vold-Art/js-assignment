// Cart counter
export function updateCart(product = null) {
	let cart = JSON.parse(localStorage.getItem("cart")) || [];

	if (product) {
		cart.push(product); // Add product(s)
		localStorage.setItem("cart", JSON.stringify(cart));

		window.dispatchEvent(new Event("cartUpdated"));
	}

	document.getElementById("cart-count").textContent = cart.length; // Update the icon count
}

// Update cart count on page load
updateCart();
