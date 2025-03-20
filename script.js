const sections = document.querySelectorAll("section");
let currentIndex = 0;
let isScrolling = false;
let startY = 0;
let endY = 0;

// Function to update the section heights dynamically
function updateSectionHeights() {
    const viewportHeight = window.innerHeight;
    sections.forEach(section => {
        section.style.height = `${viewportHeight}px`;
        console.log(`Section height updated to: ${viewportHeight}px`);
    });
}

// Call the function to update section heights on load and resize
updateSectionHeights();
window.addEventListener("resize", updateSectionHeights);

function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
        isScrolling = true;

        console.log(`Before scrolling to section ${index}:`, sections[index].offsetHeight);

        window.scrollTo({
            top: sections[index].offsetTop,
            behavior: "smooth"
        });

        setTimeout(() => {
            document.body.offsetHeight; // Force reflow to reset height
            console.log("Reflow triggered:", sections[index].offsetHeight);
            isScrolling = false;
            currentIndex = index;
        }, 800);
    }
}

// Mouse wheel scroll
document.addEventListener("wheel", (event) => {
    if (isScrolling) return;

    console.log("Current window innerHeight:", window.innerHeight);

    if (event.deltaY > 0 && currentIndex < sections.length - 1) {
        scrollToSection(++currentIndex);
    } 
    else if (event.deltaY < 0 && currentIndex > 0) {
        scrollToSection(--currentIndex);
    }
});

// Debugging the viewport height during scroll
window.addEventListener("resize", () => {
    console.log("Window inner height (on resize):", window.innerHeight);
});

// Touch event handling for mobile (Swipe Up/Down)
document.addEventListener("touchstart", (event) => {
    startY = event.touches[0].clientY;
    console.log("Touchstart - startY:", startY); // Log startY value
});

document.addEventListener("touchend", (event) => {
    endY = event.changedTouches[0].clientY;
    console.log("Touchend - endY:", endY); // Log endY value

    let deltaY = startY - endY;
    console.log("Swipe deltaY:", deltaY); // Log the deltaY (distance between start and end)

    if (Math.abs(deltaY) > 50 && !isScrolling) { // Minimum swipe distance to prevent accidental triggers
        if (deltaY > 0 && currentIndex < sections.length - 1) {
            console.log("Swipe Up (Scroll Down)"); // Log swipe up action
            scrollToSection(++currentIndex); // Swipe up (scroll down)
        } else if (deltaY < 0 && currentIndex > 0) {
            console.log("Swipe Down (Scroll Up)"); // Log swipe down action
            scrollToSection(--currentIndex); // Swipe down (scroll up)
        }
    } else {
        console.log("Swipe distance too short, no scroll triggered.");
    }
});
