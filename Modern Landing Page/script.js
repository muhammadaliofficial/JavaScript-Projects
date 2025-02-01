class LandingPage {
    constructor() {
        this.navToggle = document.getElementById('navToggle');
        this.navLinks = document.getElementById('navLinks');
        this.contactForm = document.getElementById('contactForm');
        
        this.initialize();
    }

    initialize() {
        this.navToggle?.addEventListener('click', () => this.toggleNav());
        this.contactForm?.addEventListener('submit', (e) => this.handleSubmit(e));
        this.addSmoothScroll();
        this.handleNewsletter();     
    }

    handleNewsletter() {
        const form = document.querySelector('.newsletter-form');
        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input').value;
            console.log('Newsletter subscription:', email);
            form.reset();
        });
    }

    toggleNav() {
        if (this.navLinks) {
            this.navLinks.classList.toggle('active');
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('Form submitted');
    }

    addSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                target?.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => new LandingPage());