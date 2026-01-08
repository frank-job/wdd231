const hamButton = document.querySelector('#hamburgerBtn');
const navList = document.querySelector('#primaryNav');

// 2. Add a "Click" listener to the button
hamButton.addEventListener('click', () => {
    
    // Toggle the 'open' class on the list (This creates the slide-down effect)
    navList.classList.toggle('open');
    
    // Toggle the 'open' class on the button (Useful if you want to animate the button)
    hamButton.classList.toggle('open');

    // 3. Logic to switch the icon from ☰ to X
    const icon = hamButton.querySelector('span');
    
    if (navList.classList.contains('open')) {
        // If menu is open, show X
        icon.textContent = 'X';
    } else {
        // If menu is closed, show Hamburger
        icon.innerHTML = '&#9776;';
    }
});