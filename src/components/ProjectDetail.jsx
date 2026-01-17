import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import java from 'react-syntax-highlighter/dist/esm/languages/hljs/java';

SyntaxHighlighter.registerLanguage('java', java);

import { projects } from '../data/content';
import { Calendar, ArrowLeft, ExternalLink, Tag, Github } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const project = projects[language].find(p => p.id === id);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
                <p className="text-xl text-gray-500 dark:text-gray-400">Project not found.</p>
                <button onClick={() => navigate('/project')} className="ml-4 text-blue-600 hover:underline">
                    Back to Projects
                </button>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-white dark:bg-gray-900 pt-32 pb-20 transition-colors duration-300"
        >
            <div className="container mx-auto px-6 max-w-5xl">

                {/* Back Button */}
                <button
                    onClick={() => navigate('/project')}
                    className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 flex items-center mb-8 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" /> Back to List
                </button>

                {/* Title Section */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                        {project.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
                        <span className="flex items-center text-sm font-medium bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                            <Calendar size={14} className="mr-2" />
                            {project.date}
                        </span>
                        <div className="flex gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-sm text-blue-600 dark:text-blue-400">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Main Image */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800"
                >
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-auto max-h-[600px] object-cover"
                    />
                </motion.div>

                {/* Content Container */}
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-loose"
                        >
                            {/* Render Description with Markdown Parsing */}
                            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-loose text-lg">
                                {(() => {
                                    // 1. Split by Image Pattern first to isolate images
                                    const parts = project.description.split(/(!\[.*?\]\(.*?\))/g);

                                    return parts.map((part, index) => {
                                        // Check if this part is an image
                                        const imageMatch = part.match(/!\[(.*?)\]\((.*?)\)/);
                                        if (imageMatch) {
                                            return (
                                                <div key={index} className="my-10">
                                                    <img
                                                        src={imageMatch[2]}
                                                        alt={imageMatch[1]}
                                                        className="w-full max-w-2xl mx-auto rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
                                                    />
                                                    {imageMatch[1] && <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-3">{imageMatch[1]}</p>}
                                                </div>
                                            );
                                        }

                                        // 2. Split by Code Block Pattern (```...```)
                                        // regex captures the code block including backticks
                                        const subParts = part.split(/(\`\`\`[\s\S]*?\`\`\`)/g);

                                        return subParts.map((subPart, subIndex) => {
                                            if (!subPart.trim()) return null;

                                            // Check if it's a code block
                                            if (subPart.trim().startsWith('```')) {
                                                const lines = subPart.trim().split('\n');
                                                const language = lines[0].replace(/```/, '').trim();
                                                // remove first line (```lang) and last line (```)
                                                const code = lines.slice(1, -1).join('\n');

                                                return (
                                                    <div key={`${index}-${subIndex}`} className="my-8 rounded-lg overflow-hidden shadow-xl border border-gray-700/50 bg-[#282c34]">
                                                        {/* Mac-style Window Header */}
                                                        <div className="flex items-center px-4 py-2 bg-[#21252b] border-b border-gray-700">
                                                            <div className="flex space-x-2">
                                                                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                                                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                                            </div>
                                                            <div className="ml-4 text-xs text-gray-400 font-mono">
                                                                {language ? `${language} snippet` : 'code'}
                                                            </div>
                                                        </div>
                                                        {/* Code Content */}
                                                        <SyntaxHighlighter
                                                            language={language || 'text'}
                                                            style={atomOneDark}
                                                            customStyle={{
                                                                margin: 0,
                                                                padding: '1.5rem',
                                                                fontSize: '0.9rem',
                                                                lineHeight: '1.6',
                                                                background: 'transparent'
                                                            }}
                                                            showLineNumbers={true}
                                                            wrapLines={true}
                                                        >
                                                            {code}
                                                        </SyntaxHighlighter>
                                                    </div>
                                                );
                                            }

                                            // 3. Regular text paragraph processing
                                            // Split by double newlines for paragraphs
                                            return subPart.split('\n\n').map((paragraph, pIndex) => {
                                                if (!paragraph.trim()) return null;

                                                const parseBold = (text) => {
                                                    const parts = text.split(/(\*\*.*?\*\*)/g);
                                                    return parts.map((innerPart, i) => {
                                                        if (innerPart.startsWith('**') && innerPart.endsWith('**')) {
                                                            return <strong key={i} className="font-bold text-gray-900 dark:text-white">{innerPart.replace(/\*\*/g, '')}</strong>;
                                                        }
                                                        return innerPart;
                                                    });
                                                };

                                                const lines = paragraph.split('\n');
                                                return (
                                                    <p key={`${index}-${subIndex}-${pIndex}`} className="mb-6">
                                                        {lines.map((line, i) => (
                                                            <span key={i}>
                                                                {parseBold(line)}
                                                                {i < lines.length - 1 && <br />}
                                                            </span>
                                                        ))}
                                                    </p>
                                                );
                                            });
                                        });
                                    });
                                })()}
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar / Meta Info */}
                    <div className="lg:w-1/3">
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 sticky top-32 transition-colors"
                        >
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">Project Info</h3>

                            <div className="mb-8">
                                <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Tech Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-full px-6 py-4 bg-gray-900 dark:bg-blue-600 text-white font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                                >
                                    <ExternalLink size={20} className="mr-2" />
                                    Visit Website
                                </a>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectDetail;
