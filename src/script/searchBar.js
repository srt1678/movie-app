let search_genreType_button = document.querySelector(
	".search-genreType-button"
);
let searchGenrelist = document.querySelector(".search-genreType-list");
let searchBar = document.getElementById("search-bar");
let searchGenreBtns = document.getElementsByClassName(
	"select-search-genreType"
);

//Search Genre buttons & list
//Having drop down menu with toggle animation
//Replace the default search genre with the newest selected one
for (let i = 0; i < searchGenreBtns.length; i++) {
	searchGenreBtns[i].addEventListener("click", () => {
		let temp = search_genreType_button.innerText;
		search_genreType_button.innerText = searchGenreBtns[i].innerText;
		searchGenreBtns[i].innerText = temp;
		searchGenrelist.classList.toggle("newList");
	});
}

//Expand the drop down list of search genre button
search_genreType_button.addEventListener("click", () => {
	searchGenrelist.classList.toggle("newList");
});

//Search bar and search button
document
	.querySelector(".search-button")
	.addEventListener("click", async function () {
		await searching();
	});
searchBar.addEventListener("keyup", async function () {
	if (event.key == "Enter") {
		await searching();
	}
});
