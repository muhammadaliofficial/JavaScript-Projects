document.addEventListener('DOMContentLoaded', function () {
     const products = [
         {
             id: 1,
             name: "Smartphone",
             category: "electronics",
             price: 499.99,
             image: "smartphone.webp",
             description: "A high-end smartphone with the latest features."
         },
         {
             id: 2,
             name: "Laptop",
             category: "electronics",
             price: 999.99,
             image: "laptop.png",
             description: "A powerful laptop for work and gaming."
         },
         {
             id: 3,
             name: "T-Shirt",
             category: "clothing",
             price: 19.99,
             image: "T-shirt.png",
             description: "A comfortable and stylish t-shirt."
         },
         {
             id: 4,
             name: "Watch",
             category: "accessories",
             price: 149.99,
             image: "watch.png",
             description: "A sleek and modern wristwatch."
         }
    ,
    {
        id: 5,
        name: "Headphones",
        category: "electronics",
        price: 199.99,
        image: "headphones.png",
        description: "Noise-cancelling over-ear headphones."
    },
    {
        id: 6,
        name: "Sneakers",
        category: "clothing",
        price: 79.99,
        image: "sneakers.png",
        description: "Comfortable and stylish sneakers."
    },
    {
        id: 7,
        name: "Backpack",
        category: "accessories",
        price: 59.99,
        image: "backpack.png",
        description: "Durable and spacious backpack."
    },
    {
        id: 8,
        name: "Smartwatch",
        category: "electronics",
        price: 299.99,
        image: "smartwatch.png",
        description: "Feature-packed smartwatch with fitness tracking."
    }
     ];
 
     const productListSection = document.getElementById('product-list');
     const searchInput = document.getElementById('search-input');
     const searchButton = document.getElementById('search-button');
     const categories = document.querySelectorAll('#categories li a');
     const themeToggle = document.getElementById('theme-toggle');
     const backToTopButton = document.getElementById('back-to-top');
     const toast = document.getElementById('toast');
     const loadingSpinner = document.getElementById('loading-spinner');
     const cartCount = document.getElementById('cart-count');
 
     let cart = [];
 
     // Function to display products
     function displayProducts(products) {
         productListSection.innerHTML = '';
         products.forEach(product => {
             const productElement = document.createElement('div');
             productElement.classList.add('product');
             productElement.innerHTML = `
                 <img src="${product.image}" alt="${product.name}">
                 <h3>${product.name}</h3>
                 <p>${product.description}</p>
                 <p><strong>$${product.price.toFixed(2)}</strong></p>
                 <button onclick="addToCart(${product.id})">Add to Cart</button>
             `;
             productListSection.appendChild(productElement);
         });
     }
 
     // Initial display of all products
     displayProducts(products);
 
     // Search functionality
     searchButton.addEventListener('click', function () {
         const searchTerm = searchInput.value.toLowerCase();
         const filteredProducts = products.filter(product =>
             product.name.toLowerCase().includes(searchTerm) ||
             product.description.toLowerCase().includes(searchTerm)
         );
         displayProducts(filteredProducts);
         showToast(`Showing results for "${searchTerm}"`);
     });
 
     // Category filtering
     categories.forEach(category => {
         category.addEventListener('click', function (e) {
             e.preventDefault();
             const selectedCategory = this.getAttribute('data-category');
             const filteredProducts = selectedCategory === 'all' ?
                 products :
                 products.filter(product => product.category === selectedCategory);
             displayProducts(filteredProducts);
             showToast(`Showing products in "${selectedCategory}"`);
         });
     });
 
     // Dark mode toggle
     themeToggle.addEventListener('click', function () {
         document.body.classList.toggle('dark-mode');
         themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
     });
 
     // Back to top button
     window.addEventListener('scroll', function () {
         if (window.scrollY > 300) {
             backToTopButton.style.display = 'block';
         } else {
             backToTopButton.style.display = 'none';
         }
     });
 
     backToTopButton.addEventListener('click', function () {
         window.scrollTo({ top: 0, behavior: 'smooth' });
     });
 
     // Add to cart function
     window.addToCart = function (productId) {
         const product = products.find(p => p.id === productId);
         cart.push(product);
         cartCount.textContent = cart.length;
         showToast(`${product.name} added to cart!`);
     };
 
     // Toast notification
     function showToast(message) {
         if (toast) {
             toast.textContent = message;
             toast.classList.add('show');
             setTimeout(() => toast.classList.remove('show'), 3000);
         }
     }
 
     // Simulate loading spinner
     function simulateLoading() {
         if (loadingSpinner) {
             loadingSpinner.style.display = 'block';
             setTimeout(() => {
                 loadingSpinner.style.display = 'none';
             }, 1000);
         }
     }
 
     // Simulate loading on initial page load
     simulateLoading();
 });