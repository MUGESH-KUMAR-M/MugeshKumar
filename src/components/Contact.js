import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  // Main container styles
  const pageContainerStyle = {
    backgroundColor: '#111',
    minHeight: '100vh',
    padding: '3rem 1rem',
    color: '#fff',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  };

  // Logo section styles
  const logoContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2rem',
  };

  const logoStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    position: 'relative',
    padding: '0.5rem 1rem',
    border: '2px solid #e11d48',
    borderRadius: '4px',
    textDecoration: 'none',
  };

  // Section container styles
  const sectionContainerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '4rem',
    marginTop: '20px',
    borderRadius: '16px',
    backgroundColor: 'rgba(24, 24, 27, 0.7)',
    backdropFilter: 'blur(10px)',
  };

  // Section title styles
  const sectionTitleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    textAlign: 'center',
    position: 'relative',
    paddingBottom: '0.5rem',
  };

  const sectionTitleAfterStyle = {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '3px',
    backgroundColor: '#e11d48',
    borderRadius: '2px',
  };

  // Contact section styles
  const contactFlexStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
  };

  const contactInfoStyle = {
    flex: '1 1 300px',
  };

  const contactItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
  };

  const contactIconStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    backgroundColor: 'rgba(231, 29, 54, 0.3)',
    color: 'white',
    fontSize: '1rem',
  };

  const contactFormStyle = {
    flex: '1 1 400px',
  };

  const formGroupStyle = {
    marginBottom: '1.5rem',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
    color: 'rgba(255, 255, 255, 0.8)',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: 'rgba(24, 24, 27, 0.9)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    color: 'white',
    fontSize: '1rem',
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '150px',
    resize: 'vertical',
  };

  const footerStyle = {
    marginTop: '2rem',
    textAlign: 'center',
    padding: '1.5rem 0',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.875rem',
  };

  const submitButtonStyle = {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#e11d48',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  const socialIconStyle = {
    ...contactIconStyle,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  // Form handling functions
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted');
  };

  return (
    <div style={pageContainerStyle}>
      {/* Logo Section */}
      <div style={logoContainerStyle}>
        <a href="/" style={logoStyle}>
          <span style={{color: '#e11d48'}}>M</span>UGESH
        </a>
      </div>
      <div style={sectionContainerStyle}>
        <h2 style={sectionTitleStyle}>
          Get In Touch
          <div style={sectionTitleAfterStyle}></div>
        </h2>
        <div style={contactFlexStyle}>
          <div style={contactInfoStyle}>
            <div style={contactItemStyle}>
              <div style={contactIconStyle}>
                <FaEnvelope />
              </div>
              <div>
                <h3 style={{marginBottom: '0.25rem', fontSize: '1rem'}}>Email</h3>
                <p style={{color: '#fda4af'}}>mugeshkumar@example.com</p>
              </div>
            </div>
            
            <div style={contactItemStyle}>
              <div style={contactIconStyle}>
                <FaMapMarkerAlt />
              </div>
              <div>
                <h3 style={{marginBottom: '0.25rem', fontSize: '1rem'}}>Location</h3>
                <p style={{color: 'rgba(255, 255, 255, 0.8)'}}>Tamil Nadu, India</p>
              </div>
            </div>
            
            <div style={contactItemStyle}>
              <div style={contactIconStyle}>
                <FaPhone />
              </div>
              <div>
                <h3 style={{marginBottom: '0.25rem', fontSize: '1rem'}}>Phone</h3>
                <p style={{color: '#fda4af'}}>+91 98765 43210</p>
              </div>
            </div>
            
            <div style={{marginTop: '2rem'}}>
              <h3 style={{marginBottom: '1rem', fontSize: '1.25rem'}}>Follow Me</h3>
              <div style={{display: 'flex', gap: '1rem'}}>
                <a href="https://github.com/mugeshkumar" style={socialIconStyle} aria-label="GitHub">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com/in/mugeshkumar" style={socialIconStyle} aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
                <a href="https://twitter.com/mugeshkumar" style={socialIconStyle} aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="https://instagram.com/mugeshkumar" style={socialIconStyle} aria-label="Instagram">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
          
          <div style={contactFormStyle}>
            <form onSubmit={handleSubmit}>
              <div style={formGroupStyle}>
                <label htmlFor="name" style={labelStyle}>Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  style={inputStyle} 
                  placeholder="Enter your name" 
                  required 
                />
              </div>
              
              <div style={formGroupStyle}>
                <label htmlFor="email" style={labelStyle}>Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  style={inputStyle} 
                  placeholder="Enter your email" 
                  required 
                />
              </div>
              
              <div style={formGroupStyle}>
                <label htmlFor="subject" style={labelStyle}>Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  style={inputStyle} 
                  placeholder="Enter subject" 
                />
              </div>
              
              <div style={formGroupStyle}>
                <label htmlFor="message" style={labelStyle}>Message</label>
                <textarea 
                  id="message" 
                  style={textareaStyle} 
                  placeholder="Type your message here..." 
                  required
                ></textarea>
              </div>
              
              <button type="submit" style={submitButtonStyle}>Send Message</button>
            </form>
          </div>
        </div>
        <footer style={footerStyle}>
          &copy; 2025 MUGESHKUMAR M. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
};

export default Contact;