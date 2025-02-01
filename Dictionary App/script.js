class Dictionary {
    constructor() {
        this.searchInput = document.getElementById('search-input');
        this.searchButton = document.getElementById('search-button');
        this.result = document.getElementById('result');
        this.audio = null;

        this.searchButton.addEventListener('click', () => {
            this.searchWord();
        });

        this.searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                this.searchWord();
            }
        });
    }

    async searchWord() {
        const word = this.searchInput.value.trim();
        if (!word) return;

        try {
            const result = await this.fetchWordData(word);
            this.displayResult(result);
        } catch (error) {
            this.showError("Word not found");
        }
    }

    async fetchWordData(word) {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) throw new Error('Word not found');
        return response.json();
    }

    displayResult(data) {
        this.result.style.display = 'block';
        const wordData = data[0];

        const wordElement = document.querySelector('.word');
        const meaningElement = document.querySelector('.word-meaning');
        const exampleElement = document.querySelector('.word-example');
        const audioButton = document.querySelector('.play-audio');

        wordElement.textContent = wordData.word;
        meaningElement.textContent = wordData.meanings[0].definitions[0].definition;
        exampleElement.textContent = wordData.meanings[0].definitions[0].example || '';

        // Handle audio
        const phonetics = wordData.phonetics.find(p => p.audio);
        if (phonetics) {
            this.audio = new Audio(phonetics.audio);
            audioButton.style.display = 'block';
            audioButton.onclick = () => this.audio.play();
        } else {
            audioButton.style.display = 'none';
        }
    }

    showError(message) {
        this.result.style.display = 'block';
        this.result.innerHTML = `<p class="error">${message}</p>`;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => new Dictionary());