import {movieList, profileSection} from "./dom-loader.js";
import {showAddedMovieNotice, currentUser} from "./index.js";
import {eventListenerHandler} from "./index.js";
export let watchList = [];
export let uniqueWatchList = [];

//Add movie to watch lists
export async function addWatchList(id) {
	showAddedMovieNotice();
	if (currentUser) {
		let getCurrentUser = JSON.parse(localStorage.getItem(currentUser));
		let getCurrentUserPassword = getCurrentUser.password;
		if (getCurrentUser.personalWatchList.length != 0) {
			watchList = getCurrentUser.personalWatchList;
			uniqueWatchList = getCurrentUser.personalWatchList;
			console.log("watchList:", watchList);
		}
		watchList.push({
			id: id,
			title: document.getElementById(id + "Title").innerText,
			image: document.getElementById(id + "Img").src,
		});
		const uniqueIds = new Set();
		uniqueWatchList = watchList.filter((element) => {
			const isDuplicate = uniqueIds.has(element.id);
			uniqueIds.add(element.id);
			return !isDuplicate;
		});
		let watchListArray = [];
		for (let i = 0; i < uniqueWatchList.length; i++) {
			let tempObject = {
				id: uniqueWatchList[i].id,
				title: uniqueWatchList[i].title,
				image: uniqueWatchList[i].image,
			};
			watchListArray.push(tempObject);
		}

		let finalObject = {
			password: getCurrentUserPassword,
			personalWatchList: watchListArray,
		};
		console.log("watchList:", watchList);
		console.log("uniqueWatchLIst:", uniqueWatchList);
		localStorage.setItem(currentUser, JSON.stringify(finalObject));
	}
}

//Display watch list
export async function getWatchList() {
	if (!currentUser) {
		movieList.innerHTML = "";
		profileSection.innerHTML = `
            <div class="welcomeUserContainer">
                <div class="welcomeUserText">
                    Please login to add movies to your watchlist!
                </div>
            </div>
        `;
	} else {
		let indivWatchList = JSON.parse(
			localStorage.getItem(currentUser)
		).personalWatchList;
		if (indivWatchList.length == 0) {
			movieList.innerHTML = "";
			profileSection.innerHTML = `
                <div class="welcomeUserContainer">
                    <div class="welcomeUserText">
                        Add movies to your watch list!
                    </div>
                </div>
            `;
		} else {
			let html = "";
			for (let i = 0; i < indivWatchList.length; i++) {
				html += `
                    <div class="movie-grid-card" id="${indivWatchList[i].id}">
                        <img class="movie-poster" src="${indivWatchList[i].image}" id="${indivWatchList[i].id}Img"/>
                        <div class="movie-title" id="${indivWatchList[i].title}Title">
                            <h4 class="movie-text">${indivWatchList[i].title}</h4>
                        </div>
                        <button class="watchlist-movie-button" id="${indivWatchList[i].id}">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
                        </button>
                    </div>
                `;
			}
			movieList.innerHTML = html;
			let getmoviedetails = document.querySelectorAll(".movie-grid-card");
			eventListenerHandler("movie", getmoviedetails);
			let watchlistMovieButton = document.querySelectorAll(".watchlist-movie-button");
			eventListenerHandler("remove", watchlistMovieButton);
		}
	}
}

//Remove movie/TVs from the watchlist after click on trash icon
export function removeWatchList(id) {
	let html = "";
	let tempList = [];
	let tempCurrentUser = JSON.parse(localStorage.getItem(currentUser));
	let tempPassword = tempCurrentUser.password;
	let tempWatchList = tempCurrentUser.personalWatchList;
	for (let i = 0; i < tempWatchList.length; i++) {
		if (tempWatchList[i].id !== id) {
			html += `
                <div class="movie-grid-card" id="${tempWatchList[i].id}">
                    <img class="movie-poster" src="${tempWatchList[i].image}" id="${tempWatchList[i].id}Img"/>
                    <div class="movie-title" id="${tempWatchList[i].title}Title">
                        <h4 class="movie-text">${tempWatchList[i].title}</h4>
                    </div>
                    <button class="watchlist-movie-button" id="${tempWatchList[i].id}">
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
	let getmoviedetails = document.querySelectorAll(".movie-grid-card");
	eventListenerHandler("movie", getmoviedetails);
	let watchlistMovieButton = document.querySelectorAll(".watchlist-movie-button");
	eventListenerHandler("remove", watchlistMovieButton);
}