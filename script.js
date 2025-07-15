// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// Scroll Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.fade-in, .slide-in').forEach(element => {
    observer.observe(element);
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
                hamburger.classList.remove('active');
            }
        }
    });
});

// Form Handling
const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    // Handle select field label
    const sofritoSelect = document.getElementById('sofritoType');
    sofritoSelect.addEventListener('change', function() {
        const label = this.nextElementSibling;
        if (this.value) {
            label.classList.add('active');
        } else {
            label.classList.remove('active');
        }
    });

    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(reservationForm);
        const data = Object.fromEntries(formData);
        
        // Validate date
        const selectedDate = new Date(data.date);
        
        if (selectedDate < new Date()) {
            alert('Please select a future date');
            return;
        }
        
        // Show loading state
        const submitButton = reservationForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Processing...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset form
            reservationForm.reset();
            
            // Show success message
            alert('Thank you for your order! We will contact you shortly to confirm.');
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// Recipe Modal Functionality
const modal = document.getElementById('recipeModal');
const closeButton = document.querySelector('.close-button');
const recipeContent = document.getElementById('recipeContent');

// Close modal when clicking the X button
closeButton.onclick = function() {
    modal.style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Recipe data
const recipes = {
    arroz: {
        title: "Arroz con Pollo",
        description: "A classic Caribbean dish that combines tender chicken with flavorful rice.",
        ingredients: [
            "2 cups of rice",
            "1 lb chicken pieces",
            "2 tbsp Yeni's Sofrito",
            "1 cup chicken broth",
            "1 cup water",
            "1/2 cup green peas",
            "1/2 cup diced carrots",
            "Salt and pepper to taste"
        ],
        instructions: [
            "Season chicken with salt and pepper",
            "In a large pot, sauté chicken until golden brown",
            "Add sofrito and stir for 2 minutes",
            "Add rice, broth, and water",
            "Bring to a boil, then simmer covered for 20 minutes",
            "Add peas and carrots, cook for 5 more minutes",
            "Let rest for 5 minutes before serving"
        ]
    },
    habichuelas: {
        title: "Habichuelas Guisadas",
        description: "Stewed beans that are a staple in Caribbean cuisine.",
        ingredients: [
            "2 cans of pink beans",
            "2 tbsp Yeni's Sofrito",
            "1/4 cup tomato sauce",
            "1/2 cup water",
            "1/2 tsp oregano",
            "Salt and pepper to taste"
        ],
        instructions: [
            "Drain and rinse the beans",
            "In a pot, heat sofrito for 2 minutes",
            "Add beans, tomato sauce, and water",
            "Season with oregano, salt, and pepper",
            "Simmer for 15-20 minutes",
            "Serve hot with rice"
        ]
    },
    carne: {
        title: "Carne Guisada",
        description: "A hearty beef stew that's perfect for family dinners.",
        ingredients: [
            "2 lbs beef stew meat",
            "3 tbsp Yeni's Sofrito",
            "1 cup beef broth",
            "1 cup water",
            "2 potatoes, cubed",
            "1 carrot, sliced",
            "Salt and pepper to taste"
        ],
        instructions: [
            "Season beef with salt and pepper",
            "Brown beef in a large pot",
            "Add sofrito and stir for 2 minutes",
            "Add broth and water",
            "Simmer covered for 1 hour",
            "Add potatoes and carrots",
            "Cook for 30 more minutes until vegetables are tender"
        ]
    }
};

function showRecipe(recipeId) {
    const recipe = recipes[recipeId];
    if (!recipe) return;

    let content = `
        <h2>${recipe.title}</h2>
        <p>${recipe.description}</p>
        
        <h3>Ingredients:</h3>
        <ul>
            ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        
        <h3>Instructions:</h3>
        <ol>
            ${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
        </ol>
    `;

    recipeContent.innerHTML = content;
    modal.style.display = "block";
} 