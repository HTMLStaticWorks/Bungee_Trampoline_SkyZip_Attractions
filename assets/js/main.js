document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // Theme Toggle (Dark/Light mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check system preference or localStorage
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            html.classList.toggle('dark');
            if (html.classList.contains('dark')) {
                localStorage.theme = 'dark';
            } else {
                localStorage.theme = 'light';
            }
        });
    }

    // Sticky Navbar
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-lg', 'bg-white/90', 'dark:bg-gray-900/90', 'backdrop-blur-md');
                navbar.classList.remove('bg-transparent');
            } else {
                navbar.classList.remove('shadow-lg', 'bg-white/90', 'dark:bg-gray-900/90', 'backdrop-blur-md');
                navbar.classList.add('bg-transparent');
            }
        });
    }

    // Number Counter Animation
    const counters = document.querySelectorAll('.counter-value');
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };

            const elementTop = counter.getBoundingClientRect().top;
            if (elementTop < window.innerHeight && !counter.classList.contains('counted')) {
                updateCount();
                counter.classList.add('counted');
            }
        });
    };

    window.addEventListener('scroll', animateCounters);
    animateCounters();
});
