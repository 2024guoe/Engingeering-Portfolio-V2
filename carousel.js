// Carousel functionality for project cards
class ProjectCarousel {
  constructor(projectElement) {
    this.project = projectElement;
    this.track = projectElement.querySelector('.carousel-track');
    this.slides = projectElement.querySelectorAll('.carousel-slide');
    this.dots = projectElement.querySelectorAll('.carousel-dot');
    this.leftArrow = projectElement.querySelector('.carousel-arrow.left');
    this.rightArrow = projectElement.querySelector('.carousel-arrow.right');
    
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    
    this.init();
  }
  
  init() {
    // Arrow click handlers
    if (this.leftArrow) {
      this.leftArrow.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.prevSlide();
      });
    }
    
    if (this.rightArrow) {
      this.rightArrow.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.nextSlide();
      });
    }
    
    // Dot click handlers
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.goToSlide(index);
      });
    });
    
    // Start autoplay on hover
    this.project.addEventListener('mouseenter', () => {
      this.startAutoPlay();
    });
    
    // Stop autoplay when mouse leaves
    this.project.addEventListener('mouseleave', () => {
      this.stopAutoPlay();
      this.goToSlide(0); // Reset to first slide
    });
  }
  
  goToSlide(index) {
    this.currentIndex = index;
    const offset = -100 * index;
    this.track.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    this.dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.goToSlide(this.currentIndex);
  }
  
  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(this.currentIndex);
  }
  
  startAutoPlay() {
    this.stopAutoPlay(); // Clear any existing interval
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 3000); // Change slide every 3 seconds
  }
  
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const projects = document.querySelectorAll('.project');
  projects.forEach(project => {
    new ProjectCarousel(project);
  });
});