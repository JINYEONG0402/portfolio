import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Moon, Sun, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { staticContent } from '../data/content';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { language, toggleLanguage } = useLanguage();
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' ||
                (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Dark Mode Effect
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    const isHome = location.pathname === '/';
    // Dynamic Header Classes
    // Dark mode: bg-gray-900 text-white
    // Light mode Home(!scrolled): transparent text-white
    // Light mode Scrolled/Other: bg-white text-gray-900

    const getHeaderClass = () => {
        if (isHome && !isScrolled) return 'bg-transparent text-white dark:text-white';
        return 'bg-white text-gray-900 shadow-md dark:bg-gray-900 dark:text-white dark:shadow-gray-800';
    };

    const getLinkClass = () => {
        if (isHome && !isScrolled) return 'text-white/90 hover:opacity-75 dark:text-white/90';
        return 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400';
    };

    const getIconClass = () => {
        if (isHome && !isScrolled) return 'text-white dark:text-white';
        return 'text-gray-600 dark:text-gray-300';
    };

    const navItems = [
        { name: staticContent[language].header.nav.home, path: '/' },
        { name: staticContent[language].header.nav.introduce, path: '/introduce' },
        { name: staticContent[language].header.nav.project, path: '/project' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 ${getHeaderClass()}`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold tracking-wider">
                    {staticContent[language].header.title}
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`font-medium text-sm uppercase tracking-wide transition-colors ${getLinkClass()}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Right Icons */}
                <div className="hidden md:flex items-center space-x-4">
                    <button
                        onClick={toggleDarkMode}
                        className={`hover:opacity-75 transition-transform hover:scale-110 ${getIconClass()}`}
                        aria-label="Toggle Dark Mode"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    {/* Placeholder for Search - optional
                    <button className={`hover:opacity-75 ${getIconClass()}`}><Search size={20} /></button>
                     */}
                    <button
                        onClick={toggleLanguage}
                        className={`flex items-center hover:opacity-75 ${getIconClass()} text-sm font-medium`}
                    >
                        <Globe size={18} className="mr-1" /> {staticContent[language].header.toggle}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ?
                        <X className={getIconClass()} /> :
                        <Menu className={getIconClass()} />
                    }
                </button>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 absolute top-full left-0 right-0 shadow-lg py-4 px-6 flex flex-col space-y-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="text-gray-800 dark:text-gray-200 font-medium py-2 border-b border-gray-100 dark:border-gray-800 last:border-0 uppercase text-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">Dark Mode</span>
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-yellow-400"
                        >
                            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">Language</span>
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center text-gray-800 dark:text-gray-200 font-medium"
                        >
                            <Globe size={18} className="mr-1" /> {staticContent[language].header.toggle}
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
