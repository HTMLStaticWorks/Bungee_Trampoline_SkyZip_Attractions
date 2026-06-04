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
    const themeToggleBtns = document.querySelectorAll('.theme-toggle');
    const html = document.documentElement;

    // Check system preference or localStorage
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    const toggleTheme = () => {
        html.classList.toggle('dark');
        if (html.classList.contains('dark')) {
            localStorage.theme = 'dark';
        } else {
            localStorage.theme = 'light';
        }
        updateNavbar();
    };

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });

    // RTL Toggle
    const rtlToggleBtns = document.querySelectorAll('.rtl-toggle');
    const setRTL = (isRTL) => {
        if (isRTL) {
            html.setAttribute('dir', 'rtl');
            localStorage.dir = 'rtl';
            rtlToggleBtns.forEach(btn => {
                btn.innerHTML = '<span class="text-xs font-bold">LTR</span>';
            });
        } else {
            html.setAttribute('dir', 'ltr');
            localStorage.dir = 'ltr';
            rtlToggleBtns.forEach(btn => {
                btn.innerHTML = '<span class="text-xs font-bold">RTL</span>';
            });
        }
    };

    // Load saved direction
    if (localStorage.dir === 'rtl') {
        setRTL(true);
    } else {
        setRTL(false);
    }

    rtlToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isRTL = html.getAttribute('dir') === 'rtl';
            setRTL(!isRTL);
        });
    });

    const navbar = document.getElementById('navbar');
    const updateNavbar = () => {
        if (!navbar) return;
        const isScrolled = window.scrollY > 50;
        const isDark = document.documentElement.classList.contains('dark');
        const isTransparentNav = navbar.classList.contains('nav-transparent');

        if (isScrolled) {
            navbar.classList.add('shadow-lg', 'bg-white/95', 'dark:bg-gray-900/95', 'backdrop-blur-md', 'text-gray-900', 'dark:text-white');
            navbar.classList.remove('bg-transparent', 'text-white', 'bg-charcoal/95');
        } else {
            navbar.classList.remove('shadow-lg', 'bg-white/95', 'dark:bg-gray-900/95', 'backdrop-blur-md', 'text-gray-900', 'dark:text-white');
            
            if (isTransparentNav) {
                navbar.classList.add('bg-transparent', 'text-white');
            } else {
                navbar.classList.add('bg-white', 'dark:bg-gray-900', 'text-gray-900', 'dark:text-white');
                navbar.classList.remove('bg-transparent', 'text-white', 'bg-charcoal/95');
            }
        }
    };

    if (navbar) {
        window.addEventListener('scroll', updateNavbar);
        updateNavbar(); // Initial call
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

    // Active Navigation Highlighting
    const currentPath = window.location.pathname.split('/').pop().split('#')[0].split('?')[0] || 'index.html';
    const navLinks = document.querySelectorAll('#navbar a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href').split('#')[0].split('?')[0];
        if (href === currentPath || (currentPath === 'index.html' && (href === '/' || href === ''))) {
            link.classList.add('text-primary');
            link.classList.remove('hover:text-primary'); // Keep it highlighted
            
            // Highlight parent button if link is inside a dropdown (e.g., Home button)
            const dropdownParent = link.closest('.relative');
            if (dropdownParent) {
                const btn = dropdownParent.querySelector('button');
                if (btn) {
                    btn.classList.add('text-primary');
                    btn.classList.remove('hover:text-primary');
                }
            }
        }
    });

    // Back to Top Button
    const backToTopBtn = document.createElement('div');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
