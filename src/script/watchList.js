
//Add movie to watch lists
async function addWatchList(id) {
	showAddedMovieNotice();
	if (currentUser) {
		let tempId = id.id;
		let getCurrentUser = JSON.parse(localStorage.getItem(currentUser));
		let getCurrentUserPassword = getCurrentUser.password;
		if (getCurrentUser.personalWatchList.length != 0) {
			watchList = getCurrentUser.personalWatchList;
			uniqueWatchList = getCurrentUser.personalWatchList;
		}
		watchList.push({
			id: tempId,
			title: document.getElementById(tempId + "Title").innerText,
			image: document.getElementById(tempId + "Img").src,
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
async function getWatchList() {
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
                    <div class="movie-grid-card" onclick="getMovieDetails(id)" id="${indivWatchList[i].id}">
                        <img class="movie-poster" src="${indivWatchList[i].image}" id="${indivWatchList[i].id}Img"/>
                        <div class="movie-title" id="${indivWatchList[i].title}Title">
                            <h4 class="movie-text">${indivWatchList[i].title}</h4>
                        </div>
                        <button class="watchlist-movie-button" onclick="removeWatchList(${indivWatchList[i].id}); event.stopPropagation()">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
                        </button>
                    </div>
                `;
			}
			movieList.innerHTML = html;
		}
	}
}
