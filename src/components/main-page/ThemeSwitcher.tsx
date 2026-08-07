import React from "react";
import { useTheme } from "../../context/ThemeContext";
import '../../styles/main-page.css';

const ThemeSwitcher: React.FC = () => {
    const { isDarkMode, customColor, toggleTheme, setCustomColor, resetColor } = useTheme();

    return (
        <div id="theme-container">
            <button id="theme-toggle" onClick={toggleTheme}>
                {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
            <label id="color-picker-button">
                Choose Custom Color
                <input
                    type="color"
                    aria-label="Custom background color"
                    value={customColor ?? (isDarkMode ? '#000000' : '#BDBDBD')}
                    onChange={(e) => setCustomColor(e.target.value)}
                />
            </label>
            <button id="reset" onClick={resetColor} disabled={!customColor}>
                Reset Color
            </button>
        </div>
    );
};

export default ThemeSwitcher;
