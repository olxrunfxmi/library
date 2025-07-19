const formDialogEl = document.querySelector("#formDialog");
const AddButtonEl = document.querySelector("#main-btn");
const CloseButtonEl = document.querySelector("#close-btn");

AddButtonEl.addEventListener("click", () => {
	formDialogEl.showModal();
});

CloseButtonEl.addEventListener("click", () => {
	formDialogEl.close();
});

formDialogEl.addEventListener("click", (e) => {
	if (e.target === formDialogEl) {
		formDialogEl.close();
	}
});
