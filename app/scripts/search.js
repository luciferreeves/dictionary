const searchBox = document.getElementById('searchBox');
const natural = require('natural');
const wordnet = new natural.WordNet();

searchBox.addEventListener('keyup', () => {
    const word = searchBox.value;
    wordnet.lookup(word, details => {
        console.log(details);
    });
});
