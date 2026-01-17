import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects, staticContent } from '../data/content';
import { Calendar, ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Projects = () => {
    const { language } = useLanguage();
    const [sortOrder, setSortOrder] = useState('desc'); // 'desc' (newest) or 'asc' (oldest)

    // Get content based on language
    const currentProjects = projects[language];
    const uiContent = staticContent[language].projects;

    // Sort projects
    const sortedProjects = [...currentProjects].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-32 pb-20 transition-colors duration-300">
            <div className="container mx-auto px-6 max-w-5xl">

                {/* Page Header */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
                    >
                        {uiContent.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                    >
                        {uiContent.subtitle}
                    </motion.p>
                </div>

                {/* Sort Control */}
                <div className="flex justify-end mb-8">
                    <div className="relative inline-block text-left group">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <span className="text-sm font-medium">
                                {sortOrder === 'desc' ? uiContent.sort_newest : uiContent.sort_oldest}
                            </span>
                            <ChevronDown size={16} />
                        </button>
                        {/* Dropdown Menu - Simple CSS Hover (or click using state if preferred, but simple hover is fine for now or focus-within) */}
                        <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 transform origin-top-right">
                            <div className="py-1">
                                <button
                                    onClick={() => setSortOrder('desc')}
                                    className={`block w-full text-left px-4 py-2 text-sm ${sortOrder === 'desc' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                >
                                    {uiContent.sort_newest}
                                </button>
                                <button
                                    onClick={() => setSortOrder('asc')}
                                    className={`block w-full text-left px-4 py-2 text-sm ${sortOrder === 'asc' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                >
                                    {uiContent.sort_oldest}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Projects List */}
                <div className="space-y-6">
                    <AnimatePresence mode='popLayout'>
                        {sortedProjects.map((project, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                key={project.id}
                            >
                                <Link
                                    to={`/project/${project.id}`}
                                    className="block bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 group relative overflow-hidden"
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex-grow">
                                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                                                <Calendar size={14} className="mr-2" />
                                                {project.date}
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                                                {project.summary}
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                {project.tags.map(tag => (
                                                    <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex-shrink-0">
                                            <span className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:underline">
                                                View Project <ArrowRight size={20} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Projects;
