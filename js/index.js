import { updateCart } from "./cart.js";
import { fetchProducts, allProducts } from "./api.js";

async function init() {
	await fetchProducts(displayProducts); // Fetch and display products
	console.log("Products available:", allProducts); // Check if products are fetched
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

	console.log("Selected Gender:", genderFilter);
	console.log("Selected Size:", sizeFilter);

	const filteredProducts = allProducts.filter((product) => {
		const matchesGender =
			genderFilter === "all" ||
			product.gender.toLowerCase() === genderFilter.toLowerCase();
		const matchesSize =
			sizeFilter === "all" ||
			(Array.isArray(product.sizes) && product.sizes.includes(sizeFilter));

		console.log(
			`Checking: ${product.title}, Gender: ${product.gender}, Sizes: ${product.sizes}`
		);
		return matchesGender && matchesSize;
	});

	console.log("Filtered Products:", filteredProducts);
	displayProducts(filteredProducts);
}

// Attach filter function to dropdowns
document.getElementById("gender").addEventListener("change", filterProducts);
document.getElementById("size").addEventListener("change", filterProducts);

// Fetch products when page loads
fetchProducts();

// Listen for cart updates and refresh the cart count
window.addEventListener("cartUpdated", updateCart);
