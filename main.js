// const newid = document.getElementById("newid")
// console.log(newid)
// const handleclicks= ()  => {
//     console.log("Button click hova")
// }
// newid.addEventListener("click",handleclicks)

/**
 * main.js
 * Entry point for client-side JavaScript.
 * Initializes theme and sets up the Dark/Light mode toggle button.
 */

import { initializeTheme, toggleTheme } from "./src/utils/themeUtils.js";
import { THEME_MODE } from './constants/themeConstants.js';


// ------------------------------------------
// Task 3: Use ES6 Arrow Functions for all handlers
// ------------------------------------------

/**
 * Theme UI update callback function (Task 4 Callback)
 * Updates the toggle button icon/text based on the new theme.
 * @param {string} currentTheme - The theme mode currently active.
 */
const updateThemeButtonUI = (currentTheme) => {
    const button = document.getElementById('theme-toggle');
    if (!button) return;

    // Use a simpler approach for icon/text update
    if (currentTheme === THEME_MODE.DARK) {
        button.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <span class="sr-only">Toggle Light Mode</span>
        `;
    } else {
        button.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
            <span class="sr-only">Toggle Dark Mode</span>
        `;
    }
};

/**
 * Event handler for theme toggle button click. (Task 3 Arrow Function)
 */
const handleThemeToggle = () => {
    // Task 4: The logic is in themeUtils, passing updateThemeButtonUI as a callback
    toggleTheme(updateThemeButtonUI);
};

/**
 * Main function to set up event listeners.
 */
const init = () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    if (themeToggleButton) {
        // Set up the event listener using the arrow function handler
        themeToggleButton.addEventListener('click', handleThemeToggle);
    }
    
    // Initialize the theme on load (also runs the callback to set button icon)
    initializeTheme(updateThemeButtonUI);
};


// Run initialization when the DOM is fully loaded
window.addEventListener('DOMContentLoaded', init);