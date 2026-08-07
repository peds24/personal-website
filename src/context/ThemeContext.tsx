import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeState {
    mode: Theme;
    customColor: string | null;
}

interface ThemeApi {
    mode: Theme;
    isDarkMode: boolean;
    customColor: string | null;
    toggleTheme: () => void;
    setCustomColor: (color: string) => void;
    resetColor: () => void;
}

const DEFAULTS: Record<Theme, { bg: string; text: string }> = {
    light: { bg: '#BDBDBD', text: '#000' },
    dark: { bg: '#000', text: '#fff' },
};

const ThemeContext = createContext<ThemeApi | null>(null);

/**
 * Theme lives above the router so it survives navigation. It used to be owned by
 * ThemeSwitcher, which only mounts on the home page — every other page rendered
 * unthemed until you went back home.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<ThemeState>(() => {
        try {
            const saved = localStorage.getItem('theme');
            return saved ? (JSON.parse(saved) as ThemeState) : { mode: 'light', customColor: null };
        } catch (error) {
            console.error('Error parsing theme from localStorage:', error);
            return { mode: 'light', customColor: null };
        }
    });

    const isDarkMode = state.mode === 'dark';

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(state));
        const { bg, text } = DEFAULTS[state.mode];
        document.documentElement.style.setProperty('--bg-color', state.customColor ?? bg);
        document.documentElement.style.setProperty('--text-color', text);
        document.documentElement.setAttribute('data-theme', state.mode);
    }, [state, isDarkMode]);

    const toggleTheme = useCallback(() => {
        setState(prev => ({ ...prev, mode: prev.mode === 'light' ? 'dark' : 'light' }));
    }, []);

    const setCustomColor = useCallback((color: string) => {
        setState(prev => ({ ...prev, customColor: color }));
    }, []);

    const resetColor = useCallback(() => {
        setState(prev => ({ ...prev, customColor: null }));
    }, []);

    return (
        <ThemeContext.Provider
            value={{ mode: state.mode, isDarkMode, customColor: state.customColor, toggleTheme, setCustomColor, resetColor }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeApi => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used inside a ThemeProvider');
    return ctx;
};
