//index.js
export let root = document.querySelector(":root");
export let custome_color_button = document.querySelector(".custome-color-button");
export let customeColorList = document.querySelector(".select-custome-color-list");
export let customeColorBtns = document.getElementsByClassName(
	"select-custome-color-type"
);

//API.js
export let movieList = document.getElementById("movie-list");
export let current_movie_section_label_text = document.querySelector(
	".current-movie-section-label-text"
);
export let movieDetails = document.getElementById("movie-details");
export let movie_details = document.querySelector(".movie-details");
export let darkBackground = document.querySelector(".dark-background");
export let tableContainer = document.getElementById("boxOfficeTableContainer");

//profile.js
export let profileBtns = document.querySelector(".profile-button");
export let profileSection = document.getElementById("profileSection");

//searchBar.js
export let search_genreType_button = document.querySelector(
	".search-genreType-button"
);
export let searchGenrelist = document.querySelector(".search-genreType-list");
export let searchBar = document.getElementById("search-bar");
export let searchGenreBtns = document.getElementsByClassName(
	"select-search-genreType"
);

//sideBar.js
export let sideBarBtns = document.getElementsByClassName("side-bar-boxes-button");