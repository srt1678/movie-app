import {root, profileBtns, profileSection, movieList, current_movie_section_label_text, tableContainer} from "./dom-loader.js";
import {resetAllSideBar} from "./sideBar.js";
import {currentUser, updateCurrentUser} from "./index.js";

//Log in HTML that would be used for both log in & log out
let logInTemplate = `
    <div class="profileSectionContainer">
        <div class="block">
        </div>
        <div class="userName-text">
            Username:
        </div>
        <input class="userNameInputBar" id="userNameInputBar" type="text" placeholder="Username"/>
    </div>
    <div class="profileSectionContainer">
        <div class="block">
        </div>
        <div class="password-text">
            Password:
        </div>
        <input class="passwordInputBar" id="passwordInputBar" type="text" placeholder="Password"/>
    </div>
    <div class="errorMessageContainer">
        <div class="error-text">
            Error! Username and Password cannot be empty!
        </div>
    </div>
    <div class="logInButtonContainer">
        <button class="logInButton">
            Log In
        </button>
    </div>
`;

//Click on Profile Icon
profileBtns.addEventListener("click", () => {
	resetAllSideBar();
	tableContainer.innerHTML = "";
	movieList.innerHTML = "";
	if (!currentUser) {
		current_movie_section_label_text.innerText = "Sign Up / Login";
		profileSection.innerHTML = logInTemplate;
		document.querySelector(".logInButton").addEventListener("click", () => logIn());
	} else {
		alreadyLogIn();
	}
});

//Algorithm for log in process
export function logIn() {
	let userNameInputBar = document.getElementById("userNameInputBar");
	let passwordInputBar = document.getElementById("passwordInputBar");
	let errorMessageContainer = document.querySelector(
		".errorMessageContainer"
	);
	if (userNameInputBar.value && passwordInputBar.value) {
		errorMessageContainer.style.display = "none";
		if (localStorage.getItem(userNameInputBar.value) === null) {
			let tempObject = {
				password: passwordInputBar.value,
				personalWatchList: [],
			};
			localStorage.setItem(
				userNameInputBar.value,
				JSON.stringify(tempObject)
			);
			console.log(
				JSON.parse(localStorage.getItem(userNameInputBar.value))
					.password
			);
		} else if (
			JSON.parse(localStorage.getItem(userNameInputBar.value))
				.password !== passwordInputBar.value
		) {
			errorMessageContainer.style.display = "flex";
			document.querySelector(".error-text").innerText =
				"Error! Wrong password!";
			return;
		}
		updateCurrentUser(userNameInputBar.value);
		alreadyLogIn();
		profileBtns.style.color =
			getComputedStyle(root).getPropertyValue("--customize-color");
	} else {
		errorMessageContainer.style.display = "flex";
		document.querySelector(".error-text").innerText =
			"Error! Username and Password cannot be empty!";
	}
}

//Display when click on profile icon after sign in
function alreadyLogIn() {
	current_movie_section_label_text.innerText = "Sign Out";
	profileSection.innerHTML = `
        <div class="welcomeUserContainer">
            <div class="welcomeUserText">
                Hello, <span style="color: var(--customize-color)">${currentUser}</span>!
            </div>
        </div>
        <div class="welcomeUserContainer">
            <div class="welcomeUserText">
                Add movies to your watchlist!
            </div>
        </div>
        <div class="signOutButtonContainer">
            <button class="signOutButton">
                Sign Out
            </button>
        </div>
    `;
	document.querySelector(".signOutButton").addEventListener("click", () => signOut())
}

//When Sign Out button is clicked
export function signOut() {
	updateCurrentUser("");
	current_movie_section_label_text.innerText = "Sign Up / Login";
	profileSection.innerHTML = logInTemplate;
	document.querySelector(".logInButton").addEventListener("click", () => logIn());
	profileBtns.style.color =
		getComputedStyle(root).getPropertyValue("--secondary-color");
}
//localStorage.clear();
