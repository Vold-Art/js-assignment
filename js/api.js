export let allProducts = []; // Export global variable

// Function to fetch products from API
export async function fetchProducts(displayProducts) {
	try {
		const response = await fetch("https://v2.api.noroff.dev/rainy-days");
		const jsonData = await response.json();
		console.log("Fetched Data:", jsonData); // Console.log fetched data !REMOVE BEFORE SUBMISSION!
		allProducts = jsonData.data; // Store API data globally

		// Call the display function if provided
		if (typeof displayProducts === "function") {
			displayProducts(allProducts);
		}
	} catch (error) {
		console.error("Error fetching products:", error);
	}
}

export async function fetchProductById(productId) {
	try {
		const response = await fetch(
			`https://v2.api.noroff.dev/rainy-days/${productId}`
		);
		const jsonData = await response.json();
		console.log("Fetched Product:", jsonData); // !REMOVE BEFORE SUBMISSION!
		return jsonData.data; // Return product data
	} catch (error) {
		console.error("Error fetching product:", error);
		return null; // Return null if there's an error
	}
}
