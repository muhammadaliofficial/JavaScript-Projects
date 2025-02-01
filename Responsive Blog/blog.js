document.addEventListener('DOMContentLoaded', function () {
    const blogPosts = [
        {
            title: "Introduction to Java: The Versatile Programming Language",
            date: "January 9, 2025",
            author: "Muhammad Ali",
            content: "Java is one of the most popular programming languages in the world, known for its versatility and platform independence. It is widely used for building enterprise-level applications, Android apps, and web applications. Java's object-oriented programming (OOP) principles make it a great choice for developers who want to write clean, modular, and reusable code. In this post, we'll explore the basics of Java, including its syntax, data types, and key features like multithreading and garbage collection.",
            category: "technology"
        },
        {
            title: "Why Python is the Best Language for Beginners",
            date: "January 15, 2025",
            author: "muhammad Ali",
            content: "Python is a high-level, interpreted programming language known for its simplicity and readability. It is widely used in web development, data science, artificial intelligence, and automation. Python's extensive library ecosystem, including libraries like NumPy, Pandas, and TensorFlow, makes it a favorite among developers. In this post, we'll discuss why Python is an excellent choice for beginners, its key features, and how to get started with your first Python project.",
            category: "technology"
        },
        {
            title: "Getting Started with React: A Beginner's Guide",
            date: "January 19, 2025",
            author: "muhmmad Ali",
            content: "React is a powerful JavaScript library for building user interfaces, particularly single-page applications (SPAs). Developed by Facebook, React allows developers to create reusable UI components and manage state efficiently. In this post, we'll cover the basics of React, including JSX syntax, components, props, and state. We'll also walk you through setting up your first React project using Create React App.",
            category: "technology"
        },
        {
            title: "Next.js: The Future of React Development",
            date: "January 22, 2025",
            author: "muhammad Ali",
            content: "Next.js is a React framework that enables developers to build server-side rendering (SSR) and static websites with ease. It offers features like automatic code splitting, optimized performance, and seamless API integration. In this post, we'll explore the benefits of using Next.js, how it differs from traditional React, and how to get started with building your first Next.js application.",
            category: "technology"
        },
        {
            title: "Mastering JavaScript: Tips and Tricks for Developers",
            date: "January 24, 2025",
            author: "muhammad Ali",
            content: "JavaScript is the backbone of modern web development, powering interactive and dynamic websites. In this post, we'll share some tips and tricks to help you master JavaScript, including working with asynchronous code, understanding closures, and leveraging ES6+ features like arrow functions and destructuring. Whether you're a beginner or an experienced developer, these tips will help you write cleaner and more efficient code.",
            category: "technology"
        }
    ];

    const blogPostsSection = document.getElementById('blog-posts');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const categories = document.querySelectorAll('#categories li a');
    const themeToggle = document.getElementById('theme-toggle');
    const backToTopButton = document.getElementById('back-to-top');
    const toast = document.getElementById('toast');
    const loadingSpinner = document.getElementById('loading-spinner');

    // Function to display blog posts
    function displayPosts(posts) {
        blogPostsSection.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('article');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p class="meta">Posted on ${post.date} by ${post.author}</p>
                <p>${post.content}</p>
                <button class="read-more">Read More</button>
            `;
            blogPostsSection.appendChild(postElement);
        });
    }

    // Initial display of all posts
    displayPosts(blogPosts);

    // Search functionality
    searchButton.addEventListener('click', function () {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredPosts = blogPosts.filter(post =>
            post.title.toLowerCase().includes(searchTerm) ||
            post.content.toLowerCase().includes(searchTerm)
        );
        displayPosts(filteredPosts);
        showToast(`Showing results for "${searchTerm}"`);
    });

    // Category filtering
    categories.forEach(category => {
        category.addEventListener('click', function (e) {
            e.preventDefault();
            const selectedCategory = this.getAttribute('data-category');
            const filteredPosts = selectedCategory === 'all' ?
                blogPosts :
                blogPosts.filter(post => post.category === selectedCategory);
            displayPosts(filteredPosts);
            showToast(`Showing posts in "${selectedCategory}"`);
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

    // Read more expansion
    blogPostsSection.addEventListener('click', function (e) {
        if (e.target.classList.contains('read-more')) {
            const postContent = e.target.previousElementSibling;
            postContent.classList.toggle('expanded');
            e.target.textContent = postContent.classList.contains('expanded') ? 'Read Less' : 'Read More';
        }
    });

    // Toast notification
    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // Simulate loading spinner
    function simulateLoading() {
        loadingSpinner.style.display = 'block';
        setTimeout(() => {
            loadingSpinner.style.display = 'none';
        }, 1000);
    }

    // Simulate loading on initial page load
    simulateLoading();
});