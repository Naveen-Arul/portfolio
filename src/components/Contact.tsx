
import { useState } from 'react';

interface ContactProps {
  darkMode: boolean;
}

const Contact = ({ darkMode }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/manjdgap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
    
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-section">
              <h3>📫 Contact</h3>
              <div className="contact-details">
                <div className="contact-item">
                  <strong>Email:</strong>
                  <a href="mailto:naveenarul111@gmail.com">naveenarul111@gmail.com</a>
                </div>
                <div className="contact-item">
                  <strong>Phone:</strong>
                  <a href="tel:+919360500228">+91 9360500228</a>
                </div>
                <div className="contact-item">
                  <strong>Location:</strong>
                  <span>Samalpatti, Krishnagiri</span>
                </div>
                <div className="contact-item">
                  <strong>LinkedIn:</strong>
                  <a 
                    href="https://linkedin.com/in/naveen-a-b4855a291" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    linkedin.com/in/naveen-a-b4855a291
                  </a>
                </div>
              </div>
            </div>
            
            <div className="coding-platforms">
              <h3>💻 Coding & Developer Platforms</h3>
              <div className="platform-links">
                <a 
                  href="https://github.com/Naveen-Arul" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="platform-link github"
                >
                  <span className="platform-icon">⚡</span>
                  GitHub
                </a>
                <a 
                  href="https://leetcode.com/u/NaveenA_kec" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="platform-link leetcode"
                >
                  <span className="platform-icon">🚀</span>
                  LeetCode
                </a>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              
              {submitStatus === 'success' && (
                <p className="status-message success">Message sent successfully!</p>
              )}
              
              {submitStatus === 'error' && (
                <p className="status-message error">Failed to send message. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
