/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
 
const navList = document.querySelector('#navbar__list');
const [...sections] = document.getElementsByTagName('section');
const navElems = document.querySelector('.navbar__element');
const sectionsIDs = sections.map(section => section.id); 
const navData = sections.map(section => section.getAttribute('data-nav'));

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

const scrollTo = function(e){
    e.preventDefault();
    const target = e.target.getAttribute('data-scroll-to');
    const ele = document.querySelector(target);
    ele.scrollIntoView({ behavior: "smooth" });
}

const isInView = function(ele){
    const { top, bottom } = ele.getBoundingClientRect();
    const windowsHight = window.innerHeight || document.documentElement.clientHeight;
    return bottom >=0 && top <= windowsHight;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const makeNav = function(nav, data, sectionsIDs){
    const fragment = document.createDocumentFragment();
    data.map((d, i) => {
        const listEle = document.createElement('li');
        listEle.textContent = d;
        listEle.classList.add('navbar__element');
        listEle.addEventListener('click', scrollTo);
        listEle.setAttribute('data-scroll-to', `#${sectionsIDs[i]}`);
        listEle.setAttribute('class', 'menu__link');
        fragment.appendChild(listEle);
    });

    nav.appendChild(fragment);
}

// Add class 'active' to section when near top of viewport
const activeSec = function(){
    sections.map(section => {
        window.addEventListener('scroll', (e) => {
            isInView(section) ? section.classList.add('section--activate') : section.classList.remove('section--activate');
        });
    });
}

// Scroll to anchor ID using scrollTO event (in the makeNav function)

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
makeNav(navList, navData, sectionsIDs);

// Scroll to section on link click

// Set sections as active
activeSec();

