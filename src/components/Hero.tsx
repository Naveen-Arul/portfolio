interface HeroProps {
  darkMode: boolean;
}

const Hero = ({ darkMode }: HeroProps) => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-image">
            <img 
              src="/profile-assets/profile-pic.png" 
              alt="Naveen A - Profile"
              className="profile-image"
            />
          </div>
          
          <div className="hero-text">
            <h1 className="hero-name">NAVEEN A</h1>
            <h2 className="hero-title">Full Stack AI Developer & AI Enthusiast</h2>
            <p className="hero-description">
              Passionate about creating intelligent solutions and exploring innovative technologies
            </p>
            
            <div className="hero-buttons">
              <a 
                href="https://drive.google.com/file/d/13aaGQ6LHFyvZyIcXQJRUnmzoEiF8DO6O/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cta-button primary"
              >
                View Resume →
              </a>
              <a 
                href="https://github.com/Naveen-Arul" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cta-button secondary"
              >
                Explore Projects →
              </a>
              <button onClick={scrollToContact} className="cta-button tertiary">
                Get in Touch →
              </button>
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
