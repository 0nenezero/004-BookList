function renderBookItem(title, author) {
  const $bookList = document.getElementById("book-list");

  const $bookItem = document.createElement("li");
  $bookItem.classList.add("book-item");

  $bookItem.innerHTML = `
  <div class='info-cont'>
    <p class='title'>${title}</p>
    <p class='author'>${author}</p>
    </div>`;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = `<i class="fa-solid fa-eraser"></i><span class="sr-only">삭제</span>`;
  deleteBtn.addEventListener("click", () => {
    window.confirm(`[${title}]을(를) 삭제하시겠습니까?`) &&
      $bookList.removeChild($bookItem);
    index = Array.from($bookList.children).indexOf($bookItem);
    remoteLocalStorage(index);
  });
  $bookItem.appendChild(deleteBtn);
  $bookList.appendChild($bookItem);
}

const $submit = document.querySelector(".submit-btn");
$submit.addEventListener("click", (e) => {
  e.preventDefault();
  checkSubmitInvalid();
});
function checkSubmitInvalid() {
  const $title = document.getElementById("title");
  const $author = document.getElementById("author");

  if ($title.value === "" || $author.value === "") {
    showToast("모든 항목을 입력해주세요.");
    return;
  } else {
    renderBookItem($title.value, $author.value);
    setLocalStorage($title.value, $author.value);
    $title.value = "";
    $author.value = "";
  }
}

function showToast(message) {
  const $toast = document.querySelector(".toast-modal");
  const $toastTxt = $toast.querySelector(".toast-txt");
  $toastTxt.textContent = message;
  $toast.classList.add("show");
  setTimeout(() => {
    $toast.classList.remove("show");
  }, 2000);
}

function setLocalStorage(title, author) {
  const bookItem = {
    title,
    author,
  };
  const bookList = JSON.parse(localStorage.getItem("bookList")) || [];
  bookList.push(bookItem);
  localStorage.setItem("bookList", JSON.stringify(bookList));
}
function remoteLocalStorage(index) {
  const bookList = JSON.parse(localStorage.getItem("bookList")) || [];
  bookList.splice(index, 1);
  localStorage.setItem("bookList", JSON.stringify(bookList));
}

function initBookList() {
  const bookList = JSON.parse(localStorage.getItem("bookList")) || [];
  bookList.forEach((book) => {
    renderBookItem(book.title, book.author);
  });
}
document.addEventListener("DOMContentLoaded", initBookList);
