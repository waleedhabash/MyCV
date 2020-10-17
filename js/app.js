// Define Global Variables
const menuMobile = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo');
const sections = document.querySelectorAll('section')
// End Global Variables

// Start Helper Functions

// check element active
function getActiveElem() {
    maxSection = sections[0];
    minVal = 1000000;
    for (item of sections) {
        let bounding = item.getBoundingClientRect();
        if (bounding.top > -300 & bounding.top < minVal) {
            minVal = bounding.top;
            maxSection = item;
        };
    };
    return maxSection;
};
// End Helper Functions


// Begin Main Functions

// build the nav
function addSections() {
    for (let item of sections) {
        let section = document.createElement('li');
        let elementA=document.createElement('a');
        section.className = 'navbar__item';
        section.dataset.nav = item.id;
        elementA.href="#" +item.id;
        elementA.classList.add('navbar__links');
        elementA.id= item.dataset.nav + "-page";
        elementA.innerText=item.dataset.nav;
        section.appendChild (elementA) ;
        menuLinks.appendChild(section);
    };
};

// highlight the section 
function setActive () {
    window.addEventListener('scroll', function (event) {
        let section = getActiveElem();
        var targetDiv= GetElementInsideContainer(section.id,(section.dataset.nav).toLowerCase())
        let targethighlightdiv = document.querySelector("#div" + targetDiv.id);
        targethighlightdiv.classList.add('highlightdiv');
        // other sections de-active
        for (let item of sections) {
            var targetDivforcheck= GetElementInsideContainer(item.id,(item.dataset.nav).toLowerCase())
            let targethighlightdivforcheck = document.querySelector("#div" + targetDivforcheck.id);
            if (targethighlightdivforcheck.id != targethighlightdiv.id & targethighlightdivforcheck.classList.contains('highlightdiv')) {
                targethighlightdivforcheck.classList.remove('highlightdiv');
            }
        }
        // set highlight header link
        const active = document.querySelector('li[data-nav="' + section.id + '"]');
        active.classList.add('highlight');
        // remove from other header links
        const headers = document.querySelectorAll('.navbar__item');
        console.log(headers);
        for (let item of headers) {
            if (item.dataset.nav != active.dataset.nav & item.classList.contains('highlight')) {
                item.classList.remove('highlight');
            }
        };
    });
};

// Scroll to anchor ID using scrollTO event
function scrollToClick() {
    menuLinks.addEventListener('click', function (event) {
        const clicked = document.querySelector('#' + event.target.dataset.nav)
        clicked.scrollIntoView();
    });
};

 // get element inside element 
 function GetElementInsideContainer(containerID, childID) {
    var elm = {};
    var elms = document.getElementById(containerID).getElementsByTagName("*");
    for (var i = 0; i < elms.length; i++) {
        if (elms[i].id === childID) {
            elm = elms[i];
            break;
        }
    }
    return elm;
}

// close mobile menu when clicking on a menu item
const hideMobileMenu = () => {
    const menuBars = document.querySelector('.is-active')
    if (window.innerWidth <= 768 && menuBars) {
        menuMobile.classList.toggle('is-active')
        menuLinks.classList.remove('active')
    }
}
// Display Mobile Menu
const mobileMenu = () => {
    menuMobile.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
}
// End Main Functions

// Build menu 
addSections();

// Scroll to section on link click
scrollToClick();

// Set sections as active
setActive();

// Display Mobile Menu
menuMobile.addEventListener('click', mobileMenu);

// Close Mobile Menu
menuLinks.addEventListener('click', hideMobileMenu)
navLogo.addEventListener('click', hideMobileMenu)