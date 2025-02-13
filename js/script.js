fetch("https://v2.api.noroff.dev/rainy-days")
	.then(function (response) {
		return response.json();
	})
	.then(function (jsonData) {
		console.log(jsonData);
		const products = jsonData.data;
		displayProducts(products);
	});

function displayProducts(products) {
	const productContainer = document.getElementById("product-list");
	productContainer.classList.add("product-container");

	products.forEach((product) => {
		const productCard = document.createElement("div");
		productCard.classList.add("product-card");

		productCard.innerHTML = `
			<img src="${product.image.url}" alt="${product.image.alt}">
			<h2>${product.title}</h2>
			<p>$${product.price}</p>
			<a href="./product.html?id=${product.id}" class="btn">View Jacket</a>
		  `;

		productContainer.appendChild(productCard);
	});
}
