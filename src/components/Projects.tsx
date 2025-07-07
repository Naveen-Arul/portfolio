
interface ProjectsProps {
  darkMode: boolean;
}

const Projects = ({ darkMode }: ProjectsProps) => {
  const projects = [
    {
      title: "Comprehensive Analysis of Misinformation and Fake News",
      type: "Machine Learning Project",
      description: "Developed a machine learning model to detect and analyze misinformation and fake news. Utilized data preprocessing and classification algorithms to distinguish between real and fake news articles. Implemented various ML techniques to improve the accuracy and reliability of detection.",
      technologies: ["Python", "Machine Learning", "NLP", "Scikit-learn", "Pandas"],
      link: "https://github.com/Naveen-Arul"
    },
    {
      title: "College Student Management System",
      type: "Java Project",
      description: "Designed and developed a College Student Management System to efficiently handle student data and operations. Implemented core functionalities like student record management, data storage, retrieval, and basic database operations. Applied Java programming concepts and integrated SQL database for backend support.",
      technologies: ["Java", "SQL", "DBMS"],
      link: "https://github.com/Naveen-Arul"
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <h3 className="project-title">📌 {project.title}</h3>
                <span className="project-type">{project.type}</span>
              </div>
              
              <p className="project-description">{project.description}</p>
              
              <div className="project-technologies">
                <h4>Tools and Technologies:</h4>
                <div className="tech-tags">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-link"
              >
                View on GitHub →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
