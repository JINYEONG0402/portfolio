import React from 'react';
import { motion } from 'framer-motion';
import { Github, Download, Code2, Database, Brain, GraduationCap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { staticContent } from '../data/content';

const Introduce = () => {
    const { language } = useLanguage();
    const content = staticContent[language].introduce;

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const skills = [
        { category: "Languages", items: ["JavaScript", "Python", "Kotlin"] },
        { category: "Frontend", items: ["React", "Vue.js"] },
        { category: "Backend & Data", items: ["MySQL", "Node.js"] },
        { category: "AI & Tools", items: ["LangGraph", "Git"] }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#FFF5F5] to-white dark:from-gray-900 dark:to-gray-900 pt-32 pb-20 transition-colors duration-300">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="flex flex-col md:flex-row gap-16">

                    {/* Left Column: Sticky Profile */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/3 flex flex-col items-center text-center md:items-start md:text-left h-fit md:sticky md:top-32"
                    >
                        <div className="relative group">
                            <div className="absolute inset-0 bg-blue-200 dark:bg-blue-900/30 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                            <div className="w-64 h-64 rounded-full overflow-hidden mb-8 border-4 border-white dark:border-gray-800 shadow-xl relative z-10 transform transition-transform duration-500 hover:scale-105">
                                <img
                                    src="/media/avatar.jpg"
                                    alt="Ko Jin-young"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">{content.name}</h1>
                        {content.role && <p className="text-xl text-blue-600 dark:text-blue-400 font-medium mb-1">{content.role}</p>}
                        <p className="text-gray-500 dark:text-gray-400 mb-6">{content.dept}</p>

                        <div className="flex space-x-4 mb-8">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                <Github size={20} />
                                <span>GitHub</span>
                            </a>
                        </div>

                        <a
                            href="#"
                            className="group flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 mb-12 transition-colors"
                        >
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
                                <Download size={20} />
                            </div>
                            <span className="border-b border-transparent group-hover:border-blue-800 dark:group-hover:border-blue-300">{content.btn_resume}</span>
                        </a>
                    </motion.div>

                    {/* Right Column: Details */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="md:w-2/3"
                    >
                        {/* About Me */}
                        <section className="mb-16">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-lg mr-3"></span>
                                {content.about_title}
                            </h3>
                            <div className="prose prose-lg text-gray-700 dark:text-gray-300 leading-relaxed bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                                <p
                                    className="whitespace-pre-line"
                                    dangerouslySetInnerHTML={{ __html: content.about_text }}
                                ></p>
                            </div>
                        </section>

                        {/* Skills */}
                        <section className="mb-16">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-2 rounded-lg mr-3"></span>
                                {content.tech_title}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {skills.map((skillGroup, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ y: -5 }}
                                        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
                                    >
                                        <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                                            {skillGroup.category === "Languages" && <Code2 size={18} className="mr-2 text-blue-500" />}
                                            {skillGroup.category === "Backend & Data" && <Database size={18} className="mr-2 text-green-500" />}
                                            {skillGroup.category === "AI & Tools" && <Brain size={18} className="mr-2 text-purple-500" />}
                                            {skillGroup.category}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {skillGroup.items.map(skill => (
                                                <span key={skill} className="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium border border-gray-100 dark:border-gray-600">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Education Timeline */}
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-2 rounded-lg mr-3">🎓</span>
                                {content.edu_title}
                            </h3>
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden transition-colors">
                                <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-gray-100 dark:bg-gray-700"></div>

                                <div className="relative pl-10 mb-8 last:mb-0">
                                    <div className="absolute left-6 top-1.5 w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-gray-800 shadow-sm transform -translate-x-1/2"></div>
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">{content.edu_1_title}</h4>
                                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded mb-2 inline-block">2025</span>
                                    <p className="text-gray-600 dark:text-gray-400">{content.edu_1_desc}</p>
                                </div>

                                <div className="relative pl-10">
                                    <div className="absolute left-6 top-1.5 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 border-4 border-white dark:border-gray-800 shadow-sm transform -translate-x-1/2"></div>
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">{content.edu_2_title}</h4>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded mb-2 inline-block">2022 - 2026</span>
                                    <p className="text-gray-600 dark:text-gray-400">{content.edu_2_desc}</p>
                                </div>
                            </div>
                        </section>

                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Introduce;
