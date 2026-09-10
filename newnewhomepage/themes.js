// Theme Management System
class ThemeManager {
    constructor() {
        this.themes = ['dark', 'light', 'neon', 'cyberpunk'];
        this.currentTheme = localStorage.getItem('selectedTheme') || 'dark';
        this.themeLink = document.getElementById('theme-link');
        this.themeToggle = document.getElementById('themeToggle');
        
        this.init();
    }
    
    init() {
        this.applyTheme(this.currentTheme);
        this.themeToggle.addEventListener('click', () => this.nextTheme());
        this.updateToggleIcon();
    }
    
    applyTheme(theme) {
        this.currentTheme = theme;
        this.themeLink.href = `themes/${theme}.css`;
        localStorage.setItem('selectedTheme', theme);
        this.updateToggleIcon();
    }
    
    nextTheme() {
        const currentIndex = this.themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % this.themes.length;
        this.applyTheme(this.themes[nextIndex]);
    }
    
    updateToggleIcon() {
        const icons = {
            'dark': '🌙',
            'light': '☀️',
            'neon': '⚡',
            'cyberpunk': '🤖'
        };
        this.themeToggle.textContent = icons[this.currentTheme] || '🎨';
    }
}

// Initialize theme manager when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ThemeManager();
    });
} else {
    new ThemeManager();
}