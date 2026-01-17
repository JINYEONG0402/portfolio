import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = ({ slides }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (!slides || slides.length === 0) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides]);

    if (!slides || slides.length === 0) return null;

    return (
        <div className="relative h-screen w-full overflow-hidden bg-gray-900">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    {/* Background Image with Overlay */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${slides[currentSlide].image})`,
                        }}
                    >
                        <div
                            className="absolute inset-0 bg-black"
                            style={{ opacity: 1 - slides[currentSlide].brightness }}
                        />
                    </div>

                    {/* Content */}
                    <div className="relative h-full container mx-auto px-6 flex flex-col justify-center items-center text-center text-white">
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-5xl md:text-7xl font-bold mb-6"
                        >
                            {slides[currentSlide].title}
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="text-xl md:text-2xl max-w-2xl px-4"
                        >
                            {slides[currentSlide].content}
                        </motion.p>

                        {slides[currentSlide].buttonText && (
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.9 }}
                                className="mt-8"
                            >
                                <Link
                                    to={slides[currentSlide].link}
                                    className="px-8 py-3 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-200 transition-colors shadow-lg"
                                >
                                    {slides[currentSlide].buttonText}
                                </Link>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Indicators */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-3 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;
