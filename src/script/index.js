let root = document.querySelector(":root");
let custome_color_button = document.querySelector(".custome-color-button");
let customeColorList = document.querySelector(".select-custome-color-list");
let customeColorBtns = document.getElementsByClassName(
	"select-custome-color-type"
);
let currentSideBarBtnsId = "";
let currentUser = "";

document
	.querySelector(".dark-light-mode-button")
	.addEventListener("click", () => {
		const currentMainColor =
			getComputedStyle(root).getPropertyValue("--main-color");
		if (currentMainColor === " rgb(29, 30, 30)") {
			root.style.setProperty("--main-color", " rgb(214, 204, 194)");
			root.style.setProperty("--main-light-color", " rgb(245, 235, 224)");
			root.style.setProperty("--secondary-color", " rgb(29, 30, 30)");
			root.style.setProperty("--main-third-color", " rgb(213, 189, 175)");
		} else {
			root.style.setProperty("--main-color", " rgb(29, 30, 30)");
			root.style.setProperty("--main-light-color", " rgb(53, 54, 54)");
			root.style.setProperty("--secondary-color", " rgb(255, 255, 255)");
			root.style.setProperty("--main-third-color", " rgb(89, 91, 91)");
		}
		resetSideBarButton(currentSideBarBtnsId);
	});

//Customize color selector
custome_color_button.addEventListener("click", () => {
	customeColorList.classList.toggle("newCustomeColorList");
});
for (let i = 0; i < customeColorBtns.length; i++) {
	customeColorBtns[i].addEventListener("click", () => {
		customeColorList.classList.toggle("newCustomeColorList");
		const changedStyle = window.getComputedStyle(customeColorBtns[i]);
		const selected_color =
			changedStyle.getPropertyValue("background-color");
		root.style.setProperty("--customize-color", selected_color);
		if (currentSideBarBtnsId) {
			document.getElementById(
				currentSideBarBtnsId
			).style.backgroundColor = selected_color;
		}
		if (currentUser) {
			profileBtns.style.color =
				getComputedStyle(root).getPropertyValue("--customize-color");
		}
	});
}

//Added alert text when added movie/TVs to the watchlist
//Alert text will disappeared after certain seconds
async function showAddedMovieNotice() {
	let addedWatchListText = document.querySelector(
		".movie-added-watchList-text"
	);
	if (currentUser) {
		addedWatchListText.innerText = "Added to your watchlist";
	} else {
		addedWatchListText.innerText =
			"Please login to add movies to your watchlist";
	}
	addedWatchListText.style.opacity = "1";
	await vanishAddedWatchListText(3000);
}
function vanishAddedWatchListText(time) {
	return new Promise((resolve) => {
		setTimeout(() => {
			let addedWatchListText = document.querySelector(
				".movie-added-watchList-text"
			);
			addedWatchListText.style.opacity = "0";
		}, time);
	});
}

//Remove movie/TVs from the watchlist after click on trash icon
function removeWatchList(id) {
	let html = "";
	let tempList = [];
	let tempCurrentUser = JSON.parse(localStorage.getItem(currentUser));
	let tempPassword = tempCurrentUser.password;
	let tempWatchList = tempCurrentUser.personalWatchList;
	for (let i = 0; i < tempWatchList.length; i++) {
		if (tempWatchList[i].id !== id.id) {
			html += `
                <div class="movie-grid-card" onclick="getMovieDetails(id)" id="${tempWatchList[i].id}">
                    <img class="movie-poster" src="${tempWatchList[i].image}" id="${tempWatchList[i].id}Img"/>
                    <div class="movie-title" id="${tempWatchList[i].title}Title">
                        <h4 class="movie-text">${tempWatchList[i].title}</h4>
                    </div>
                    <button class="watchlist-movie-button" onclick="removeWatchList(${tempWatchList[i].id}); event.stopPropagation()">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
                    </button>
                </div>
            `;
			tempList.push({
				id: tempWatchList[i].id,
				title: tempWatchList[i].title,
				image: tempWatchList[i].image,
			});
		}
	}
	let tempObject = {
		password: tempPassword,
		personalWatchList: tempList,
	};
	localStorage.setItem(currentUser, JSON.stringify(tempObject));
	for (let i = 0; i < watchList.length; i++) {
		if (watchList[i].id === id.id) {
			watchList.splice(i, 1);
			i--;
		}
	}
	movieList.innerHTML = html;
}

//Display top 50 movies page when page loaded
document.addEventListener("DOMContentLoaded", function(event){
    document.getElementById("side-bar-button-top50Movies").click();
})
