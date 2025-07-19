function Book() {
	if (!new.target) {
		throw Error("Can generate Book object unless it's an instance");
	}

	this.id = crypto.randomUUID();
}

Book.prototype = {
	addInfo(title, author, year, pages, edition) {
		this.title = title;
		this.author = author;
		this.year = year;
		this.pages = pages;
		this.edition = edition ? edition : "1st";
	},
	setRead(read) {
		this.read = read;
	},
	getDetails() {
		return {
			title: this.title,
			author: this.author,
			year: this.year,
			pages: this.pages,
			edition: this.edition,
			read: this.read ? this.read : false,
		};
	},
	toJSON() {
		return {
			id: this.id,
			id: this.id,
			title: this.title,
			author: this.author,
			year: this.year,
			pages: this.pages,
			edition: this.edition,
			read: this.read || false,
		};
	},
};

Book.fromJSON = function (data) {
	const book = new Book();
	book.id = data.id;
	book.title = data.title;
	book.author = data.author;
	book.year = data.year;
	book.pages = data.pages;
	book.edition = data.edition;
	book.read = data.read;
	return book;
};

function addBookToLibrary(library, book, readValue) {
	if (readValue) {
		book.setRead(readValue);
	}

	library.push(book);
	saveLibraryToStorage(library);
}

function renderLibrary(library, holderEl) {}

function generateBookObj(formData) {
	const book = new Book();
	book.addInfo(
		formData.title,
		formData.author,
		formData.year,
		formData.pages,
		formData.edition
	);
	return book;
}

function removeBookFromLibrary(library, id) {
	return library.filter((book) => {
		book.id !== id;
	});
}

function saveLibraryToStorage(library) {
	const serializedLibrary = library.map((book) => book.toJSON());
	localStorage.setItem("library", JSON.stringify(serializedLibrary));
	console.log("Saved");
}

function loadLibraryFromStorage() {
	const storedData = localStorage.getItem("library");
	if (!storedData) return [];

	const parsedData = JSON.parse(storedData);
	return parsedData.map((bookData) => Book.fromJSON(bookData));
}

export {
	Book,
	addBookToLibrary,
	renderLibrary,
	generateBookObj,
	removeBookFromLibrary,
	loadLibraryFromStorage,
	saveLibraryToStorage,
};
