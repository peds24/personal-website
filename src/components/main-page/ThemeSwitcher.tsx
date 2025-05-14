import React, { useCallback, useEffect, useState } from "react";
import '../../styles/main-page.css';

type Theme = 'light' | 'dark';
interface ThemeState {
    mode: Theme;
    customColor: string | null;
}

const ThemeSwitcher: React.FC = () => {
    const [themeState, setThemeState] = useState<ThemeState>(() => {
        try {
            const savedTheme = localStorage.getItem('theme');
            return savedTheme ? JSON.parse(savedTheme) : { mode: 'light', customColor: null };
        } catch (error) {
            console.error('Error parsing theme from localStorage:', error);
            return { mode: 'light', customColor: null };
        }
    });

    const isDarkMode = themeState.mode === 'dark';

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(themeState));
        if (isDarkMode) {
            document.documentElement.style.setProperty('--bg-color', themeState.customColor || '#000');
            document.documentElement.style.setProperty('--text-color', '#fff');
        } else {
            document.documentElement.style.setProperty('--bg-color', themeState.customColor || '#BDBDBD');
            document.documentElement.style.setProperty('--text-color', '#000');
        }

        document.documentElement.setAttribute('data-theme', themeState.mode);
    }, [themeState, isDarkMode]);

    // Toggle between light and dark modes
    const toggleTheme = () => {
        setThemeState(prev => ({
            ...prev,
            mode: prev.mode === 'light' ? 'dark' : 'light'
        }));
    };

    const openColorPicker = () => {
        console.error("openColorPicker function is not implemented yet.");
    };

    const resetColor = () => {
        console.error("resetColor function is not implemented yet.");
    };

    return (
        <div id="theme-container">
            <button id="theme-toggle" onClick={toggleTheme}>
                {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
            <button id="color-picker-button" onClick={openColorPicker}>
                Choose Custom Color
            </button>
            <button id="reset" onClick={resetColor}>
                Reset Color
            </button>
        </div>
    );
};

export default ThemeSwitcher;