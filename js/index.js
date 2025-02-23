import { updateCart } from "./cart.js";
import { fetchProducts, allProducts } from "./api.js";
import { loadingIndicator } from "./loader.js";

async function init() {
	await fetchProducts(displayProducts);
}

init();

/* Index Page */

// Function to display products
function displayProducts(products) {
	const productContainer = document.getElementById("product-list");
	productContainer.innerHTML = "";
	productContainer.classList.add("product-container");

	// Product display card
	products.forEach((product) => {
		const productCard = document.createElement("div");
		productCard.classList.add("product-card");

		productCard.innerHTML = `
			<img src="${product.image.url}" alt="${product.image.alt}">
			<h2>${product.title}</h2>
			<p>$${product.price}</p>
			<a href="./product/index.html?id=${product.id}" class="btn">View Jacket</a>
		`;

		productContainer.appendChild(productCard);
	});
}

// Function to filter products by gendewr and size
function filterProducts() {
	const genderFilter = document.getElementById("gender").value;
	const sizeFilter = document.getElementById("size").value;

	const filteredProducts = allProducts.filter((product) => {
		const matchesGender =
			genderFilter === "all" ||
			product.gender.toLowerCase() === genderFilter.toLowerCase();
		const matchesSize =
			sizeFilter === "all" ||
			(Array.isArray(product.sizes) && product.sizes.includes(sizeFilter));

		return matchesGender && matchesSize;
	});

	displayProducts(filteredProducts);
}

// Function to filter dropdowns
document.getElementById("gender").addEventListener("change", filterProducts);
document.getElementById("size").addEventListener("change", filterProducts);

fetchProducts();

window.addEventListener("cartUpdated", updateCart);

loadingIndicator();
