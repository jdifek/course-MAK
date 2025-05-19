// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    
    // Animate hamburger menu icon
    const spans = menuToggle.querySelectorAll('span');
    if (menu.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
  
  // Close menu when clicking on a menu item
  const menuLinks = menu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      // Reset hamburger icon
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
}

// FAQ accordion functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  if (question) {
    question.addEventListener('click', () => {
      // Toggle active state for the clicked item
      item.classList.toggle('active');
      
      // Close other FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
    });
  }
});

// Testimonial slider
const testimonialSlider = document.getElementById('testimonials-slider');
const dots = document.querySelectorAll('.dot');
let currentTestimonial = 0;

if (testimonialSlider && dots.length > 0) {
  // Function to show testimonial by index
  function showTestimonial(index) {
    const testimonials = testimonialSlider.querySelectorAll('.testimonial-item');
    
    // Hide all testimonials
    testimonials.forEach(testimonial => {
      testimonial.style.display = 'none';
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show the selected testimonial and activate the corresponding dot
    if (testimonials[index]) {
      testimonials[index].style.display = 'block';
      dots[index].classList.add('active');
      currentTestimonial = index;
    }
  }
  
  // Initialize the first testimonial
  showTestimonial(0);
  
  // Add click event listeners to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showTestimonial(index);
    });
  });
  
  // Auto rotate testimonials
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % dots.length;
    showTestimonial(currentTestimonial);
  }, 6000);
}

// Countdown timer
const countdownElement = document.getElementById('countdown');
const timerDateElement = document.getElementById('timer-date');

if (countdownElement && timerDateElement) {
  // Set the end date for the countdown (adjust as needed)
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 3); // 3 days from now
  
  // Format the date for display
  const options = { month: 'long', day: 'numeric' };
  timerDateElement.textContent = endDate.toLocaleDateString('ru-RU', options);
  
  // Update the countdown every second
  function updateCountdown() {
    const now = new Date();
    const timeLeft = endDate - now;
    
    if (timeLeft <= 0) {
      countdownElement.innerHTML = '<p>Время истекло!</p>';
      return;
    }
    
    // Calculate days, hours, minutes, seconds
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    // Update the DOM
    const daysElement = countdownElement.querySelector('.days');
    const hoursElement = countdownElement.querySelector('.hours');
    const minutesElement = countdownElement.querySelector('.minutes');
    
    if (daysElement) daysElement.textContent = days;
    if (hoursElement) hoursElement.textContent = hours;
    if (minutesElement) minutesElement.textContent = minutes;
  }
  
  // Initial update
  updateCountdown();
  
  // Update every minute
  setInterval(updateCountdown, 60000);
}

// Scroll animations
function handleScrollAnimations() {
  const elements = document.querySelectorAll('.slide-up, .fade-in-left, .fade-in-right');
  
  elements.forEach(element => {
    const position = element.getBoundingClientRect();
    
    // If element is in viewport
    if (position.top < window.innerHeight * 0.9) {
      element.classList.add('is-visible');
    }
  });
}

// Add scroll event listener
window.addEventListener('scroll', handleScrollAnimations);

// Initial check for elements in viewport
handleScrollAnimations();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Header appearance change on scroll
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = 'var(--shadow-md)';
  } else {
    header.style.boxShadow = 'var(--shadow-sm)';
  }
});