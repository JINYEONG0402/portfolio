import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { staticContent } from '../data/content';

const Contact = () => {
    const { language } = useLanguage();
    const content = staticContent[language].contact;

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate sending
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setShowSuccess(true);
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 pt-32 pb-20 transition-colors duration-300">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                        {content.title}
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        {content.subtitle}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        {/* Info Cards - keeping them simple for now, can be translated if needed but keys are universal */}
                        <div className="flex items-start space-x-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl transform hover:scale-105 transition-transform duration-300">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full text-blue-600 dark:text-blue-400">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Email</h3>
                                <p className="text-gray-600 dark:text-gray-400">jinyeong0402@naver.com</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl transform hover:scale-105 transition-transform duration-300">
                            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full text-purple-600 dark:text-purple-400">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Phone</h3>
                                <p className="text-gray-600 dark:text-gray-400">010-8210-5347</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl transform hover:scale-105 transition-transform duration-300">
                            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full text-green-600 dark:text-green-400">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Location</h3>
                                <p className="text-gray-600 dark:text-gray-400">Jeonju, South Korea</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gray-50 dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{content.name_label}</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formState.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{content.email_label}</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{content.message_label}</label>
                                <textarea
                                    name="message"
                                    value={formState.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none dark:text-white"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-xl transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span>{content.sending}</span>
                                ) : (
                                    <>
                                        <Send size={20} />
                                        <span>{content.send_btn}</span>
                                    </>
                                )}
                            </button>

                            {showSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl text-center text-sm font-medium"
                                >
                                    {content.success}
                                </motion.div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
