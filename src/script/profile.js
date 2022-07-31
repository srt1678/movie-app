
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
        <button class="logInButton" onclick="logIn()">
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
	} else {
		alreadyLogIn();
	}
});

//Algorithm for log in process
function logIn() {
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
		currentUser = userNameInputBar.value;
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
            <button class="signOutButton" onclick="signOut()">
                Sign Out
            </button>
        </div>
    `;
}

//When Sign Out button is clicked
function signOut() {
	currentUser = "";
	current_movie_section_label_text.innerText = "Sign Up / Login";
	profileSection.innerHTML = logInTemplate;
	profileBtns.style.color =
		getComputedStyle(root).getPropertyValue("--secondary-color");
}
//localStorage.clear();
