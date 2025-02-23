export async function loadingIndicator() {
	const loader = document.getElementById("loader");

	try {
		loader.classList.remove("hidden");

		const response = await fetch(`https://v2.api.noroff.dev/rainy-days/}`);
		const data = await response.json();
	} catch (error) {
		alert("Error fetching data:", error);
	} finally {
		loader.classList.add("hidden");
	}
}

loadingIndicator();
