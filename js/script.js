fetch("https://v2.api.noroff.dev/rainy-days")
	.then(function (response) {
		return response.json();
	})
	.then(function (jsonData) {
		console.log(jsonData);
	});
