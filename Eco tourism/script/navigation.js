const hamButton = document.querySelector('#hamburgerBtn');
const navList = document.querySelector('#primaryNav'); // Ensure name matches below

hamButton.addEventListener('click', () => {
    navList.classList.toggle('open'); // Using the correct variable name
    hamButton.classList.toggle('open');

    const icon = hamButton.querySelector('span');
    if (navList.classList.contains('open')) {
        icon.textContent = 'X';
    } else {
        icon.innerHTML = '&#9776;'; // Returns to the hamburger icon
    }
});