class ColorGenerator {
  constructor() {
    this.history = [];
    this.maxHistory = 10;
    this.currentFormat = "hex";
    this.init();
  }

  init() {
    this.colorDisplay = document.getElementById("color-code");
    this.btn = document.getElementById("btn");
    this.setupEventListeners();
    this.createHistoryContainer();
    this.generateColor();
  }

  setupEventListeners() {
    this.btn.addEventListener("click", () => this.generateColor());
    this.colorDisplay.addEventListener("click", () => this.copyToClipboard());
    document.addEventListener("keypress", (e) => {
      if (e.code === "Space") this.generateColor();
    });
  }

  generateColor() {
    const hex = this.generateHex();
    const rgb = this.hexToRGB(hex);
    const hsl = this.rgbToHSL(rgb);

    const color = {
      hex,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    };

    this.updateDisplay(color);
    this.updateHistory(color);
    this.animateBackground(color.hex);
  }

  generateHex() {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
    );
  }

  hexToRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  }

  rgbToHSL({ r, g, b }) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }

  updateDisplay(color) {
    this.colorDisplay.innerHTML = `
            <div class="color-info">
                <span class="format">HEX: ${color.hex}</span>
            </div>
        `;
  }

  updateHistory(color) {
    this.history.unshift(color);
    if (this.history.length > this.maxHistory) {
      this.history.pop();
    }
    this.renderHistory();
  }

  createHistoryContainer() {
    const container = document.createElement("div");
    container.id = "color-history";
    container.className = "history-container";
    document.body.appendChild(container);
  }

  renderHistory() {
    const container = document.getElementById("color-history");
    container.innerHTML = this.history
      .map(
        (color) => `
                <div class="history-item" 
                     style="background-color: ${color.hex}"
                     onclick="colorGenerator.applyColor('${color.hex}')">
                </div>
            `
      )
      .join("");
  }

  applyColor(hex) {
    document.body.style.backgroundColor = hex;
    this.updateDisplay({
      hex,
      rgb: this.hexToRGB(hex),
      hsl: this.rgbToHSL(this.hexToRGB(hex)),
    });
  }

  animateBackground(color) {
    document.body.style.transition = "background-color 0.3s ease";
    document.body.style.backgroundColor = color;
  }

  showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }
}

const colorGenerator = new ColorGenerator();
