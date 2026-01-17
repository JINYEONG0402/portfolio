import React from 'react';
import Hero from './Hero';
import { useLanguage } from '../contexts/LanguageContext';
import { heroSlides } from '../data/content';

const Home = () => {
    const { language } = useLanguage();
    const slides = heroSlides[language];

    return (
        <>
            {/* Hero Section Only */}
            <Hero slides={slides} />
        </>
    );
};

export default Home;
