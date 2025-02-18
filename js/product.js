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
            <button class="btn" id="add-to-cart" disabled>Add to Cart</button>
        </div>
    `;

	// Selecting size and enabling the button
	let selectedSize = null;
	const sizeButtons = document.querySelectorAll(".size-btn input");
	const addToCartButton = document.getElementById("add-to-cart");

	sizeButtons.forEach((button) => {
		button.addEventListener("change", (event) => {
			selectedSize = event.target.value;
			console.log("Selected Size:", selectedSize);
			addToCartButton.disabled = false; // Enable button when size is selected
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

		alert(`${product.title} (Size: ${selectedSize}) added to cart!`);
	});
}

fetchProduct();
