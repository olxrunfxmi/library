const myLibrary = [];

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
};

function addBookToLibrary(bookObj, readValue) {
	const book = new Book();
	book.addInfo(bookObj.title, bookObj.author, book.year, book.edition);
	if (readValue) {
		book.setRead(readValue);
	}

	myLibrary.push(book);
}

function renderLibrary(library, holderEl) {}

function generateBookObj(formData) {}

function removeBookFromLibrary(library, id) {
	return library.filter((book) => {
		book.id !== id;
	});
}

// Test
const book = new Book();
book.addInfo("The Winepressr", "Jesus Christ", "0BC", 347);
console.log(book.getDetails());
