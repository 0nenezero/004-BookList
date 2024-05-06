function renderBookItem(title, author) {
  const $bookList = document.getElementById("book-list");

  const $bookItem = document.createElement("li");
  $bookItem.classList.add("book-item");

  const $title = document.createElement("p");
  $title.classList.add("title");
  $title.textContent = title;
  $bookItem.appendChild($title);

  const $author = document.createElement("p");
  $author.classList.add("author");
  $author.textContent = author;
  $bookItem.appendChild($author);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = `<i class="fa-solid fa-eraser"></i><span class="sr-only">삭제</span>`;
  deleteBtn.addEventListener("click", () => {
    window.confirm(`[${title}]을(를) 삭제하시겠습니까?`) &&
      $bookList.removeChild($bookItem);
  });
  $bookItem.appendChild(deleteBtn);

  $bookList.appendChild($bookItem);
}

renderBookItem("자바스크립트 완벽 가이드", "데이비드 플래너건");

const $submit = document.querySelector(".submit-btn");
$submit.addEventListener("click", (e) => {
  e.preventDefault();
  checkSubmitInvalid();
});
function checkSubmitInvalid() {
  const $title = document.getElementById("title");
  const $author = document.getElementById("author");

  if ($title.value === "" || $author.value === "") {
    timeToast("모든 항목을 입력해주세요.");
    return;
  } else {
    renderBookItem($title.value, $author.value);
    $title.value = "";
    $author.value = "";
  }
}

function timeToast(message) {
  const $toast = document.querySelector(".toast-modal");
  const $toastTxt = $toast.querySelector(".toast-txt");
  $toastTxt.textContent = message;
  $toast.classList.add("show");
  setTimeout(() => {
    $toast.classList.remove("show");
  }, 2000);
}
