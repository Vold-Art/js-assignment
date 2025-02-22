export let allProducts = []; // Export API

// Fetch products from API
export async function fetchProducts(displayProducts) {
	try {
		const response = await fetch("https://v2.api.noroff.dev/rainy-days");
		const jsonData = await response.json();
		allProducts = jsonData.data;

		if (typeof displayProducts === "function") {
			displayProducts(allProducts);
		}
	} catch (error) {
		console.error("Error fetching products:", error);
	}
}

// Fetch a single product by its ID
export async function fetchProductById(productId) {
	try {
		const response = await fetch(
			`https://v2.api.noroff.dev/rainy-days/${productId}`
		);
		const jsonData = await response.json();
		return jsonData.data;
	} catch (error) {
		console.error("Error fetching product:", error);
		return null;
	}
}
