import * as Library from "./index.js";

let myLibrary = [];
const readSVGProp = {
	class: "icon",
	width: "21",
	height: "32",
	viewBox: "0 0 21 32",
	fill: "none",
	definition: "M0 0H21V32L11 26.5L0 32V0Z",
	fill: "#272727",
};
const deleteSVGProp = {
	width: "25",
	height: "25",
	viewBox: "0 0 25 25",
	fill: "none",
	mask: {
		style: "mask-type:alpha",
		maskUnits: "userSpaceOnUse",
		x: "0",
		y: "0",
		width: "25",
		height: "25",
	},
	rect: {
		x: "0.064209",
		y: "0.0639648",
		width: "24",
		height: "24",
		fill: "#D9D9D9",
	},
	group: "url(#mask0_282_1112)",
	definition:
		"M7.06381 21.064C6.51381 21.064 6.04298 20.8682 5.65133 20.4765C5.25967 20.0848 5.06385 19.614 5.06386 19.064L5.06414 6.06399L4.06414 6.06396L4.06419 4.06396L9.06419 4.06407L9.06421 3.06407L15.0642 3.06421L15.0642 4.06421L20.0642 4.06432L20.0641 6.06432L19.0641 6.06429L19.0639 19.0643C19.0638 19.6143 18.868 20.0851 18.4763 20.4768C18.0847 20.8684 17.6138 21.0643 17.0638 21.0643L7.06381 21.064ZM9.0639 17.0641L11.0639 17.0641L11.0641 8.06412L9.0641 8.06407L9.0639 17.0641ZM13.0639 17.0642L15.0639 17.0642L15.0641 8.06421L13.0641 8.06416L13.0639 17.0642Z",
	fill: "#C8C8C8",
};
const colorOption = ["orange", "blue", "purple", "pink", "red", "green"];

const formDialogEl = document.querySelector("#formDialog");
const formEl = formDialogEl.querySelector("#bookForm");
const addButtonEl = document.querySelector("#main-btn");
const closeButtonEl = document.querySelector("#close-btn");
const submitButtonEl = formEl.querySelector("#submit-btn");
const emptyEl = document.querySelector(".empty");
const mainEl = document.querySelector("main.container");

// For reseting
localStorage.removeItem("library");

if (!localStorage.getItem("library")) {
	Library.saveLibraryToStorage(myLibrary);
	emptyEl.dataset.visible = "true";
} else {
	trackLibraryStorage();
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
	Library.renderLibrary(myLibrary, generateBookElement, mainEl);
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

function generateBookElement(bookData) {
	const sectionEl = document.createElement("section");
	sectionEl.classList.add("book");

	const editionContent = `${bookData.edition} Edition`;
	const editionParaEl = generateElDetails("p", "edition", editionContent);

	const titleEl = generateElDetails("h2", "title", bookData.title);

	const pageContent = `${bookData.pages} pages`;
	const pageEl = generateElDetails("p", "page", pageContent);

	const barEl = document.createElement("div");
	barEl.classList.add("bar");
	const authorEl = generateElDetails("p", "author", bookData.author);
	const yearEl = generateElDetails("p", "year", bookData.year);
	barEl.append(authorEl, yearEl);

	const readSVGEl = createBareSVG(readSVGProp);
	if (bookData.read) {
		sectionEl.dataset.read = "true";
	} else {
		sectionEl.dataset.read = "false";
	}

	const deleteEl = document.createElement("div");
	deleteEl.classList.add("delete");
	const textEl = generateElDetails("span", "text", "Delete");
	const closeButtonEl = document.createElement("button");
	closeButtonEl.classList.add("close");
	const deleteSVGEl = createComplexSVG(deleteSVGProp);
	closeButtonEl.appendChild(deleteSVGEl);
	deleteEl.append(textEl, closeButtonEl);

	sectionEl.append(editionParaEl, titleEl, pageEl, barEl, readSVGEl, deleteEl);
	sectionEl.dataset.color = bookData.color;

	return sectionEl;
}

function generateElDetails(element, classes, content) {
	const el = document.createElement(element);
	if (classes !== "") {
		el.classList.add(classes);
	}
	el.textContent = content;

	return el;
}

function createBareSVG(prop) {
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

	svg.classList.add(prop.class);
	svg.setAttribute("width", prop.width);
	svg.setAttribute("height", prop.height);
	svg.setAttribute("viewbox", prop.viewBox);
	svg.setAttribute("fill", prop.fill);

	path.setAttribute("d", prop.definition);
	path.setAttribute("fill", prop.fill);

	svg.appendChild(path);

	return svg;
}

function createComplexSVG(prop) {
	const SVG_NS = "http://www.w3.org/2000/svg";

	const svg = document.createElementNS(SVG_NS, "svg");
	const mask = document.createElementNS(SVG_NS, "mask");
	const path = document.createElementNS(SVG_NS, "path");
	const rect = document.createElementNS(SVG_NS, "rect");
	const group = document.createElementNS(SVG_NS, "g");

	svg.setAttribute("width", prop.width);
	svg.setAttribute("height", prop.height);
	svg.setAttribute("viewbox", prop.viewBox);
	svg.setAttribute("fill", prop.fill);

	mask.setAttribute("style", prop.mask.style);
	mask.setAttribute("maskUnits", prop.mask.maskUnits);
	mask.setAttribute("x", prop.mask.x);
	mask.setAttribute("y", prop.mask.y);
	mask.setAttribute("width", prop.mask.width);
	mask.setAttribute("height", prop.mask.height);

	rect.setAttribute("x", prop.rect.x);
	rect.setAttribute("y", prop.rect.y);
	rect.setAttribute("width", prop.rect.width);
	rect.setAttribute("height", prop.rect.height);
	rect.setAttribute("fill", prop.rect.fill);

	group.setAttribute("mask", prop.group);

	path.setAttribute("d", prop.definition);
	path.setAttribute("fill", prop.fill);

	mask.appendChild(rect);
	group.appendChild(path);

	svg.appendChild(mask);
	svg.appendChild(group);

	return svg;
}
