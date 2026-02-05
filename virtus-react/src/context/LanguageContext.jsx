import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('en');

    const toggleLanguage = () => {
        setLang((prev) => (prev === 'en' ? 'th' : 'en'));
    };

    useEffect(() => {
        if (lang === 'th') {
            document.body.classList.add('th');
            document.body.style.fontFamily = "'Sarabun', sans-serif";
        } else {
            document.body.classList.remove('th');
            document.body.style.fontFamily = "'Inter', sans-serif";
        }
    }, [lang]);

    return (
        <LanguageContext.Provider value={{ lang, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
