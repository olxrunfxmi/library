const colorOption = ["orange", "blue", "purple", "pink", "red", "green"];

function Book() {
	if (!new.target) {
		throw Error("Can generate Book object unless it's an instance");
	}

	this.id = crypto.randomUUID();
	this.color = colorOption[Math.floor(Math.random() * 6)];
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
	toJSON() {
		return {
			id: this.id,
			title: this.title,
			author: this.author,
			year: this.year,
			pages: this.pages,
			edition: this.edition,
			read: this.read || false,
			color: this.color,
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
	book.color = data.color;
	return book;
};

function addBookToLibrary(library, book, readValue) {
	if (readValue) {
		book.setRead(readValue);
	}

	library.push(book);
	saveLibraryToStorage(library);
}

function renderLibrary(library, generateFunc, holderEl) {
	library.forEach((book) => {
		renderBook(book, generateFunc, holderEl);
	});
}

function renderBook(book, generateFunc, holderEl) {
	const bookData = book.toJSON();
	const bookEl = generateFunc(bookData);
	holderEl.appendChild(bookEl);
}

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

function getLibraryBreakdown(library) {
	const booksBreakdown = {
		noBooks: 0,
		noReadBooks: 0,
		totalPages: 0,
	};

	library.forEach((book) => {
		booksBreakdown.noBooks++;
		const bookJSON = book.toJSON();
		if (bookJSON.read === true) {
			booksBreakdown.noReadBooks++;
		}
		booksBreakdown.totalPages += Number(bookJSON.pages);
	});

	return booksBreakdown;
}

export {
	Book,
	addBookToLibrary,
	renderLibrary,
	generateBookObj,
	renderBook,
	removeBookFromLibrary,
	loadLibraryFromStorage,
	saveLibraryToStorage,
	getLibraryBreakdown,
};
