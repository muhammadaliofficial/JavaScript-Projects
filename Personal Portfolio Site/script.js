class Portfolio {
    constructor() {
        this.initializeTheme();
        this.initializeProjects();
        this.initializeTyping();
        this.handleContactForm();
    }

    initializeTheme() {
        const themeToggle = document.querySelector('.theme-switch');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', 
                document.body.classList.contains('dark-theme') ? 'dark' : 'light'
            );
        });
    }

    initializeProjects() {
        const projects = [
            {
                title: 'Project 1',
                category: 'web',
                image: 'project1.jpg',
                description: 'Web application project'
            },
            // Add more projects
        ];

        const projectGrid = document.querySelector('.project-grid');
        const filters = document.querySelectorAll('.project-filters button');

        this.renderProjects(projects);
        this.initializeFilters(filters, projects);
    }

    renderProjects(projects) {
        const projectGrid = document.querySelector('.project-grid');
        projectGrid.innerHTML = projects.map(project => `
            <div class="project-card" data-category="${project.category}">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                </div>
            </div>
        `).join('');
    }

    initializeTyping() {
        const texts = ['Web Developer', 'UI Designer', 'Problem Solver'];
        const typedText = document.querySelector('.typed-text');
        let textIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < texts[textIndex].length) {
                typedText.textContent += texts[textIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, 100);
            } else {
                setTimeout(erase, 2000);
            }
        }

        function erase() {
            if (charIndex > 0) {
                typedText.textContent = texts[textIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, 50);
            } else {
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500);
            }
        }

        type();
    }

    handleContactForm() {
        const form = document.getElementById('contact-form');
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const submitButton = form.querySelector('button');
                
                // Show loading state
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
        
                // Collect form data
                const formData = {
                    name: form.querySelector('input[type="text"]').value,
                    email: form.querySelector('input[type="email"]').value,
                    message: form.querySelector('textarea').value
                };
        
                try {
                    // Example using EmailJS service
                    const response = await emailjs.send(
                        'YOUR_SERVICE_ID',
                        'YOUR_TEMPLATE_ID',
                        formData,
                        'YOUR_USER_ID'
                    );
        
                    // Success feedback
                    this.showNotification('Message sent successfully!', 'success');
                    form.reset();
        
                } catch (error) {
                    console.error('Error:', error);
                    this.showNotification('Failed to send message. Please try again.', 'error');
                } finally {
                    // Reset button state
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                }
            });
        }
    
        showNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
    }


document.addEventListener('DOMContentLoaded', () => new Portfolio());