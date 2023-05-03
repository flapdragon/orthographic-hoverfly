/*
NOTES:
  tabindex="1" on the span or div or whatever element is key ... uh really important. If that element doesn't normally receive that sort of "focus" then it doesn't receive key events by default.
    Example: <span id="oh-hive-input" class="sb-hive-input-placeholder" tabindex="1">
    
*/

// Get text entry element
let inputBox = document.getElementById("oh-hive-input");
// Initialize word list
// TODO: Title case words for the list?
let wordList = [];

// Key handler
const keyHandler = (e) => {
  // console.log(e, e.keyCode, e.key);
  // If placeholder hasn't been reset yet or I guess technically if the user types or pastes this in there somehow
  if (inputBox.innerText === "Type or click") {
    inputBox.innerText = "";
  }
  // If keypress is a valid apzA-Z character, set span text
  if (e.keyCode > 64 && e.keyCode < 91) {
    inputBox.innerText += e.key.toUpperCase();
  }
  // If keyCode is 8 (Backspace), remove last character
  else if (e.keyCode === 8) {
    let str = inputBox.innerText;
    str = str.slice(0, -1);
    inputBox.innerText = str;
  }
  // If keyCode is 13 (Enter), submit the word
  else if (e.keyCode === 13) {
    // Submit word
    submitWord(inputBox.innerText);
    // Clear text
    inputBox.innerText = "Type or click";
  }
}

const submitWord = (word) => {
  console.log(wordList);
  // Validate word
  // https://www.wordsapi.com/
  // https://word.tips/unscramble/yobnaut/ => screen scrape
  // Add to word list
  wordList.push(word);
  let wordListUL = document.getElementById("oh-wordlist-items");
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(word));
  wordListUL.appendChild(li);
  // Update summary text
  let wordSummary = document.getElementById("oh-wordlist-summary");
  wordSummary.innerText = `You have found ${wordList.length} words`;
}

// Add listener to element
inputBox.addEventListener("keydown", keyHandler, true);
