const countries = {
    'en-GB': 'English',
    'ar-SA': 'Arabic',
    'ur-PK': 'Urdu',
    'es-ES': 'Spanish',
    'de-DE': 'German',
    'fr-FR': 'French',
    'hi-IN': 'Hindi',
    'bn-IN': 'Bengali',
    'ru-RU': 'Russian',
    'pt-PT': 'Portuguese',
    'it-IT': 'Italian',
    'nl-NL': 'Dutch',
    'tr-TR': 'Turkish',
    'pl-PL': 'Polish',
    'uk-UA': 'Ukrainian',
    'vi-VN': 'Vietnamese',
    'th-TH': 'Thai',
    'fa-IR': 'Persian',
    'id-ID': 'Indonesian',
    'ms-MY': 'Malay',
    'fil-PH': 'Filipino',
    'ja-JP': 'Japanese',
    'ko-KR': 'Korean',
    'zh-CN': 'Chinese (Simplified)',
    'zh-TW': 'Chinese (Traditional)'
};

class Translator {
    constructor() {
        this.fromText = document.querySelector(".from-text");
        this.toText = document.querySelector(".to-text");
        this.selectTags = document.querySelectorAll("select");
        this.translateBtn = document.querySelector("button");
        this.exchangeBtn = document.querySelector(".exchange");
        this.icons = document.querySelectorAll(".row i");
        
        this.initialize();
    }

    initialize() {
        this.selectTags.forEach((tag, id) => {
            for(let country_code in countries) {
                let selected = id == 0 ? country_code == "en-GB" : country_code == "es-ES";
                let option = `<option ${selected ? "selected" : ""} value="${country_code}">${countries[country_code]}</option>`;
                tag.insertAdjacentHTML("beforeend", option);
            }
        });

        this.addEventListeners();
    }

    addEventListeners() {
        this.fromText.addEventListener("keyup", () => {
            if(!this.fromText.value) {
                this.toText.value = "";
            }
        });

        this.translateBtn.addEventListener("click", () => this.translateText());

        this.exchangeBtn.addEventListener("click", () => {
            let tempText = this.fromText.value;
            let tempLang = this.selectTags[0].value;
            this.fromText.value = this.toText.value;
            this.toText.value = tempText;
            this.selectTags[0].value = this.selectTags[1].value;
            this.selectTags[1].value = tempLang;
        });

        this.icons.forEach(icon => {
            icon.addEventListener("click", ({target}) => {
                if(!this.fromText.value || !this.toText.value) return;
                if(target.classList.contains("fa-copy")) {
                    if(target.id == "from") {
                        navigator.clipboard.writeText(this.fromText.value);
                    } else {
                        navigator.clipboard.writeText(this.toText.value);
                    }
                } else {
                    let utterance;
                    if(target.id == "from") {
                        utterance = new SpeechSynthesisUtterance(this.fromText.value);
                        utterance.lang = this.selectTags[0].value;
                    } else {
                        utterance = new SpeechSynthesisUtterance(this.toText.value);
                        utterance.lang = this.selectTags[1].value;
                    }
                    speechSynthesis.speak(utterance);
                }
            });
        });
    }

    async translateText() {
        if(!this.fromText.value) return;
        this.toText.setAttribute("placeholder", "Translating...");
             const countries = {
         'en-GB': 'English',
         'ar-SA': 'Arabic',
         'ur-PK': 'Urdu',
         'es-ES': 'Spanish',
         'de-DE': 'German',
         'fr-FR': 'French',
         'hi-IN': 'Hindi',
         'bn-IN': 'Bengali',
         'ru-RU': 'Russian',
         'pt-PT': 'Portuguese',
         'it-IT': 'Italian',
         'nl-NL': 'Dutch',
         'tr-TR': 'Turkish',
         'pl-PL': 'Polish',
         'uk-UA': 'Ukrainian',
         'vi-VN': 'Vietnamese',
         'th-TH': 'Thai',
         'fa-IR': 'Persian',
         'id-ID': 'Indonesian',
         'ms-MY': 'Malay',
         'fil-PH': 'Filipino',
         'ja-JP': 'Japanese',
         'ko-KR': 'Korean',
         'zh-CN': 'Chinese (Simplified)',
         'zh-TW': 'Chinese (Traditional)'
     };
     
     class Translator {
         constructor() {
             // ...existing code...
         }
     
         initialize() {
             this.selectTags.forEach((tag, id) => {
                 for(let country_code in countries) {
                     let selected = id == 0 ? country_code == "en-GB" : country_code == "ar-SA";
                     let option = `<option ${selected ? "selected" : ""} value="${country_code}">${countries[country_code]}</option>`;
                     tag.insertAdjacentHTML("beforeend", option);
                 }
             });
     
             // Add RTL support
             this.fromText.addEventListener('input', () => {
                 const lang = this.selectTags[0].value;
                 this.fromText.style.direction = ['ar-SA', 'ur-PK', 'fa-IR'].includes(lang) ? 'rtl' : 'ltr';
             });
     
             this.addEventListeners();
         }
     
         // ...existing code...
     }
     
     // ...existing code...
        try {
            const res = await fetch(`https://api.mymemory.translated.net/get?q=${this.fromText.value}&langpair=${this.selectTags[0].value}|${this.selectTags[1].value}`);
            const data = await res.json();
            this.toText.value = data.responseData.translatedText;
        } catch(error) {
            this.toText.setAttribute("placeholder", "Error translating!");
        }
        
        this.toText.setAttribute("placeholder", "Translation");
    }
}

document.addEventListener("DOMContentLoaded", () => new Translator());