function fetchWords() {
  const startLetter = document.getElementById("startLetter").value;
  const endLetter = document.getElementById("endLetter").value;
  const wordLength = parseInt(document.getElementById("wordLength").value);
  const wordList = document.querySelector(".main-wordlist");

  let apiUrl = `https://api.datamuse.com/words?sp=${startLetter}*${endLetter}`;

  if (startLetter && endLetter) {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        wordList.innerHTML = "";
        const filteredData = wordLength
          ? data.filter((wordObj) => wordObj.word.length === wordLength)
          : data;
        if (filteredData.length === 0) {
          wordList.innerHTML =
            '<li class="placeholder-message">No words found.</li>';
        } else {
          filteredData.forEach((wordObj) => {
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
    dropdown.style.maxHeight = "250px";
  } else {
    dropdown.style.maxHeight = "0px";
  }
}

function fetchWordsForDictionary() {
  const startLetter = document.getElementById("startLetter").value;
  const endLetter = document.getElementById("endLetter").value;
  const wordLength = parseInt(document.getElementById("wordLength").value);
  const wordTableBody = document.querySelector(".dictionary-wordlist");

  let apiUrl = `https://api.datamuse.com/words?sp=${startLetter}*${endLetter}&md=dpr`; // Added 'p' for pronunciation

  if (startLetter && endLetter) {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        wordTableBody.innerHTML = "";
        const filteredData = wordLength
          ? data.filter((wordObj) => wordObj.word.length === wordLength)
          : data;
        if (filteredData.length === 0) {
          wordTableBody.innerHTML =
            '<tr><td colspan="4" class="placeholder-message">No words found.</td></tr>';
        } else {
          filteredData.forEach((wordObj) => {
            const tr = document.createElement("tr");

            const tdWord = document.createElement("td");
            tdWord.textContent = wordObj.word;

            const tdDefinition = document.createElement("td");
            tdDefinition.textContent = wordObj.defs
              ? wordObj.defs[0].split("\t")[1]
              : "No definition found.";

            const tdPartOfSpeech = document.createElement("td");
            tdPartOfSpeech.textContent = wordObj.tags
              ? wordObj.tags[0]
              : "No part of speech found.";

            tr.appendChild(tdWord);
            tr.appendChild(tdDefinition);
            tr.appendChild(tdPartOfSpeech);

            wordTableBody.appendChild(tr);
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
