$(document).ready(function () {
	
	//Menu responsive 
  $(".menu-open").click(function () {
    $("ul.menu").toggleClass("show");
    $(".menu-open").toggleClass("cross");
  });

 const animatedElements = document.querySelectorAll('.animated-element');

const animateOnScroll = (entries, observer) => {
	
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate'); // Add class to trigger animation
      observer.unobserve(entry.target); // Stop observing once animated
	  
    }
	 
	
  });
};

const observer = new IntersectionObserver(animateOnScroll, {
  root: null, // Use the viewport as the root
  threshold: 0.2, // 20% of the element must be visible to trigger
});
  
  
  
  animatedElements.forEach((element) => {
  observer.observe(element); // Start observing each animated element
});


});

//Progress indicator
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;

  const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;

  const scrollIndicator = document.querySelector(".scroll-indicator");
  scrollIndicator.style.width = `${scrolled}%`;
});
