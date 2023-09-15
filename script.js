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

            const tdPronunciation = document.createElement("td");
            tdPronunciation.textContent =
              wordObj.pron || "No pronunciation found."; // Correctly handle absence of pronunciation

            tr.appendChild(tdWord);
            tr.appendChild(tdDefinition);
            tr.appendChild(tdPartOfSpeech);
            tr.appendChild(tdPronunciation);

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

function fetchWordDetails(word) {
  const apiUrl = `https://api.datamuse.com/words?sp=${word}&md=dfr`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.length > 0) {
        const wordData = data[0];
        document.getElementById("wordTitle").textContent = wordData.word;
        document.getElementById("wordDefinition").textContent = wordData.defs
          ? wordData.defs[0].split("\t")[1]
          : "No definition found.";
        document.getElementById("wordPartOfSpeech").textContent = wordData.tags
          ? wordData.tags[0]
          : "No part of speech found.";
        document.getElementById("wordPronunciation").textContent = wordData.pron
          ? wordData.pron
          : "No pronunciation found.";
        document.getElementById("wordDetails").style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Error fetching word details:", error);
    });
}
