const searchBox = document.getElementById('searchBox');
const results = document.getElementById('results');
const natural = require('natural');
const wordnet = new natural.WordNet();

searchBox.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        const word = searchBox.value;
        wordnet.lookup(word, details => {
            console.log(details);
            details.forEach(detail => {
                const definition = document.createElement('p');
                definition.innerHTML = detail.def;
                definition.className = 'definition';
                results.appendChild(definition);
            });
        });
    }
});
