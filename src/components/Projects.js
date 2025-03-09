import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);

  // Project data
  const projects = [
    {
      id: 'drai',
      title: 'DR.AI',
      type: 'Hackathon Project',
      description: 'An AI-powered healthcare assistant that uses machine learning to assist with diagnosis and patient care. Built during a hackathon, this project integrates advanced AI algorithms to analyze medical data.',
      tech: ['Python', 'TensorFlow', 'Flask', 'React', 'AWS'],
      image: '/images/drai-project.jpg',
      link: 'https://github.com/yourusername/drai-project'
    },
    {
      id: 'jarvis',
      title: 'Jarvis AI',
      type: 'Personal Assistant',
      description: 'A voice-activated AI assistant inspired by Iron Man\'s JARVIS. This Python-based system can perform various tasks through voice commands, including web searches, controlling smart home devices, and scheduling.',
      tech: ['Python', 'Speech Recognition', 'NLP', 'IoT Integration'],
      image: '/images/jarvis-project.jpg',
      link: 'https://github.com/yourusername/jarvis-ai'
    },
    {
      id: 'clgapp',
      title: 'College Companion',
      type: 'Mobile App',
      description: 'A comprehensive mobile application for college students built with React Native and Expo. Features include class schedules, campus maps, event notifications, and integration with college services.',
      tech: ['React Native', 'Expo', 'Firebase', 'Node.js'],
      image: '/images/college-app.jpg',
      link: 'https://github.com/yourusername/college-companion'
    },
    {
      id: 'facedetect',
      title: 'Emotion Detection System',
      type: 'Computer Vision Project',
      description: 'A facial recognition system that can detect and analyze emotions in real-time. Uses Python and OpenCV for face detection and a custom-trained model to recognize seven basic emotional states.',
      tech: ['Python', 'OpenCV', 'TensorFlow', 'Keras', 'Deep Learning'],
      image: '/images/emotion-detection.jpg',
      link: 'https://github.com/yourusername/emotion-detection'
    }
  ];

  // Variants for framer-motion animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3
      }
    }
  };

  const projectVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  const CircularGallery = () => {
    const radius = 250;
    const itemCount = projects.length;
    
    return (
      <div className="circular-gallery" style={{
        position: 'relative',
        width: radius * 2,
        height: radius * 2,
        margin: '80px auto',
      }}>
        {projects.map((project, index) => {
          // Calculate position on circle
          const angle = (index / itemCount) * 2 * Math.PI;
          const x = radius * Math.cos(angle) + radius - 75; // -75 to adjust for item size
          const y = radius * Math.sin(angle) + radius - 75;
          
          return (
            <motion.div
              key={project.id}
              initial={{ x, y, opacity: 0 }}
              animate={{ 
                x, 
                y, 
                opacity: 1,
                scale: activeProject === project.id ? 1.2 : 1
              }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setActiveProject(project.id === activeProject ? null : project.id)}
              style={{
                position: 'absolute',
                width: 150,
                height: 150,
                borderRadius: '50%',
                background: `url(${project.image}) center center/cover`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                cursor: 'pointer',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                border: activeProject === project.id ? '4px solid #64ffda' : '2px solid #ffffff'
              }}
            >
              <div className="project-hover-info" style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '10px',
                background: 'rgba(18, 18, 18, 0.85)',
                color: '#ffffff',
                textAlign: 'center',
                borderBottomLeftRadius: '75px',
                borderBottomRightRadius: '75px',
                opacity: activeProject === project.id ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }}>
                <h4 style={{ margin: 0, fontSize: '14px', color: '#64ffda' }}>{project.title}</h4>
              </div>
            </motion.div>
          );
        })}
        
        {activeProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="project-details"
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth: '800px',
              padding: '30px',
              background: 'rgba(18, 18, 18, 0.95)',
              borderRadius: '15px',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
              zIndex: 10,
              marginTop: '30px',
              color: '#ffffff'
            }}
          >
            {(() => {
              const project = projects.find(p => p.id === activeProject);
              return (
                <>
                  <h2 style={{ color: '#64ffda', marginTop: 0 }}>{project.title}</h2>
                  <h4 style={{ color: '#ccd6f6', marginTop: '-10px' }}>{project.type}</h4>
                  <p>{project.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
                    {project.tech.map((tech, index) => (
                      <span key={index} style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        backgroundColor: 'rgba(100, 255, 218, 0.1)',
                        color: '#64ffda',
                        fontSize: '14px'
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div style={{ marginTop: '25px' }}>
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        padding: '10px 25px',
                        borderRadius: '5px',
                        backgroundColor: 'transparent',
                        color: '#64ffda',
                        border: '1px solid #64ffda',
                        textDecoration: 'none',
                        fontSize: '16px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = 'rgba(100, 255, 218, 0.1)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                      }}
                    >
                      View Project
                    </a>
                  </div>
                </>
              );
            })()}
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      paddingTop: '100px',
      paddingBottom: '100px',
      backgroundColor: '#111'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h1 style={{ 
            fontSize: '3rem', 
            color: '#ccd6f6', 
            marginBottom: '20px',
            position: 'relative',
            display: 'inline-block',
          }}>
          </h1>
          <p style={{ 
            color: '#8892b0', 
            fontSize: '1.2rem', 
            maxWidth: '600px', 
            margin: '0 auto' 
          }}>
            A showcase of my recent work, including hackathons, AI projects, and mobile applications.
          </p>
        </motion.div>

        {/* Circular Gallery */}
        <CircularGallery />

        {/* Traditional Project Grid - Alternative Display */}
        <h3 style={{ textAlign: 'center', color: '#ccd6f6', marginTop: '90px', marginBottom: '40px' }}>
          All Projects
        </h3>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginTop: '30px'
          }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={projectVariants}
              whileHover="hover"
              style={{
                backgroundColor: '#112240',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{
                height: '200px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <img 
                  src={project.image} 
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'scale(1.1)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                />
              </div>
              <div style={{
                padding: '25px',
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column'
              }}>
                <h3 style={{ 
                  color: '#e6f1ff', 
                  marginTop: 0, 
                  marginBottom: '5px',
                  fontSize: '1.5rem'
                }}>
                  {project.title}
                </h3>
                <p style={{ 
                  color: '#64ffda', 
                  margin: '0 0 15px 0',
                  fontSize: '0.9rem',
                  fontFamily: 'monospace' 
                }}>
                  {project.type}
                </p>
                <p style={{ 
                  color: '#a8b2d1', 
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  flexGrow: 1
                }}>
                  {project.description.substring(0, 120)}...
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '20px'
                }}>
                  {project.tech.slice(0, 3).map((tech, index) => (
                    <span key={index} style={{
                      fontSize: '0.8rem',
                      color: '#a8b2d1',
                      fontFamily: 'monospace'
                    }}>
                      {tech}{index < Math.min(project.tech.length, 3) - 1 ? ' • ' : ''}
                    </span>
                  ))}
                </div>
                <div>
                  <a 
                    href={project.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#64ffda',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      fontSize: '0.9rem',
                      fontWeight: 500
                    }}
                  >
                    View Details
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginLeft: '5px' }}>
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#64ffda" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;