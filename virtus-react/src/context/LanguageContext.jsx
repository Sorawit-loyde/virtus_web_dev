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
        } else {
            document.body.classList.remove('th');
        }
    }, [lang]);

    return (
        <LanguageContext.Provider value={{ lang, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
