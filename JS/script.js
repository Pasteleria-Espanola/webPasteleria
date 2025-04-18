// Home Carousel
$('.home-carousel').owlCarousel({
    loop: true,
    margin: 0,
    dots: true,
    autoplay: true,
    autoplayTimeout: 7000,
    animateOut: 'fadeOut',
    nav: false,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
})

// Navbar
window.addEventListener('scroll', function () {
    let navbar = document.getElementById("navbar");
    // Toggles Fixed Class In Navbar On Scroll
    navbar.classList.toggle('fixed', this.window.scrollY > 0)
})

// Nav Buttons
let menuBtn = document.querySelector('.menu-btn');
let darkBtn = document.querySelector('.darkbtn');
let signImg = document.getElementById('signImg');

menuBtn.onclick = function () {
    // Toggles Active Class In Nav Items On Click
    document.getElementById("nav-items").classList.toggle('active');

    // Changes Icon on Click 
    if (document.getElementById("nav-items").classList.contains('active')) {
        menuBtn.classList.remove("bx-menu");
        menuBtn.classList.add("bx-x");
    }
    else {
        menuBtn.classList.remove("bx-x");
        menuBtn.classList.add("bx-menu");
    }
}

darkBtn.onclick = function () {
    // Toggles Dark Mode Class To Body On Click
    document.body.classList.toggle('dark-mode');

    // If Body Contains Dark Mode Class 
    if (document.body.classList.contains('dark-mode')) {

        // Changes Dark Mode Button Icon To Sun
        darkBtn.classList.remove("bx-moon");
        darkBtn.classList.add("bx-sun");

        // Changes Sign Img For Dark Background
        signImg.src = '/Images/sign/sign-dark.png';
    }
    // If Body Does Not Contains Dark Mode Class 
    else {
        // Changes Dark Mode Button Icon To Moon
        darkBtn.classList.remove("bx-sun");
        darkBtn.classList.add("bx-moon");

        // Changes Sign Img For Light Background
        signImg.src = '/Images/sign/sign-light.png';
    }
}

// Menu-Section
let menuTabs = document.querySelectorAll('.menu-tab-item');
let menuContents = document.querySelectorAll('.menu-tab-content');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remover la clase 'active' de todas las pestañas
        menuTabs.forEach(item => item.classList.remove('active'));
        // Agregar la clase 'active' a la pestaña seleccionada
        tab.classList.add('active');

        // Ocultar todas las secciones de contenido
        menuContents.forEach(content => content.classList.remove('show'));

        // Mostrar la sección de contenido correspondiente
        const target = tab.getAttribute('data-target');
        const targetContent = document.querySelector(target);
        if (targetContent) {
            targetContent.classList.add('show');
        }
    });
});

