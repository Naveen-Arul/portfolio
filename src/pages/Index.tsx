import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import Navigation from '../components/Navigation';
import ThemeToggle from '../components/ThemeToggle';
import GalaxyBackground from '../components/GalaxyBackground';

const Index = () => {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
    // If no saved theme, keep dark mode as default
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <div className={`portfolio ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <GalaxyBackground darkMode={darkMode} />
      <Navigation darkMode={darkMode} />
      <ThemeToggle darkMode={darkMode} onToggle={toggleTheme} />
      
      <main>
        <Hero darkMode={darkMode} />
        <About darkMode={darkMode} />
        <Experience darkMode={darkMode} />
        <Projects darkMode={darkMode} />
        <Skills darkMode={darkMode} />
        <Certifications darkMode={darkMode} />
        <Contact darkMode={darkMode} />
      </main>
    </div>
  );
};

export default Index;
