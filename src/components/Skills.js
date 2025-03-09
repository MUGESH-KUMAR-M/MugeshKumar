import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useAnimation, useTransform } from "framer-motion";
import "./RollingGallery.css";

// Skill data structure with icons, levels, and colors
const skillsData = {
  frontend: [
    { name: 'React', level: 90, icon: 'https://cdn.simpleicons.org/react/61DAFB', color: '#61DAFB' },
    { name: 'JavaScript', level: 85, icon: 'https://cdn.simpleicons.org/javascript/F7DF1E', color: '#F7DF1E' },
    { name: 'HTML5', level: 90, icon: 'https://cdn.simpleicons.org/html5/E34F26', color: '#E34F26' },
    { name: 'CSS3', level: 85, icon: 'https://cdn.simpleicons.org/css3/1572B6', color: '#1572B6' },
    { name: 'TypeScript', level: 80, icon: 'https://cdn.simpleicons.org/typescript/3178C6', color: '#3178C6' },
    { name: 'Redux', level: 75, icon: 'https://cdn.simpleicons.org/redux/764ABC', color: '#764ABC' },
    { name: 'Tailwind CSS', level: 85, icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4', color: '#06B6D4' },
  ],
  backend: [
    { name: 'Node.js', level: 85, icon: 'https://cdn.simpleicons.org/nodedotjs/339933', color: '#339933' },
    { name: 'Express', level: 80, icon: 'https://cdn.simpleicons.org/express/000000', color: '#000000' },
    { name: 'MongoDB', level: 75, icon: 'https://cdn.simpleicons.org/mongodb/47A248', color: '#47A248' },
    { name: 'MySQL', level: 70, icon: 'https://cdn.simpleicons.org/mysql/4479A1', color: '#4479A1' },
    { name: 'Python', level: 65, icon: 'https://cdn.simpleicons.org/python/3776AB', color: '#3776AB' },
    { name: 'Firebase', level: 80, icon: 'https://cdn.simpleicons.org/firebase/FFCA28', color: '#FFCA28' },
  ],
  mobile: [
    { name: 'React Native', level: 85, icon: 'https://cdn.simpleicons.org/react/61DAFB', color: '#61DAFB' },
    { name: 'Expo', level: 80, icon: 'https://cdn.simpleicons.org/expo/000020', color: '#000020' },
    { name: 'Swift', level: 60, icon: 'https://cdn.simpleicons.org/swift/FA7343', color: '#FA7343' },
    { name: 'Kotlin', level: 55, icon: 'https://cdn.simpleicons.org/kotlin/7F52FF', color: '#7F52FF' },
  ],
  ai: [
    { name: 'TensorFlow', level: 60, icon: 'https://cdn.simpleicons.org/tensorflow/FF6F00', color: '#FF6F00' },
    { name: 'PyTorch', level: 55, icon: 'https://cdn.simpleicons.org/pytorch/EE4C2C', color: '#EE4C2C' },
    { name: 'OpenCV', level: 70, icon: 'https://cdn.simpleicons.org/opencv/5C3EE8', color: '#5C3EE8' },
    { name: 'NLP', level: 65, icon: 'https://cdn.simpleicons.org/openai/412991', color: '#412991' },
  ],
  devops: [
    { name: 'Git', level: 85, icon: 'https://cdn.simpleicons.org/git/F05032', color: '#F05032' },
    { name: 'AWS', level: 70, icon: 'https://cdn.simpleicons.org/amazonaws/FF9900', color: '#FF9900' },
    { name: 'Docker', level: 65, icon: 'https://cdn.simpleicons.org/docker/2496ED', color: '#2496ED' },
    { name: 'CI/CD', level: 75, icon: 'https://cdn.simpleicons.org/githubactions/2088FF', color: '#2088FF' },
  ],
  design: [
    { name: 'Figma', level: 80, icon: 'https://cdn.simpleicons.org/figma/F24E1E', color: '#F24E1E' },
  ]
};

// 2D RollingGallery Component with enhanced smoothness
const RollingGallery2D = ({ autoplay = true, pauseOnHover = true, category = 'frontend' }) => {
  const skills = skillsData[category];
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(window.innerWidth <= 640);

  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceCount = skills.length;
  const faceWidth = (cylinderWidth / faceCount) * 1.5; // Increased width for items
  const dragFactor = 0.05;
  const radius = cylinderWidth / (2 * Math.PI);

  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const autoplayRef = useRef();
  const [isHovering, setIsHovering] = useState(false);

  const handleDrag = (_, info) => {
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    controls.start({
      rotateY: rotation.get() + info.velocity.x * dragFactor,
      transition: { 
        type: "spring", 
        stiffness: 60, 
        damping: 20, 
        mass: 0.1, 
        ease: "easeOut" 
      },
    });
  };

  const transform = useTransform(rotation, (value) => {
    return `rotate3d(0, 1, 0, ${value}deg)`;
  });

  // Improved autoplay with smoother animation
  useEffect(() => {
    if (autoplay && !isHovering) {
      // Initial animation
      controls.start({
        rotateY: rotation.get() - 360,
        transition: { 
          duration: 60, 
          ease: "linear", 
          repeat: Infinity,
          repeatType: "loop"
        },
      });
      
      // Update rotation value continuously for proper interaction during autoplay
      const intervalId = setInterval(() => {
        rotation.set(rotation.get() - 1);
      }, 150);
      
      return () => {
        controls.stop();
        clearInterval(intervalId);
      };
    }
  }, [autoplay, rotation, controls, isHovering]);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSizeSm(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Enhanced hover handling for smoother transitions
  const handleMouseEnter = () => {
    setIsHovering(true);
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (autoplay && pauseOnHover) {
      controls.start({
        rotateY: rotation.get() - 360,
        transition: { 
          duration: 60, 
          ease: "linear", 
          repeat: Infinity,
          repeatType: "loop"
        },
      });
    }
  };

  return (
    <div className="gallery-container">
      <div className="gallery-gradient gallery-gradient-left"></div>
      <div className="gallery-gradient gallery-gradient-right"></div>
      <div className="gallery-content">
        <motion.div
          drag="x"
          className="gallery-track"
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        >
          {skills.map((skill, i) => (
            <div
              key={i}
              className="gallery-item"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
              }}
            >
              <div className="skill-card">
                <img 
                  src={skill.icon} 
                  alt={skill.name} 
                  className="gallery-img" 
                  style={{ borderColor: skill.color }}
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/75x75/0a192f/${skill.color.replace('#', '')}?text=${skill.name.charAt(0)}`;
                  }}
                />
                <div className="skill-info">
                  <h3>{skill.name}</h3>
                  <div className="skill-bar">
                    <div className="skill-level" style={{ width: `${skill.level}%`, backgroundColor: skill.color }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Lanyard Badge Component for Skills
const SkillBadge = ({ skill, index, totalSkills }) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05, y: -5 }}
      style={{
        backgroundColor: '#112240',
        borderRadius: '12px',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '120px',
        height: '150px',
        margin: '10px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.3s ease',
      }}
    >
      <div 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '4px', 
          background: `linear-gradient(90deg, #64ffda ${skill.level}%, #0a192f ${skill.level}%)` 
        }}
      />
      
      <div 
        style={{ 
          width: '60px', 
          height: '60px', 
          borderRadius: '50%', 
          backgroundColor: 'rgba(100, 255, 218, 0.1)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginBottom: '15px'
        }}
      >
        <img 
          src={skill.icon} 
          alt={skill.name} 
          style={{ width: '35px', height: '35px', objectFit: 'contain' }}
          // Fallback if image fails to load - show first letter of skill name
          onError={(e) => {
            const parent = e.target.parentNode;
            parent.innerHTML = `<div style="color: ${skill.color}; font-size: 1.5rem; font-weight: bold;">${skill.name.charAt(0)}</div>`;
          }}
        />
      </div>
      
      <h3 style={{ 
        margin: '0 0 5px 0', 
        fontSize: '0.9rem', 
        fontWeight: 600, 
        color: '#e6f1ff',
        textAlign: 'center'
      }}>
        {skill.name}
      </h3>
      
      <div style={{ 
        fontSize: '0.8rem', 
        color: '#64ffda',
        fontFamily: 'monospace'
      }}>
        {skill.level}%
      </div>
      
      {/* Lanyard-style string */}
      <svg 
        width="120" 
        height="20" 
        style={{ 
          position: 'absolute', 
          top: '-20px', 
          left: 0,
          opacity: 0.6
        }}
      >
        <path 
          d={`M${60 - index * 2} 0 Q${60} 40 ${60} 20`} 
          stroke="#64ffda" 
          strokeWidth="1" 
          fill="none" 
        />
      </svg>
    </motion.div>
  );
};

// Main Skills component
const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  
  // Timeline data
  const timelineData = [
    {
      period: "2023 - 2024",
      description: "Started with HTML, CSS, JavaScript fundamentals and basic server-side programming with Node.js."
    },
    {
      period: "2025 - 2023",
      description: "Focused on modern JavaScript frameworks, React.js and state management solutions. Introduced to TypeScript and GraphQL."
    },
    {
      period: "2024 - 2024",
      description: "Mastered React Native and mobile app development. Advanced Node.js backend architecture and cloud infrastructure."
    }
  ];
  
  return (
    <div style={{
      minHeight: '100vh',
      paddingTop: '100px',
      paddingBottom: '100px',
      backgroundColor: '#111',
      color: '#e6f1ff',
      backgroundImage: 'radial-gradient(circle at 25% 10%, rgba(100, 255, 218, 0.03) 0%, transparent 30%), radial-gradient(circle at 80% 80%, rgba(100, 255, 218, 0.03) 0%, transparent 30%)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
      }}>
        {/* Header Section */}
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
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Full-stack developer passionate about creating interactive, responsive, and user-friendly web applications with modern technologies. Experienced in mobile app development using React Native and Expo for Android and iOS platforms.
          </p>
        </motion.div>

        {/* Rolling Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '2rem',
            color: '#ccd6f6',
            marginBottom: '30px'
          }}>
            Tech Stack Overview
          </h2>
          
          <RollingGallery2D category={activeCategory} />
        </motion.div>

        {/* Skill Categories Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '40px',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          {Object.keys(skillsData).map(category => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: activeCategory === category ? 'rgba(100, 255, 218, 0.1)' : 'transparent',
                border: '1px solid #64ffda',
                color: activeCategory === category ? '#64ffda' : '#8892b0',
                padding: '8px 20px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500',
                textTransform: 'capitalize'
              }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Lanyard Skill Badges */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '15px',
            padding: '20px 0'
          }}
        >
          {skillsData[activeCategory].map((skill, index) => (
            <SkillBadge 
              key={skill.name} 
              skill={skill} 
              index={index} 
              totalSkills={skillsData[activeCategory].length} 
            />
          ))}
        </motion.div>

        {/* Timeline Section */}
        <div style={{
          maxWidth: '800px',
          margin: '100px auto 0',
          position: 'relative',
        }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '2rem',
            color: '#ccd6f6',
            marginBottom: '50px'
          }}>
            Learning Journey
          </h2>
          
          {/* Vertical Line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '120px',
            bottom: '50px',
            width: '2px',
            backgroundColor: 'rgba(100, 255, 218, 0.3)',
            transform: 'translateX(-50%)',
          }}></div>
          
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              style={{
                display: 'flex',
                justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
                marginBottom: '60px',
                position: 'relative',
              }}
            >
              <div style={{
                width: '45%',
                padding: '25px',
                backgroundColor: '#112240',
                borderRadius: '10px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(100, 255, 218, 0.1)',
                position: 'relative',
              }}>
                <h3 style={{ 
                  color: '#64ffda', 
                  marginTop: 0, 
                  marginBottom: '10px', 
                  fontSize: '1.2rem',
                  fontFamily: 'monospace'
                }}>
                  {item.period}
                </h3>
                <p style={{ 
                  color: '#8892b0', 
                  margin: 0, 
                  lineHeight: '1.6' 
                }}>
                  {item.description}
                </p>
                
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute',
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#64ffda',
                  borderRadius: '50%',
                  border: '4px solid #0a192f',
                  top: '30px',
                  [index % 2 === 0 ? 'right' : 'left']: index % 2 === 0 ? '-60px' : '-60px',
                  zIndex: 2,
                }}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Experience Level Indicator */}
        <div style={{
          maxWidth: '800px',
          margin: '80px auto 0',
          padding: '30px',
          backgroundColor: '#112240',
          borderRadius: '10px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '5px',
            height: '100%',
            backgroundColor: '#64ffda'
          }}></div>
          
          <h3 style={{ 
            color: '#e6f1ff',
            marginTop: 0,
            fontSize: '1.5rem'
          }}>
            Experience Levels
          </h3>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px',
            flexWrap: 'wrap'
          }}>
            <div style={{ width: '45%', minWidth: '300px', marginBottom: '20px' }}>
              <h4 style={{ color: '#64ffda', marginBottom: '10px' }}>Proficient (80-100%)</h4>
              <p style={{ color: '#8892b0', lineHeight: '1.6' }}>
                Technologies I use daily with deep understanding and can implement complex solutions with.
              </p>
            </div>
            
            <div style={{ width: '45%', minWidth: '300px', marginBottom: '20px' }}>
              <h4 style={{ color: '#64ffda', marginBottom: '10px' }}>Advanced (65-80%)</h4>
              <p style={{ color: '#8892b0', lineHeight: '1.6' }}>
                Strong working knowledge with practical experience in professional environments.
              </p>
            </div>
            
            <div style={{ width: '45%', minWidth: '300px', marginBottom: '20px' }}>
              <h4 style={{ color: '#64ffda', marginBottom: '10px' }}>Intermediate (50-65%)</h4>
              <p style={{ color: '#8892b0', lineHeight: '1.6' }}>
                Good understanding with some practical experience, actively expanding knowledge.
              </p>
            </div>
            
            <div style={{ width: '45%', minWidth: '300px', marginBottom: '20px' }}>
              <h4 style={{ color: '#64ffda', marginBottom: '10px' }}>Learning (~50%)</h4>
              <p style={{ color: '#8892b0', lineHeight: '1.6' }}>
                Currently developing skills through personal projects and structured learning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;