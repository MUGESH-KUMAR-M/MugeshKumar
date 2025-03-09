import React from 'react';
import PixelCard from './PixelCard';

const About = () => {
  // Main container styles
  const pageContainerStyle = {
    backgroundColor: '#111',
    minHeight: '100vh',
    padding: '3rem 1rem',
    color: '#fff',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  };

  // Section container styles
  const sectionContainerStyle = {
    maxWidth: '1200px',
    margin: '0 auto 4rem auto',
    padding: '4rem',
    marginTop:'30px',
    borderRadius: '16px',
    backgroundColor: 'rgba(24, 24, 27, 0.7)',
    backdropFilter: 'blur(10px)',
  };

  // Profile section styles
  const profileSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: '3rem',
  };

  const pixelCardWrapperStyle = {
    margin: '0 auto 2rem auto',
  };

  const profileContentStyle = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
    color: '#ffffff',
    textAlign: 'center',
    zIndex: 1,
  };

  const nameStyle = {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
  };

  const titleStyle = {
    fontSize: '1.125rem',
    marginBottom: '1rem',
    color: '#fda4af',
    fontWeight: '500',
  };

  const descriptionStyle = {
    fontSize: '0.875rem',
    lineHeight: '1.5',
    marginBottom: '1.5rem',
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

  // Skills section styles
  const skillsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
  };

  const skillCategoryStyle = {
    backgroundColor: 'rgba(24, 24, 27, 0.9)',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  };

  const skillCategoryTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#fda4af',
  };

  const skillsListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  };

  const skillBadgeStyle = {
    padding: '0.35rem 0.75rem',
    backgroundColor: 'rgba(231, 29, 54, 0.2)',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    border: '1px solid #fda4af',
  };

  // Projects section styles
  const projectsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
  };

  const projectCardStyle = {
    backgroundColor: 'rgba(24, 24, 27, 0.9)',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  };

  const projectCardHoverStyle = {
    ':hover': {
      transform: 'translateY(-5px)',
    }
  };

  const projectImageStyle = {
    width: '100%',
    height: '180px',
    backgroundColor: '#333',
    objectFit: 'cover',
  };

  const projectContentStyle = {
    padding: '1.5rem',
  };

  const projectTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  };

  const projectDescriptionStyle = {
    fontSize: '0.875rem',
    lineHeight: '1.5',
    marginBottom: '1rem',
    color: 'rgba(255, 255, 255, 0.8)',
  };

  const projectTechStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1rem',
  };

  const projectTechBadgeStyle = {
    padding: '0.25rem 0.5rem',
    backgroundColor: 'rgba(231, 29, 54, 0.1)',
    borderRadius: '4px',
    fontSize: '0.75rem',
    color: '#fda4af',
  };

  const projectLinkStyle = {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    backgroundColor: '#e11d48',
    color: 'white',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'background-color 0.2s',
  };

  // Data
  const frontendSkills = ['React', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'Responsive Design'];
  const backendSkills = ['Node.js', 'Express', 'RESTful APIs', 'MongoDB', 'MySQL', 'Firebase'];
  const mobileSkills = ['React Native', 'Expo', 'Android', 'iOS', 'Mobile UI/UX'];
  const otherSkills = ['Git', 'GitHub', 'AWS', 'Docker', 'Python', 'Figma', 'AI Integration'];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce application with product listings, cart functionality, user authentication, and payment processing.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: '/project1.jpg',
      link: '#'
    },
    {
      title: 'Health & Fitness App',
      description: 'A mobile application for tracking fitness goals, workout routines, and nutrition with personalized recommendations.',
      technologies: ['React Native', 'Expo', 'Firebase', 'Chart.js'],
      image: '/project2.jpg',
      link: '#'
    },
    {
      title: 'AI-Powered Task Manager',
      description: 'A productivity tool that uses AI to help prioritize tasks, suggest optimal work times, and improve workflow efficiency.',
      technologies: ['React', 'Python', 'TensorFlow', 'Express'],
      image: '/project3.jpg',
      link: '#'
    }
  ];

  // Create fake image src for the project placeholders
  const getPlaceholderSrc = (index) => `/api/placeholder/600/300?text=Project+${index + 1}`;

  return (
    <div style={pageContainerStyle}>
      {/* Container 1: Profile Section */}
      <div style={sectionContainerStyle}>
        <div style={profileSectionStyle}>
          <div style={pixelCardWrapperStyle}>
            <PixelCard variant="pink" className="profile-card">
              <div style={profileContentStyle}>
                <h1 style={nameStyle}>MUGESH KUMAR M</h1>
                <h2 style={titleStyle}>Full-stack Developer</h2>
                <p style={descriptionStyle}>
                  Passionate about creating interactive, responsive, and user-friendly web applications 
                  with modern technologies. Experienced in mobile app development using React Native 
                  and Expo for Android and iOS platforms.
                </p>
              </div>
            </PixelCard>
          </div>
          
          <div>
            <p style={{maxWidth: '800px', margin: '0 auto', lineHeight: '1.8', fontSize: '1.1rem'}}>
              I specialize in building elegant, high-performance web and mobile applications 
              that solve real-world problems. With a strong foundation in full-stack development 
              and a growing expertise in AI integration, I'm committed to creating digital experiences 
              that are both beautiful and functional.
            </p>
          </div>
        </div>
      </div>

      {/* Container 2: Skills Section */}
      <div style={sectionContainerStyle}>
        <h2 style={sectionTitleStyle}>
          My Skills
          <div style={sectionTitleAfterStyle}></div>
        </h2>
        <div style={skillsGridStyle}>
          <div style={skillCategoryStyle}>
            <h3 style={skillCategoryTitleStyle}>Frontend Development</h3>
            <div style={skillsListStyle}>
              {frontendSkills.map((skill, index) => (
                <span key={index} style={skillBadgeStyle}>{skill}</span>
              ))}
            </div>
          </div>
          
          <div style={skillCategoryStyle}>
            <h3 style={skillCategoryTitleStyle}>Backend Development</h3>
            <div style={skillsListStyle}>
              {backendSkills.map((skill, index) => (
                <span key={index} style={skillBadgeStyle}>{skill}</span>
              ))}
            </div>
          </div>
          
          <div style={skillCategoryStyle}>
            <h3 style={skillCategoryTitleStyle}>Mobile Development</h3>
            <div style={skillsListStyle}>
              {mobileSkills.map((skill, index) => (
                <span key={index} style={skillBadgeStyle}>{skill}</span>
              ))}
            </div>
          </div>
          
          <div style={skillCategoryStyle}>
            <h3 style={skillCategoryTitleStyle}>Other Technologies</h3>
            <div style={skillsListStyle}>
              {otherSkills.map((skill, index) => (
                <span key={index} style={skillBadgeStyle}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Container 3: Projects Section */}
      <div style={sectionContainerStyle}>
        <h2 style={sectionTitleStyle}>
          Featured Projects
          <div style={sectionTitleAfterStyle}></div>
        </h2>
        <div style={projectsGridStyle}>
          {projects.map((project, index) => (
            <div key={index} style={{...projectCardStyle, ...projectCardHoverStyle}}>
              <img 
                src={getPlaceholderSrc(index)} 
                alt={project.title} 
                style={projectImageStyle} 
              />
              <div style={projectContentStyle}>
                <h3 style={projectTitleStyle}>{project.title}</h3>
                <p style={projectDescriptionStyle}>{project.description}</p>
                <div style={projectTechStyle}>
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} style={projectTechBadgeStyle}>{tech}</span>
                  ))}
                </div>
                <a href={project.link} style={projectLinkStyle}>View Project</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;