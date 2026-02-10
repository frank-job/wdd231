export function renderCards(data, gridElement) {
    if (!gridElement) return;
    
    gridElement.innerHTML = '';
    
    // Array Method: forEach
    data.forEach(dest => {
        const card = document.createElement('div');
        card.className = 'dest-card';
        
        // Template Literals for dynamic content
        card.innerHTML = `
            <img src="${dest.image}" alt="${dest.name}" loading="lazy">
            <div class="dest-card-content">
                <span class="category-tag">${dest.category}</span>
                <h3>${dest.name}</h3>
                <p class="description">${dest.description}</p>
                <div class="card-footer">
                    <p>📍 ${dest.location}</p>
                    <p class="price"><strong>${dest.price}</strong></p>
                </div>
                <button class="book-btn" data-name="${dest.name}">Book Now</button>
            </div>
        `;
        gridElement.appendChild(card);
    });
}

// Import from the .mjs and the render module
import { destinations } from '../data/destination.mjs';
// import { renderCards } from './modules/render.js';

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('dest-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // 1. Initial Render using the imported constant
    renderCards(destinations, grid);

    // 2. Filter Logic (Using Array Method: filter)
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from others, add to this one
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');
            
            // Filter the imported destinations array
            const filteredData = category === 'all' 
                ? destinations 
                : destinations.filter(item => item.category === category);
            
            renderCards(filteredData, grid);
        });
    });
});