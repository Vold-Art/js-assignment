import { updateCart } from "./cart.js";
import { fetchProductById } from "./api.js";
import { loadingIndicator } from "./loader.js";

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

	// Size and Add to Cart buttons
	let selectedSize = null;
	const sizeButtons = document.querySelectorAll(".size-btn");
	const addToCartButton = document.getElementById("add-to-cart");

	sizeButtons.forEach((button) => {
		button.addEventListener("click", (event) => {
			sizeButtons.forEach((btn) => btn.classList.remove("selected"));
			button.classList.add("selected");

			selectedSize = button.querySelector("input").value;
			addToCartButton.disabled = false;
		});
	});

	addToCartButton.addEventListener("click", function () {
		if (!selectedSize) {
			return;
		}

		const cartItem = {
			id: product.id,
			title: product.title,
			size: selectedSize,
			price: product.price,
			image: product.image.url,
		};

		const cart = JSON.parse(localStorage.getItem("cart")) || [];
		cart.push(cartItem);
		localStorage.setItem("cart", JSON.stringify(cart));

		updateCart();

		addToCartButton.textContent = "Added to Cart";
	});
}

async function init() {
	if (!productId) {
		alert("No product ID found in URL.");
		return;
	}

	const product = await fetchProductById(productId);
	if (product) {
		displayProduct(product);
	} else {
		alert("Failed to fetch product data.");
	}
}

init();

loadingIndicator();
