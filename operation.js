import * as Library from "./index.js";

let myLibrary = [];

const formDialogEl = document.querySelector("#formDialog");
const formEl = formDialogEl.querySelector("#bookForm");
const addButtonEl = document.querySelector("#main-btn");
const closeButtonEl = document.querySelector("#close-btn");
const submitButtonEl = formEl.querySelector("#submit-btn");
const emptyEl = document.querySelector(".empty");

// For reseting
localStorage.removeItem("library");

if (!localStorage.getItem("library")) {
	Library.saveLibraryToStorage(myLibrary);
	emptyEl.dataset.visible = "true";
} else {
	trackLibraryStorage();

	console.log(myLibrary);
}

addButtonEl.addEventListener("click", () => {
	formDialogEl.showModal();
});

closeButtonEl.addEventListener("click", (e) => {
	formDialogEl.close();
	e.preventDefault();
});

formDialogEl.addEventListener("click", (e) => {
	if (e.target === formDialogEl) {
		formDialogEl.close();
	}
});

submitButtonEl.addEventListener("click", (e) => {
	e.preventDefault();
	const formData = processForm(formEl);
	const book = Library.generateBookObj(formData);
	Library.addBookToLibrary(myLibrary, book, formData.read);
	trackLibraryStorage();
	formDialogEl.close();
});

function processForm(formEl) {
	const bookValue = formEl.elements["book_name"].value;
	const authorValue = formEl.elements["book_author"].value;
	const yearPublishedValue = formEl.elements["book_year"].value;
	const pagesValue = formEl.elements["book_pages"].value;
	const editionValue = formEl.elements["book_edition"].value;
	const readItValue = formEl.elements["book_read"].value;

	return {
		title: bookValue,
		author: authorValue,
		year: yearPublishedValue,
		pages: pagesValue,
		edition: editionValue,
		read: readItValue === "true" ? true : false,
	};
}

function trackLibraryStorage() {
	myLibrary = Library.loadLibraryFromStorage();

	if (myLibrary.length === 0) {
		emptyEl.dataset.visible = "true";
	} else {
		emptyEl.dataset.visible = "false";
	}
}