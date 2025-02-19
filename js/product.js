import { updateCart } from "./cart.js";
import { fetchProductById } from "./api.js";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// Function to display product details
function displayProduct(product) {
	document.title = product.title;
	const productContainer = document.getElementById("product-container");

	let sizesHTML = product.sizes
		.map(
			(size) => `
            <label class="size-btn">
                <input type="radio" name="size" value="${size}">
                ${size}
            </label>
        `
		)
		.join("");

	productContainer.innerHTML = `
        <div class="product-card">
            <img src="${product.image.url}" alt="${product.image.alt}">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>Gender:</strong> ${product.gender}</p>
            <p><strong>Sizes:</strong></p>
            <div class="size-options">${sizesHTML}</div>
            <button class="btn" id="add-to-cart" disabled>Add to Cart</button>
        </div>
    `;

	// Selecting size and enabling the button
	let selectedSize = null;
	const sizeButtons = document.querySelectorAll(".size-btn");

	sizeButtons.forEach((button) => {
		button.addEventListener("click", (event) => {
			// Remove 'selected' class from all buttons
			sizeButtons.forEach((btn) => btn.classList.remove("selected"));

			// Add 'selected' class to the clicked button
			button.classList.add("selected");

			// Get the selected size value
			selectedSize = button.querySelector("input").value;
			console.log("Selected Size:", selectedSize);

			// Enable the add to cart button
			document.getElementById("add-to-cart").disabled = false;
		});
	});

	// Handling Add to Cart
	addToCartButton.addEventListener("click", function () {
		if (!selectedSize) {
			alert("Please select a size before adding to cart.");
			return;
		}

		// Create cart item object
		const cartItem = {
			id: product.id,
			title: product.title,
			size: selectedSize,
			price: product.price,
			image: product.image.url,
		};

		// Get cart from localStorage or create an empty array
		const cart = JSON.parse(localStorage.getItem("cart")) || [];

		// Add new item to cart
		cart.push(cartItem);

		// Save updated cart back to localStorage
		localStorage.setItem("cart", JSON.stringify(cart));

		// Update cart count in the header
		updateCart();

		alert(`${product.title} (Size: ${selectedSize}) added to cart!`);
	});
}

// Initialize the product page
async function init() {
	if (!productId) {
		console.error("No product ID found in URL.");
		return;
	}

	const product = await fetchProductById(productId);
	if (product) {
		displayProduct(product);
	} else {
		console.error("Failed to fetch product data.");
	}
}

init();

// Listen for cart updates and refresh the cart count
window.addEventListener("cartUpdated", updateCart);
