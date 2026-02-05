import { useLanguage } from '../../context/LanguageContext';

export const Text = ({ en, th }) => {
    const { lang } = useLanguage();
    return <>{lang === 'en' ? en : th}</>;
};
