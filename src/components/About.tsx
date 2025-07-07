
interface AboutProps {
  darkMode: boolean;
}

const About = ({ darkMode }: AboutProps) => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        
        <div className="about-content">
          <div className="about-text">
            <p className="bio">
              A passionate B.Tech student in Artificial Intelligence and Data Science at Kongu Engineering College, 
              eager to apply academic knowledge to real-world problems. Strongly interested in solving challenging 
              problems and exploring innovative technologies. Committed to continuous learning and hands-on 
              implementation to make a real impact.
            </p>
            
            <div className="languages">
              <h3>Languages Known</h3>
              <div className="language-tags">
                <span className="tag">English</span>
                <span className="tag">Tamil</span>
                <span className="tag">Telugu</span>
              </div>
            </div>
          </div>
          
          <div className="education">
            <h3>Education</h3>
            <div className="education-timeline">
              <div className="education-item">
                <div className="education-year">2023–2027</div>
                <div className="education-details">
                  <h4>B.Tech, AI & Data Science</h4>
                  <p>Kongu Engineering College</p>
                  <span className="cgpa">CGPA: 8.60</span>
                </div>
              </div>
              
              <div className="education-item">
                <div className="education-year">2023</div>
                <div className="education-details">
                  <h4>HSC 12th</h4>
                  <p>Adhiyaman Matric Hr. Sec. School</p>
                  <span className="percentage">93.5%</span>
                </div>
              </div>
              
              <div className="education-item">
                <div className="education-year">2022</div>
                <div className="education-details">
                  <h4>HSC 11th</h4>
                  <span className="percentage">92.1%</span>
                </div>
              </div>
              
              <div className="education-item">
                <div className="education-year">2021</div>
                <div className="education-details">
                  <h4>SSLC</h4>
                  <span className="status">Passed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
