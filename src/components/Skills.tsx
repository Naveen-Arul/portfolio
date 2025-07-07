
interface SkillsProps {
  darkMode: boolean;
}

const Skills = ({ darkMode }: SkillsProps) => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Java", "C", "Python", "HTML", "CSS", "JavaScript"],
      icon: "💻"
    },
    {
      title: "Frameworks & Libraries",
      skills: ["Pandas", "NumPy", "TensorFlow", "React", "Node.js", "fastAPI"],
      icon: "⚡"
    },
    {
      title: "Tools",
      skills: ["Power BI", "Jupyter Notebook"],
      icon: "🛠️"
    },
    {
      title: "Soft Skills",
      skills: ["Communication", "Time Management", "Leadership", "Critical Thinking", "Logical Thinking"],
      icon: "🎯"
    }
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className="skill-category"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h3 className="category-title">{category.title}</h3>
              </div>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex} 
                    className="skill-tag"
                    style={{ animationDelay: `${(index * 0.1) + (skillIndex * 0.05)}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
