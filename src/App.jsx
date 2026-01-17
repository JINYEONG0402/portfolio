import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Introduce from './components/Introduce';
import Projects from './components/Projects';
import ProjectDetail from './components/ProjectDetail';
import Contact from './components/Contact';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
    return (
        <LanguageProvider>
            <Router>
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/introduce" element={<Introduce />} />
                        <Route path="/project" element={<Projects />} />
                        <Route path="/project/:id" element={<ProjectDetail />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </div>
            </Router>
        </LanguageProvider>
    );
}

export default App;
