class WorldClock {
    constructor() {
        this.clockFaces = document.querySelectorAll('.clock-face');
        this.themeToggle = document.getElementById('theme-toggle');
        this.addClockBtn = document.getElementById('add-clock');
        this.clocksContainer = document.getElementById('clocks');
        
        this.timeZones = {
            'UTC': 0, 'New York': -4, 'London': 1, 'Tokyo': 9,
            'Sydney': 10, 'Dubai': 4, 'Paris': 2, 'Mumbai': 5.5
        };
        
        this.initializeEvents();
        this.createClockNumbers();
        this.startClocks();
    }

    initializeEvents() {
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.addClockBtn.addEventListener('click', () => this.addNewClock());
        this.updateClocks = this.updateClocks.bind(this);
    }

    createClockNumbers() {
        this.clockFaces.forEach(face => {
            const numbers = face.querySelector('.numbers');
            for (let i = 0; i <= 1; i++) {
                const number = document.createElement('div');
                number.className = 'number';
                number.style.setProperty('--rotation', `${i * 30}deg`);
                numbers.appendChild(number);
            }
        });
    }

    updateClocks() {
        const now = new Date();
        
        document.querySelectorAll('.clock-card').forEach(card => {
            const timezone = card.querySelector('.timezone-select').value;
            const offset = this.timeZones[timezone] || 0;
            
            const localTime = new Date(now.getTime() + 
                (offset * 3600000) + 
                (now.getTimezoneOffset() * 60000));
            
            // Update digital display
            const timeDisplay = card.querySelector('.time');
            const dateDisplay = card.querySelector('.date');
            
            timeDisplay.textContent = localTime.toLocaleTimeString();
            dateDisplay.textContent = localTime.toLocaleDateString(undefined, 
                { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            
            // Update analog clock hands
            const clockFace = card.querySelector('.clock-face');
            const seconds = localTime.getSeconds();
            const minutes = localTime.getMinutes();
            const hours = localTime.getHours() % 12;
            
            const secondsDeg = (seconds / 60) * 360;
            const minutesDeg = ((minutes + seconds/60) / 60) * 360;
            const hoursDeg = ((hours + minutes/60) / 12) * 360;
            
            clockFace.querySelector('.second-hand').style.transform = 
                `translateX(-50%) rotate(${secondsDeg}deg)`;
            clockFace.querySelector('.minute-hand').style.transform = 
                `translateX(-50%) rotate(${minutesDeg}deg)`;
            clockFace.querySelector('.hour-hand').style.transform = 
                `translateX(-50%) rotate(${hoursDeg}deg)`;
        });
    }

    addNewClock() {
        const template = document.querySelector('.clock-card').cloneNode(true);
        const select = template.querySelector('.timezone-select');
        
        select.innerHTML = Object.keys(this.timeZones)
            .map(zone => `<option value="${zone}">${zone}</option>`)
            .join('');
            
        this.clocksContainer.appendChild(template);
        this.createClockNumbers();
    }

    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const icon = this.themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    }

    startClocks() {
        this.updateClocks();
        setInterval(this.updateClocks, 1000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WorldClock();
});