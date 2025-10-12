// src/app/theme.tsx

'use client';

import { useState, useEffect } from 'react';
// 💡 IMPORTANT: Use the underlying 'next-themes' package if fumadocs re-export is tricky.
// You must run 'npm install next-themes' first.
import { useTheme } from 'next-themes'; 


export default function ThemeToggle() {
    // 1. Get theme state and setter from the hook
    const { theme, setTheme } = useTheme(); 
    // This state is crucial for Next.js SSR to prevent hydration errors.
    const [mounted, setMounted] = useState(false); 

    useEffect(() => {
        setMounted(true);
    }, []);

    // 2. Prevent rendering on the server. Return null or a placeholder 
    // until the component is mounted on the client.
    if (!mounted) {
        return <button className="fixed top-4 right-4 w-10 h-10 p-0 m-0 z-50"></button>; 
    }

    // Determine the current state based on the hook
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const toggleTheme = () => {
        // 3. Use the hook's setter to toggle the theme.
        // It automatically handles the localStorage update and the class on <html>.
        setTheme(isDark ? 'light' : 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors p-0 m-0 z-50"
            aria-label="Toggle Theme"
            style={{ lineHeight: 0 }}
        >
            {/* The SVG logic is correct, it uses the state controlled by the hook */}
            {isDark ? (
                // Sun Icon (Visible when current theme is dark)
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M6.05 6.05L4.636 4.636m12.728 0l-1.414 1.414M6.05 17.95l-1.414 1.414M12 7a5 5 0 100 10 5 5 0 000-10z" />
                </svg>
            ) : (
                // Moon Icon (Visible when current theme is light)
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
            )}
        </button>
    );
}