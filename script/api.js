const API_KEY = "Temp";
let movieList = document.getElementById("movie-list");
let current_movie_section_label_text = document.querySelector(
	".current-movie-section-label-text"
);
let movieDetails = document.getElementById("movie-details");
let movie_details = document.querySelector(".movie-details");
let darkBackground = document.querySelector(".dark-background");
let tableContainer = document.getElementById("boxOfficeTableContainer");

//Display all movies in the movie section
async function getMovie(movieListType) {
	profileSection.innerHTML = "";
	let response = "";
	let needTrim = true;
	switch (movieListType) {
		case "side-bar-button-top50Movies":
			response = await fetch(
				`https://imdb-api.com/en/API/Top250Movies/${API_KEY}`
			);
			current_movie_section_label_text.innerText = "Top 50 Movies";
			
			break;
		case "side-bar-button-top50TVs":
			response = await fetch(
				`https://imdb-api.com/en/API/Top250TVs/${API_KEY}`
			);
			current_movie_section_label_text.innerText = "Top 50 TVs";
			
			break;
		case "side-bar-button-popularMovies":
			response = await fetch(
				`https://imdb-api.com/en/API/MostPopularMovies/${API_KEY}`
			);
			current_movie_section_label_text.innerText = "Most Popular movies";
			
			break;
		case "side-bar-button-popularTVs":
			response = await fetch(
				`https://imdb-api.com/en/API/MostPopularTVs/${API_KEY}`
			);
			current_movie_section_label_text.innerText = "Most Popular TVs";
			needTrim = false;
			break;
		case "side-bar-button-inTheaters":
			response = await fetch(
				`https://imdb-api.com/en/API/InTheaters/${API_KEY}`
			);
			current_movie_section_label_text.innerText = "In Theaters";
			break;
		case "side-bar-button-boxOffice":
			response = await fetch(
				`https://imdb-api.com/en/API/BoxOffice/${API_KEY}`
			);
			current_movie_section_label_text.innerText = "Box Office";
			break;
		case "side-bar-button-boxOfficeAlltime":
			current_movie_section_label_text.innerText = "Box Office All Time";
			return getBoxOffice();
		case "side-bar-button-myWatchList":
			current_movie_section_label_text.innerText = "My Watchlist";
			return getWatchList();
		default:
			return console.log("Error! List not found");
	}
	const data = await response.json();
	let count = 1;
	let html = "";
	if (data.items) {
		data.items.forEach((movie) => {
			if (count <= 50) {
				html += `
                    <div class="movie-grid-card" onclick="getMovieDetails(id)" id="${movie.id}">
                        <img class="movie-poster" src="
                `;
				if (needTrim) {
					const movieImageFirstHalf = movie.image.substring(
						0,
						movie.image.length - 32
					);
					const movieImageSecondHalf = movie.image.substring(
						movie.image.length - 4
					);
					html += movieImageFirstHalf + movieImageSecondHalf;
				} else {
					html += movie.image;
				}
				html += `" id="${movie.id}Img">
                    <div class="movie-title" id="${movie.id}Title">
                            <h4 class="movie-text">`;
				if (movie.fullTitle) {
					html += movie.fullTitle;
				} else {
					html += movie.title;
				}
				html += `
                            </h4>
                        </div>
                        <button class="watchlist-movie-button" onclick="addWatchList(${movie.id}); event.stopPropagation()">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" t="1551322312294" viewBox="0 0 1024 1024" version="1.1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"></path><path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"></path></svg>
                    </button>
                    </div>
                `;
				count++;
			}
		});
		movieList.innerHTML = html;
	} else {
		console.log("Unknown error!");
	}
}

//Display the movie details after select a movie
async function getMovieDetails(id) {
	movie_details.style.visibility = "visible";
	darkBackground.style.visibility = "visible";
	const response = await fetch(
		`https://imdb-api.com/en/API/Title/${API_KEY}/${id}`
	);
	const data = await response.json();
	const trailerResponse = await fetch(
		`https://imdb-api.com/en/API/Trailer/${API_KEY}/${id}`
	);
	const tailerData = await trailerResponse.json();
	let html = "";
	if (data) {
		html += `
        	<div class="movie-detail-poster-container">
				<img class="movie-detail-poster" src="${data.image}" />
			</div>
			<button class="movie-detail-return-btn">
				<svg
					stroke="currentColor"
					fill="currentColor"
					stroke-width="0"
					viewBox="0 0 512 512"
					height="1em"
					width="1em"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M256 16C123.45 16 16 123.45 16 256s107.45 240 240 240 240-107.45 240-240S388.55 16 256 16zm0 60c99.41 0 180 80.59 180 180s-80.59 180-180 180S76 355.41 76 256 156.59 76 256 76zm-80.625 60c-.97-.005-2.006.112-3.063.313v-.032c-18.297 3.436-45.264 34.743-33.375 46.626l73.157 73.125-73.156 73.126c-14.63 14.625 29.275 58.534 43.906 43.906L256 299.906l73.156 73.156c14.63 14.628 58.537-29.28 43.906-43.906l-73.156-73.125 73.156-73.124c14.63-14.625-29.275-58.5-43.906-43.875L256 212.157l-73.156-73.125c-2.06-2.046-4.56-3.015-7.47-3.03z"
					></path>
				</svg>
			</button>
			<div class="movie-details-description-container">
				<h1 class="movie-details-description-title">${data.title}</h1>
			</div>
			<div class="overall-subInfo-container">
                <h4 class="movie-details-description-subInfo">
					&nbsp ${data.year} &nbsp &#xB7 &nbsp
					${data.runtimeStr} &nbsp &#xB7 &nbsp
					${data.contentRating}
                </h4>
				<div class="movie-details-description-rating-container">
					<svg
						stroke="currentColor"
						fill="none"
						stroke-width="2"
						viewBox="0 0 24 24"
						stroke-linecap="round"
						stroke-linejoin="round"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<polygon
							points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
						></polygon>
					</svg>
					&nbsp ${data.imDbRating}
				</div>
			</div>
			<div class="movie-description-container">
				<h3 class="movie-description-text">
					${data.plot}
				</h3>
			</div>
			<div class="movie-description-director-container">
				<h4>Director: &nbsp
        `;
		if (data.type === "TVSeries") {
			html += data.tvSeriesInfo.creators;
		} else {
			html += data.directors;
		}
		html += `</h4>
			</div>
			<div class="movie-description-stars-container">
				<h4>
					Stars: &nbsp ${data.stars}
				</h4>
			</div>
			<div class="trailer-container">
                <a href="${tailerData.link}" target="_blank">
                    <button class="trailer-icon">
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 1024 1024"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
                            ></path>
                            <path
                                d="M719.4 499.1l-296.1-215A15.9 15.9 0 0 0 398 297v430c0 13.1 14.8 20.5 25.3 12.9l296.1-215a15.9 15.9 0 0 0 0-25.8zm-257.6 134V390.9L628.5 512 461.8 633.1z"
                            ></path>
                        </svg>
                    </button>
                </a>
			</div>
        `;
		movieDetails.innerHTML = html;
		document
			.querySelector(".movie-detail-return-btn")
			.addEventListener("click", function () {
				movie_details.style.visibility = "hidden";
				darkBackground.style.visibility = "hidden";
			});
	} else {
		console.log("Unknown error when displaying movie details!");
	}
}

//Search the movie based on the genre type and the search bar input
//Reset all side bar buttons to their original states
async function searching() {
	let response = "";
	tableContainer.innerHTML = "";
	switch (search_genreType_button.innerText) {
		case "All":
			response = await fetch(
				`https://imdb-api.com/en/API/Search/${API_KEY}/${searchBar.value}`
			);
			break;
		case "Movies":
			response = await fetch(
				`https://imdb-api.com/en/API/SearchMovie/${API_KEY}/${searchBar.value}`
			);
			break;
		case "TV Episodes":
			response = await fetch(
				`https://imdb-api.com/en/API/SearchSeries/${API_KEY}/${searchBar.value}`
			);
			break;
		case "Celebs":
			response = await fetch(
				`https://imdb-api.com/en/API/SearchName/${API_KEY}/${searchBar.value}`
			);
			break;
		default:
			return console.log("Error when searching!");
	}
	const data = await response.json();
	let html = "";
	if (data.results.length != 0) {
		data.results.forEach((movie) => {
			if (movie.image.length >= 84) {
				html += `
                <div class="movie-grid-card" onclick="getMovieDetails(id)" id="${movie.id}">
                            <img class="movie-poster" src="${movie.image}">
                            <div class="movie-title">
                                <h4 class="movie-text">
                                    ${movie.title}
                                </h4>
                            </div>
                        </div>
                `;
			}
		});
		current_movie_section_label_text.innerText = `Results for \"${searchBar.value}\"`;
	} else {
		current_movie_section_label_text.innerText = `Unable to find \"${searchBar.value}\"`;
	}
	movieList.innerHTML = html;
	resetAllSideBar();
}

//Get Box Office table
async function getBoxOffice() {
	let response = await fetch(
		`https://imdb-api.com/en/API/BoxOfficeAllTime/${API_KEY}`
	);
	const data = await response.json();
	let html = "";
	if (data.items) {
		html += `
            <table class="boxOfficeTable">
                <thread>
                    <th>Rank</th>
                    <th>Title</th>
                    <th>World Wide Life Time Gross</th>
                    <th>Domestic Life Time Gross</th>
                    <th>Domestic</th>
                    <th>Foreign Life Time Gross</th>
                    <th>Foreign</th>
                    <th>Year</th>
                </thread>
                <tbody>
        `;
		for (let i = 0; i < 50; i++) {
			html += `
                <tr>
                    <td data-label="rank">${data.items[i].rank}</td>
                    <td data-label="title">${data.items[i].title}</td>
                    <td data-label="worldWideLifeTimeCross">${data.items[i].worldwideLifetimeGross}</td>
                    <td data-label="domesticLifeTimeGross">${data.items[i].domesticLifetimeGross}</td>
                    <td data-label="domestic">${data.items[i].domestic}</td>
                    <td data-label="foreignLifeTimeGross">${data.items[i].foreignLifetimeGross}</td>
                    <td data-label="foreign">${data.items[i].foreign}</td>
                    <td data-label="year">${data.items[i].year}</td>
                </tr>                                                               
            `;
		}
		html += `
                </tbody>
            </table>
        `;
		movieList.innerHTML = "";
		tableContainer.innerHTML = html;
	} else {
		console.log("Unknown error when fetching box office data!");
	}
}
