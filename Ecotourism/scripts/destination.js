
import { destinations } from '../data/destination.mjs';


function renderCards(data, gridElement) {
    if (!gridElement) return;
    gridElement.innerHTML = '';
    
    data.forEach(dest => {
        const card = document.createElement('div');
        card.className = 'dest-card';
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
                <!-- Button has a data-name to identify the trip -->
                <button class="book-btn" data-name="${dest.name}">Book Now</button>
            </div>
        `;
        gridElement.appendChild(card);
    });

 
    attachModalListeners();
}


document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('dest-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

   
    renderCards(destinations, grid);

   
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-filter');
            const filteredData = category === 'all' 
                ? destinations 
                : destinations.filter(item => item.category === category);
            
            renderCards(filteredData, grid);
        });
    });
});


const modal = document.getElementById('booking-modal');
const closeModal = document.getElementById('close-modal');
const modalTitle = document.getElementById('destination-name');
const form = modal.querySelector('form');

function attachModalListeners() {
    const bookButtons = document.querySelectorAll('.book-btn');
    
    bookButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tripName = e.target.getAttribute('data-name');
            modalTitle.textContent = tripName;
            modal.showModal(); 
        });
    });
}


closeModal.addEventListener('click', () => {
    modal.close();
});


modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.close();
    }
});


form.addEventListener('submit', () => {
   
    alert(`Thank you! Your booking for ${modalTitle.textContent} has been received. Check your email.`);
});