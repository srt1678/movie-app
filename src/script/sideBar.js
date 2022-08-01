import {root, sideBarBtns, tableContainer} from "./dom-loader.js";
import {updateCurrentSideBarBtnsId} from "./index.js"
import {getMovie} from "./api.js"

//Side Bar buttons
//Called getMovie API based on the selected button
for (let i = 0; i < sideBarBtns.length; i++) {
	sideBarBtns[i].addEventListener("click", () => {
		updateCurrentSideBarBtnsId(sideBarBtns[i].id);
		let selectSideBarBtns = document.getElementById(sideBarBtns[i].id);
		selectSideBarBtns.style.backgroundColor =
			getComputedStyle(root).getPropertyValue("--customize-color");
		selectSideBarBtns.style.transform = "scale(1.1)";
		resetSideBarButton(sideBarBtns[i].id);
		tableContainer.innerHTML = "";
		getMovie(sideBarBtns[i].id);
	});
}

//After select a button from side bar, the remaining buttons will be reset to original state
export function resetSideBarButton(buttonId) {
	for (let i = 0; i < sideBarBtns.length; i++) {
		if (sideBarBtns[i].id !== buttonId) {
			let resetButton = document.getElementById(sideBarBtns[i].id);
			resetButton.style.backgroundColor =
				getComputedStyle(root).getPropertyValue("--main-light-color");
			resetButton.style.transform = "scale(1)";
		}
	}
}

//Reset all side bar button after click on search/profile etc
export function resetAllSideBar() {
	for (let i = 0; i < sideBarBtns.length; i++) {
		let resetButton = document.getElementById(sideBarBtns[i].id);
		resetButton.style.backgroundColor =
			getComputedStyle(root).getPropertyValue("--main-light-color");
		resetButton.style.transform = "scale(1)";
	}
	updateCurrentSideBarBtnsId("");
}
