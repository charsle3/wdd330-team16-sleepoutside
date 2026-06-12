import { loadElements } from './utils.mjs';
loadElements();

// Newsletter form functionality
const newsletterForm = document.querySelector('#newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (newsletterEntry) => {
    newsletterEntry.preventDefault();

    const emailInput = document.getElementById('newsletter-email').value;
    const email = emailInput.trim();

    if (email !== '') {
      localStorage.setItem('newsletterEmail', email);
      window.location.href = '../thankyou.html';
    } else {
      alert('Please enter a valid email address.');
    }
  });
}

// Search form functionality
const searchForm = document.querySelector('#search-form');
if (searchForm) {
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchInput = document.getElementById('search-input').value;
    const query = searchInput.trim();

    if (query !== '') {
      // Redirects to the product listing page passing the search query via URL parameters
      // Using an absolute-style path root to ensure it resolves correctly from any nested page level
      window.location.href = `/product_listing/index.html?search=${encodeURIComponent(query)}`;
    }
  });
}