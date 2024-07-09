/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const navList = document.getElementById('navbar__list');
const topButton = document.createElement('button');
let isScrolling;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * Helper Function to check if section is in viewport
 */
const isInViewport = (section) => {
    const rect = section.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
};

/**
 * Helper Function to set active class on nav item
 */
const setNavActive = () => {
    sections.forEach(section => {
        const navItem = document.querySelector(`a[href="#${section.id}"]`);
        if (isInViewport(section)) {
            navItem.classList.add('active-link');
        } else {
            navItem.classList.remove('active-link');
        }
    });
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/**
 * Build the navigation menu
 */
const buildNav = () => {
    console.log("Building navigation");
    sections.forEach(section => {
        const navItem = document.createElement('li');
        navItem.innerHTML = `<a href="#${section.id}" class="menu__link">${section.dataset.nav}</a>`;
        navList.appendChild(navItem);
        console.log(`Added nav item for section ${section.dataset.nav}`);
    });
};

/**
 * Add 'active' class to section when near top of viewport
 */
const setSectionActive = () => {
    console.log("Setting active section");
    sections.forEach(section => {
        if (isInViewport(section)) {
            section.classList.add('your-active-class');
        } else {
            section.classList.remove('your-active-class');
        }
    });
    setNavActive();
};

/**
 * Scroll to anchor ID using scrollTO event
 */
const scrollToSection = (event) => {
    event.preventDefault();
    const targetId = event.target.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
    });
};

/**
 * Collapse sections
 */
const collapseSections = () => {
    sections.forEach(section => {
        const header = section.querySelector('h2');
        header.addEventListener('click', () => {
            const content = section.querySelector('.content');
            if (content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'block';
                header.querySelector('.arrow').textContent = '▼';
            } else {
                content.style.display = 'none';
                header.querySelector('.arrow').textContent = '►';
            }
        });
    });
};

/**
 * Show/hide scroll to top button
 */
const handleScroll = () => {
    window.clearTimeout(isScrolling);

    if (window.scrollY > 100) {
        topButton.style.display = 'block';
        navList.style.display = 'block'; // Show the navigation menu
    } else {
        topButton.style.display = 'none';
        navList.style.display = 'block'; // Always show navigation initially when scrolling to top
    }

    // Set a timeout to hide the navigation after 3 seconds of inactivity
    isScrolling = setTimeout(() => {
        navList.style.display = 'none'; // Hide the navigation menu
    }, 3000);
};

/**
 * Initialize page
 */
const init = () => {
    console.log("Initializing page");
    buildNav();
    collapseSections();
    setSectionActive();
    topButton.innerText = 'Top';
    topButton.classList.add('scroll-to-top');
    document.body.appendChild(topButton);

    // Scroll to section on link click
    document.querySelectorAll('.menu__link').forEach(link => {
        link.addEventListener('click', scrollToSection);
    });

    // Show/hide scroll to top button
    window.addEventListener('scroll', handleScroll);

    // Scroll to top on button click
    topButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Set sections as active on scroll
    window.addEventListener('scroll', setSectionActive);
};

document.addEventListener('DOMContentLoaded', init);
