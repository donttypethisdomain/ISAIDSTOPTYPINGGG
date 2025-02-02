console.log("Welcome to GameZone!");

function loadGame(gameUrl) {
    const gameContainer = document.getElementById("game-container");
    const gameFrame = document.getElementById("game-frame");

    // Set the iframe source to the selected game's URL
    gameFrame.src = gameUrl;

    // Show the iframe container
    gameContainer.style.display = "block";

    // Scroll to the top of the iframe container
    window.scrollTo({
        top: gameContainer.offsetTop,
        behavior: "smooth"
    });
}

// Optional: Add hover effects for the back arrow dynamically
document.addEventListener("DOMContentLoaded", () => {
    const backArrow = document.querySelector(".back-arrow");
    if (backArrow) {
        backArrow.addEventListener("mouseover", () => {
            backArrow.style.backgroundColor = "#555";
        });

        backArrow.addEventListener("mouseout", () => {
            backArrow.style.backgroundColor = "#333";
        });
    }
});

// Function to search games
function searchGames() {
    const input = document.getElementById("gameSearch").value.toLowerCase();
    const gameCards = document.querySelectorAll(".game-card");

    gameCards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        if (title.includes(input)) {
            card.style.display = "block"; // Show matching cards
        } else {
            card.style.display = "none"; // Hide non-matching cards
        }
    });
}

function searchGames() {
    const input = document.getElementById("gameSearch").value.toLowerCase();
    const gameCards = document.querySelectorAll(".game-card");
    const sectionLabels = document.querySelectorAll(".section-label");
    const noResultsMessage = document.getElementById("no-results");
    let hasResults = false;

    if (input) {
        // Hide all section labels
        sectionLabels.forEach(label => (label.style.display = "none"));

        // Filter game cards
        gameCards.forEach(card => {
            const title = card.querySelector("h3").textContent.toLowerCase();
            if (title.includes(input)) {
                card.style.display = "block";
                hasResults = true;
            } else {
                card.style.display = "none";
            }
        });

        // Show "no results" message if no matches
        if (!hasResults) {
            if (!noResultsMessage) {
                const message = document.createElement("div");
                message.id = "no-results";
                message.textContent = "Sorry, but we don't seem to have that :(";
                document.getElementById("games").appendChild(message);
            } else {
                noResultsMessage.style.display = "block";
            }
        } else if (noResultsMessage) {
            noResultsMessage.style.display = "none";
        }
    } else {
        // Restore original layout
        sectionLabels.forEach(label => (label.style.display = "block"));

        // Show all game cards
        gameCards.forEach(card => (card.style.display = "block"));

        // Hide "no results" message
        if (noResultsMessage) noResultsMessage.style.display = "none";
    }
}

// Disable Right Click
document.addEventListener("contextmenu", (event) => event.preventDefault());

// Disable DevTools Shortcuts
document.addEventListener("keydown", (event) => {
    if (
        event.key === "F12" || 
        (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J" || event.key === "C")) || 
        (event.ctrlKey && event.key === "U")
    ) {
        event.preventDefault();
    }
});

// Auto-Detect DevTools & Close Tab or Redirect
let devtoolsOpen = false;

const checkDevTools = () => {
    const threshold = 160; // DevTools detection size
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;

    if (widthThreshold || heightThreshold) {
        devtoolsOpen = true;

        // Try to Close the Tab Automatically
        window.open('', '_self').close(); // Attempt to close tab

        // If close fails, redirect instantly
        window.location.replace("https://www.google.com"); // Redirect to another page
    } else {
        devtoolsOpen = false;
    }
};

// Continuously check for DevTools every 1 second
setInterval(checkDevTools, 1000);

// Disable Console (Prevents Inspecting Code)
setInterval(() => {
    console.clear();
    console.log = function () {};
    console.warn = function () {};
    console.error = function () {};
}, 100);
