class CurrencyConverter {
  constructor() {
    this.apiKey = "YOUR_API_KEY"; // Replace with actual API key
    this.apiUrl = "https://v6.exchangerate-api.com/v6";
    this.currencies = {
      USD: "United States Dollar",
      EUR: "Euro",
      GBP: "British Pound",
      JPY: "Japanese Yen",
      AUD: "Australian Dollar",
      CAD: "Canadian Dollar",
      CHF: "Swiss Franc",
      CNY: "Chinese Yuan",
      INR: "Indian Rupee",
      NZD: "New Zealand Dollar",
    };

    this.currencySymbols = {
      USD: "$",
      EUR: "€",
      GBP: "£",
      JPY: "¥",
      CNY: "¥",
      INR: "₹",
      KRW: "₩",
      SGD: "S$",
      HKD: "HK$",
      IDR: "Rp",
      MYR: "RM",
      THB: "฿",
      PHP: "₱",
      VND: "₫",
      PKR: "₨",
      BDT: "৳",
      NPR: "₨",
      LKR: "₨",
      MMK: "K",
      KHR: "៛",
      LAK: "₭",
      MNT: "₮",
    };

    this.initialize();
  }

  initialize() {
    this.elements = {
      amountInput: document.querySelector(".amount input"),
      fromSelect: document.querySelector(".from select"),
      toSelect: document.querySelector(".to select"),
      exchangeIcon: document.querySelector(".fa-exchange-alt"),
      convertBtn: document.querySelector("button"),
      result: document.querySelector(".result"),
      fromFlag: document.querySelector(".from img"),
      toFlag: document.querySelector(".to img"),
    };

    this.loadCurrencyOptions();
    this.addEventListeners();
    this.getExchangeRate();
  }

  loadCurrencyOptions() {
    const selects = [this.elements.fromSelect, this.elements.toSelect];

    selects.forEach((select, index) => {
      for (let currency in this.currencies) {
        const selected = index === 0 ? currency === "USD" : currency === "EUR";
        const option = `<option value="${currency}" ${
          selected ? "selected" : ""
        }>${currency} - ${this.currencies[currency]}</option>`;
        select.insertAdjacentHTML("beforeend", option);
      }

      select.addEventListener("change", () => {
        this.updateFlag(
          select,
          index === 0 ? this.elements.fromFlag : this.elements.toFlag
        );
      });
    });
  }

  updateFlag(select, flagImg) {
    const currency = select.value;
    const countryCode = currency.slice(0, 2);
    flagImg.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
  }

  addEventListeners() {
    this.elements.exchangeIcon.addEventListener("click", () => {
      [this.elements.fromSelect.value, this.elements.toSelect.value] = [
        this.elements.toSelect.value,
        this.elements.fromSelect.value,
      ];

      [this.elements.fromFlag.src, this.elements.toFlag.src] = [
        this.elements.toFlag.src,
        this.elements.fromFlag.src,
      ];

      this.getExchangeRate();
    });

    this.elements.convertBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.getExchangeRate();
    });

    this.elements.amountInput.addEventListener("input", () => {
      this.getExchangeRate();
    });
  }

  async getExchangeRate() {
    const amount = this.elements.amountInput.value || 1;
    const fromCurrency = this.elements.fromSelect.value;
    const toCurrency = this.elements.toSelect.value;

    try {
      this.elements.convertBtn.textContent = "Converting...";
      const response = await fetch(
        `${this.apiUrl}/${this.apiKey}/latest/${fromCurrency}`
      );
      const data = await response.json();

      if (data.result === "success") {
        const rate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);
        this.elements.result.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      this.elements.result.textContent = "Error fetching exchange rate!";
      console.error(error);
    } finally {
      this.elements.convertBtn.textContent = "Get Exchange Rate";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => new CurrencyConverter());

document.addEventListener("DOMContentLoaded", () => new CurrencyConverter());
