const toggleTheme = document.getElementById('theme-toggle');

const initializeTheme = () => {
    const savedTheme = localStorage.getItem('themeMode');

    let initialTheme = savedTheme ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    if (initialTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.body.classList.remove('bg-white', 'text-gray-800');
        document.body.classList.add('bg-gray-900', 'text-gray-100');
    } else {
        document.documentElement.classList.remove('dark');

        document.body.classList.add('bg-white', 'text-gray-800');
        document.body.classList.remove('bg-gray-900', 'text-gray-100');
    }

    localStorage.setItem('themeMode', initialTheme);
};
const handleThemeToggle = () => {
    const currentTheme = localStorage.getItem('themeMode') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    localStorage.setItem('themeMode', newTheme);

    document.documentElement.classList.toggle('dark');
    if (newTheme === 'dark') {
        document.body.classList.remove('bg-white', 'text-gray-800');
        document.body.classList.add('bg-gray-900', 'text-gray-100');
    } else {
        document.body.classList.add('bg-white', 'text-gray-800');
        document.body.classList.remove('bg-gray-900', 'text-gray-100');
    }
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        themeToggleBtn.textContent = newTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }
}

initializeTheme();
toggleTheme.addEventListener('click', handleThemeToggle);