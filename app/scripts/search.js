const searchBox = document.getElementById('searchBox');
const results = document.getElementById('results');
const natural = require('natural');
const wordnet = new natural.WordNet();

document.addEventListener('click', event => {
    if (event.target.className === 'synonymLink') {
        const word = event.target.innerHTML;
        searchBox.value = word;
        searchForWord(word);
    }
});

searchBox.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        const word = searchBox.value;
        searchForWord(word);
    }
});

function searchForWord(word) {
    results.innerHTML = '';
    wordnet.lookup(word, details => {
        details.forEach(detail => {
            let pos = '';
            switch (detail.pos) {
                case 'n':
                    pos = 'noun';
                    break;
                case 'v':
                    pos = 'verb';
                    break;
                case 'a':
                    pos = 'adjective';
                    break;
                case 's':
                    pos = 'adjective';
                    break;
                case 'r':
                    pos = 'adverb';
                    break;
                default:
                    pos = '';
                    break;
            }

            const wordType = document.createElement('p');
            wordType.innerHTML = pos;
            wordType.className = 'wordType';
            results.appendChild(wordType);

            const definition = document.createElement('p');
            definition.innerHTML = detail.def;
            definition.className = 'definition';
            results.appendChild(definition);

            if (detail.synonyms.length) {
                const synonymText = document.createTextNode('Synonyms: ');
                const synonymParagraph = document.createElement('p');
                synonymParagraph.appendChild(synonymText);

                detail.synonyms.forEach(synonym => {
                    const currentSynonym = document.createElement('a');
                    currentSynonym.innerHTML = synonym;
                    currentSynonym.className = 'synonymLink';
                    synonymParagraph.appendChild(currentSynonym);
                    const spacer = document.createTextNode(' ');
                    synonymParagraph.appendChild(spacer);
                });

                synonymParagraph.className = 'synonym'
                results.appendChild(synonymParagraph);
            }

            detail.exp.forEach(example => {
                const currentExample = document.createElement('p');
                currentExample.innerHTML = example;
                currentExample.className = 'example';
                results.appendChild(currentExample);
            });

            const divider = document.createElement('div');
            divider.className = 'divider';
            results.appendChild(divider);
        });
    });
}
