import {root, custome_color_button, customeColorList, customeColorBtns, profileBtns} from "./dom-loader.js";
import {resetSideBarButton} from "./sideBar.js";
import { getMovieDetails } from "./api.js";
import {addWatchList, removeWatchList} from "./watchList.js";
export let currentSideBarBtnsId = "";
export let currentUser = "";

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
		if(!currentUser){
			profileBtns.style.color =
				getComputedStyle(root).getPropertyValue("--secondary-color");
		}
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
export async function showAddedMovieNotice() {
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

//Update the info of currently selected side bar button
export function updateCurrentSideBarBtnsId(sideBarId){
	currentSideBarBtnsId = sideBarId;
}

//Update the info of currently selected user name
export function updateCurrentUser(userName){
	currentUser = userName;
}

//addEventListener handler for html in js
export function eventListenerHandler(type, query){
	if(type === "movie"){
		for(let i = 0; i < query.length; i++){
			query[i].addEventListener("click", () => getMovieDetails(query[i].id))
		}
	}
	if(type === "watchlist"){
		for(let i = 0; i < query.length; i++){
			query[i].addEventListener("click", (event) => {
				event.stopPropagation();
				addWatchList(query[i].id);
			})
		}
	}
	if(type === "remove"){
		for(let i = 0; i < query.length; i++){
			query[i].addEventListener("click", (event) => {
				event.stopPropagation();
				removeWatchList(query[i].id);
			})
		}
	}
}

//Display top 50 movies page when page loaded
document.addEventListener("DOMContentLoaded", function(event){
    document.getElementById("side-bar-button-top50Movies").click();
})