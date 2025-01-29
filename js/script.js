/* const NOROFF_API_URL = "https://v2.api.noroff.dev";

const options = {
	headers: {
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVm9sZCIsImVtYWlsIjoiYXJudm9sMDQwNDdAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3MzgxODI4NzZ9.FZ69Q0tc2g6qAySTCvGuQrVvjLC3Ryc2MIbGZxxw_HU",
		"X-Noroff-API-Key": "0057b24a-6960-40c1-a3ef-a39c85a1c755",
	},
};

async function fetchData() {
	try {
		const response = await fetch(`${NOROFF_API_URL}/rainy-days`, options);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

fetchData(); */

fetch("https://v2.api.noroff.dev/rainy-days")
	.then(function (response) {
		return response.json();
	})
	.then(function (jsonData) {
		console.log(jsonData);
	});
