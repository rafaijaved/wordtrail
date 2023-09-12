function fetchWords() {
  const startLetter = document.getElementById("startLetter").value;
  const endLetter = document.getElementById("endLetter").value;
  const wordList = document.getElementById("wordList");

  if (startLetter && endLetter) {
    fetch(`https://api.datamuse.com/words?sp=${startLetter}*${endLetter}`)
      .then((response) => response.json())
      .then((data) => {
        wordList.innerHTML = "";
        if (data.length === 0) {
          wordList.innerHTML =
            '<div class="placeholder-message">No words found.</div>';
        } else {
          data.forEach((wordObj) => {
            const li = document.createElement("li");
            li.textContent = wordObj.word;
            wordList.appendChild(li);
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching words:", error);
      });
  } else {
    alert("Please enter both start and end letters.");
  }
}

function resetWords() {
  const wordList = document.getElementById("wordList");
  wordList.innerHTML = "";
  document.getElementById("startLetter").value = "";
  document.getElementById("endLetter").value = "";
}

function toggleCategories() {
  const dropdown = document.getElementById("categoriesDropdown");
  if (dropdown.style.maxHeight === "0px" || !dropdown.style.maxHeight) {
    dropdown.style.maxHeight = "200px"; // You can adjust this value
  } else {
    dropdown.style.maxHeight = "0px";
  }
}
