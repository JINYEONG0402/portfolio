import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    // Get initial language from localStorage or browser preference, default to 'ko'
    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) return savedLanguage;

        // Optional: Check browser language
        // const browserLang = navigator.language || navigator.userLanguage;
        // return browserLang.startsWith('ko') ? 'ko' : 'en';

        return 'ko';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.lang = language;
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'ko' ? 'en' : 'ko');
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
