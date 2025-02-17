const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

async function fetchProduct() {
	try {
		const response = await fetch(
			`https://v2.api.noroff.dev/rainy-days/${productId}`
		);
		const jsonData = await response.json();
		console.log("Fetched Product:", jsonData); //!REMOVE BEFORE SUBMISSION!
		displayProduct(jsonData.data);
	} catch (error) {
		console.error("Error fetching product:", error);
	}
}

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
            <button class="btn">Add to Cart</button>
        </div>
    `;
}

fetchProduct();
