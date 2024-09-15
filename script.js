
/* se crea un evento al scroll, cuando este se desplace mas de 50px este
empiezaa ponerse transparente */

document.addEventListener('scroll', function () {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.classList.add('translucent');
    } else {
        nav.classList.remove('translucent');
    }
});
