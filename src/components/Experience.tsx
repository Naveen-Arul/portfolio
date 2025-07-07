
interface ExperienceProps {
  darkMode: boolean;
}

const Experience = ({ darkMode }: ExperienceProps) => {
  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        
        <div className="experience-content">
          <div className="experience-card">
            <div className="experience-header">
              <div className="company-info">
                <h3 className="company-name">PunchBiz</h3>
                <h4 className="role">Full Stack AI Developer Intern</h4>
              </div>
              <div className="timeline">
                <span className="status current">Current</span>
              </div>
            </div>
            
            <div className="experience-details">
              <p className="role-description">
                Working on cutting-edge web development projects with a focus on full-stack development 
                and AI-powered application integration.
              </p>
              
              <div className="tasks">
                <h5>Key Responsibilities:</h5>
                <ul>
                  <li>Web development with modern frameworks and technologies</li>
                  <li>Building full-stack features from concept to deployment</li>
                  <li>AI-powered application integration and optimization</li>
                  <li>Collaborating with cross-functional teams on innovative solutions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
