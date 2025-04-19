function getAndDisplayWordData() {
  // get the user input word from the search box
  let userInput = document.getElementById('word-search-input').value;
  // make a web request using axios to the dictionary api using the user's input word
  axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}`)
    .then(response => {
      console.log(response.data);
      // set the entire response array of data to wordData
      let wordData = response.data;
      // find and assign the word to a variable
      let word = wordData[0].word;
      // find and assign the pronunication to a variable
      let pronunciation = wordData[0].phonetic;
      // find and assign the first definition to a varialbe
      let definition = wordData[0].meanings[0].definitions[0].definition;
      // hide the text on the page that says "try searching for a word"
      document.getElementById('no-word-found').style.display = "none";
      // set the HTML in the word span to be the word variable
      document.getElementById('word').innerText = word;
      // set the HTML in the pronunciation span to be the pronunciation variable
      document.getElementById('pronunciation').innerText = pronunciation;
      // (if using one definition) set the HTML in the definition span to be the definition variable
      // document.getElementById('definition').innerText = definition;
  
      // (if using multiple definitions) find and assign the definitions array to a variable
      let manyDefinitions = wordData[0].meanings[0].definitions;
      // assign the <ol> DOM element to a varaible
      let definitionsList = document.querySelector('#definitions');
      // clear the <ol>
      definitionsList.innerHTML = "";
      // loop through the manyDefinitions arras
      for (let definitionObject of manyDefinitions) {
        // create a <li> DOM element for each definition
        let listItem = document.createElement('li');
        // set the <li> element text to the definition property
        listItem.innerText = definitionObject.definition;
        // add the <li> to the <ol>
        definitionsList.appendChild(listItem);
      }
    });
}
