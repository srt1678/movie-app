//index.js
let root = document.querySelector(":root");
let custome_color_button = document.querySelector(".custome-color-button");
let customeColorList = document.querySelector(".select-custome-color-list");
let customeColorBtns = document.getElementsByClassName(
	"select-custome-color-type"
);

//API.js
let movieList = document.getElementById("movie-list");
let current_movie_section_label_text = document.querySelector(
	".current-movie-section-label-text"
);
let movieDetails = document.getElementById("movie-details");
let movie_details = document.querySelector(".movie-details");
let darkBackground = document.querySelector(".dark-background");
let tableContainer = document.getElementById("boxOfficeTableContainer");

//profile.js
let profileBtns = document.querySelector(".profile-button");
let profileSection = document.getElementById("profileSection");
let logInButton = document.querySelector(".logInButton");

//searchBar.js
let search_genreType_button = document.querySelector(
	".search-genreType-button"
);
let searchGenrelist = document.querySelector(".search-genreType-list");
let searchBar = document.getElementById("search-bar");
let searchGenreBtns = document.getElementsByClassName(
	"select-search-genreType"
);

//sideBar.js
let sideBarBtns = document.getElementsByClassName("side-bar-boxes-button");

//watchList.js
let watchList = [];
let uniqueWatchList = [];