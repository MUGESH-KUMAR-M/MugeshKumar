import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useSprings, animated } from '@react-spring/web';

// SplitText Component
const SplitText = ({
  text = '',
  className = '',
  delay = 100,
  animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
  animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
  easing = 'easeOutCubic',
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete,
}) => {
  const words = text.split(' ').map(word => word.split(''));
  const letters = words.flat();
  const [inView, setInView] = useState(false);
  const ref = useRef();
  const animatedCount = useRef(0);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);
  
  const springs = useSprings(
    letters.length,
    letters.map((_, i) => ({
      from: animationFrom,
      to: inView
        ? async (next) => {
          await next(animationTo);
          animatedCount.current += 1;
          if (animatedCount.current === letters.length && onLetterAnimationComplete) {
            onLetterAnimationComplete();
          }
        }
        : animationFrom,
      delay: i * delay,
      config: { easing },
    }))
  );
  
  return (
    <p
      ref={ref}
      className={className}
      style={{ 
        textAlign, 
        overflow: 'hidden', 
        display: 'inline', 
        whiteSpace: 'normal', 
        wordWrap: 'break-word' 
      }}
    >
      {words.map((word, wordIndex) => (
        <span 
          key={wordIndex} 
          style={{ 
            display: 'inline-block', 
            whiteSpace: 'nowrap' 
          }}
        >
          {word.map((letter, letterIndex) => {
            const index = words
              .slice(0, wordIndex)
              .reduce((acc, w) => acc + w.length, 0) + letterIndex;
            return (
              <animated.span
                key={index}
                style={{
                  ...springs[index],
                  display: 'inline-block',
                  willChange: 'transform, opacity',
                }}
              >
                {letter}
              </animated.span>
            );
          })}
          <span style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>
        </span>
      ))}
    </p>
  );
};

// TiltedCard Component
const TiltedCard = ({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
}) => {
  const ref = useRef(null);
  const x = useMotionValue();
  const y = useMotionValue();
  const rotateX = useSpring(useMotionValue(0), {
    damping: 30,
    stiffness: 100,
    mass: 2,
  });
  const rotateY = useSpring(useMotionValue(0), {
    damping: 30,
    stiffness: 100,
    mass: 2,
  });
  const scale = useSpring(1, {
    damping: 30,
    stiffness: 100,
    mass: 2,
  });
  const opacity = useSpring(0, {
    damping: 30,
    stiffness: 100,
    mass: 2,
  });
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });
  const [lastY, setLastY] = useState(0);

  function handleMouse(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;
    rotateX.set(rotationX);
    rotateY.set(rotationY);
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  const figureStyle = {
    position: 'relative',
    margin: '0',
    padding: '0',
    perspective: '1000px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    height: containerHeight,
    width: containerWidth,
  };

  const innerStyle = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transformStyle: 'preserve-3d',
    willChange: 'transform',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
    width: imageWidth,
    height: imageHeight,
  };

  const imgStyle = {
    position: 'relative',
    display: 'block',
    objectFit: 'cover',
    transformStyle: 'preserve-3d',
    backfaceVisibility: 'hidden',
    width: imageWidth,
    height: imageHeight,
  };

  const overlayStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '2',
  };

  const captionStyle = {
    position: 'absolute',
    padding: '8px 16px',
    background: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    borderRadius: '4px',
    fontSize: '14px',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    zIndex: '3',
  };

  const mobileAlertStyle = {
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '4px',
    fontSize: '12px',
    zIndex: '4',
    display: 'none',
    textAlign: 'center',
    width: '80%',
  };

  return (
    <figure
      ref={ref}
      style={figureStyle}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div style={mobileAlertStyle}>
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}
      <motion.div
        style={{
          ...innerStyle,
          rotateX,
          rotateY,
          scale,
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          style={imgStyle}
        />
        {displayOverlayContent && overlayContent && (
          <motion.div
            style={overlayStyle}
          >
            {overlayContent}
          </motion.div>
        )}
      </motion.div>
      {showTooltip && (
        <motion.figcaption
          style={{
            ...captionStyle,
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
};

// FallingText Component
const FallingText = ({ text }) => {
  const letters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };
  
  const child = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };
  
  return (
    <motion.div
      style={{
        fontSize: '1.5rem',
        color: '#64ffda',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '1.5rem',
      }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span 
          key={index} 
          variants={child} 
          style={{
            display: 'inline-block',
            margin: '0 2px',
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// TrueFocus Component
const TrueFocus = ({ children }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.3 }
    );
    
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      style={{
        margin: '1.5rem 0',
      }}
    >
      <motion.div
        initial={{ filter: 'blur(10px)', opacity: 0 }}
        animate={inView ? { filter: 'blur(0px)', opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Main Home Component
const Home = () => {
  const [animate, setAnimate] = useState(false);
  // Replace with your actual image path or URL
  const profileImage = "https://th.bing.com/th/id/OIP.CRJqLVAgLwQL-3KdP8Cz6AHaHa?w=200&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7";
  
  useEffect(() => {
    // Trigger animations after component mounts
    setAnimate(true);
  }, []);

  const handleAnimationComplete = () => {
    console.log('All text animations completed!');
  };
  
  // Styles for Home component
  const styles = {
    homeContainer: {
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#121212',
      color: '#ffffff',
      fontFamily: "'Poppins', sans-serif",
    },
    heroSection: {
      minHeight: '90vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 1rem',
      position: 'relative',
    },
    heroContent: {
      maxWidth: '1200px',
      width: '100%',
      textAlign: 'center',
    },
    nameContainer: {
      margin: '2rem 0',
    },
    nameTitle: {
      fontSize: '5rem', // Increased font size for bigger name
      fontWeight: '800', // Made font weight bolder
      margin: '1rem 0',
      background: 'linear-gradient(45deg, #64ffda, #00bcd4)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textFillColor: 'transparent',
      letterSpacing: '2px', // Added letter spacing for emphasis
      textShadow: '0 0 10px rgba(100, 255, 218, 0.3)', // Added subtle text shadow
    },
    bioText: {
      fontSize: '1.3rem', // Slightly increased font size
      lineHeight: '1.7',
      maxWidth: '750px', // Increased max width for expanded content
      margin: '0 auto',
      opacity: '0.9', // Increased opacity for better readability
      padding: '0 15px',
    },
    skillsSection: {
      padding: '6rem 1rem',
      backgroundColor: '#1a1a1a',
    },
    sectionTitle: {
      textAlign: 'center',
      marginBottom: '4rem',
    },
    sectionTitleText: {
      fontSize: '2.5rem',
      fontWeight: '600',
      color: '#ffffff',
    },
    skillsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    skillsDetails: {
      flex: '1',
      minWidth: '300px',
    },
    skillItem: {
      marginBottom: '2rem',
      padding: '1.5rem',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '8px',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    skillItemHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    },
    skillItemTitle: {
      fontSize: '1.5rem',
      marginBottom: '0.5rem',
      color: '#64ffda',
    },
    skillItemText: {
      fontSize: '1rem',
      color: 'rgba(255, 255, 255, 0.7)',
    },
    profileOverlay: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      textAlign: 'center',
      padding: '1rem',
    },
    profileOverlayTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
      color: '#ffffff',
    },
    profileOverlaySubtitle: {
      fontSize: '1.2rem',
      color: '#64ffda',
    },
    callToAction: {
      padding: '6rem 1rem',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #121212 0%, #1a1a1a 100%)',
    },
    ctaContent: {
      maxWidth: '800px',
      margin: '0 auto',
    },
    ctaTitle: {
      fontSize: '2.5rem',
      marginBottom: '1rem',
      color: '#ffffff',
    },
    ctaText: {
      fontSize: '1.2rem',
      marginBottom: '2rem',
      color: 'rgba(255, 255, 255, 0.8)',
    },
    ctaButtons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      flexWrap: 'wrap',
    },
    ctaButton: {
      padding: '0.8rem 1.5rem',
      fontSize: '1rem',
      borderRadius: '4px',
      cursor: 'pointer',
      textDecoration: 'none',
      fontWeight: '500',
      backgroundColor: 'transparent',
      border: '2px solid #64ffda',
      color: '#64ffda',
      transition: 'all 0.3s ease',
    },
    ctaButtonPrimary: {
      backgroundColor: '#64ffda',
      color: '#121212',
    },
    ctaButtonHover: {
      boxShadow: '0 5px 15px rgba(100, 255, 218, 0.3)',
    },
    // Media queries for responsive design can be handled with conditional styles based on window width
    // or by using CSS media queries in a separate stylesheet
  };

  // Function to handle responsive styling
  const getResponsiveStyles = () => {
    const width = window.innerWidth;
    if (width <= 768) {
      return {
        nameTitle: {
          ...styles.nameTitle,
          fontSize: '3.2rem', // Adjusted for mobile but still larger than original
        },
        bioText: {
          ...styles.bioText,
          fontSize: '1.1rem',
          padding: '0 10px',
        },
        skillsContainer: {
          ...styles.skillsContainer,
          flexDirection: 'column',
        },
      };
    }
    return {};
  };

  // Combine default styles with responsive styles
  const responsiveStyles = getResponsiveStyles();
  const mergedStyles = {
    ...styles,
    ...responsiveStyles,
  };

  return (
    <div style={styles.homeContainer}>
      
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <FallingText text="Welcome to my Portfolio" />
          
          <div style={styles.nameContainer}>
            <SplitText
              text="MUGESH KUMAR M"
              style={styles.nameTitle}
              delay={100}
              animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              easing="easeOutExpo"
              threshold={0.1}
              rootMargin="-20px"
              onLetterAnimationComplete={handleAnimationComplete}
            />
          </div>
          
          <TrueFocus>
            <p style={styles.bioText}>
              Full-stack developer passionate about creating interactive, responsive, 
              and user-friendly web applications with modern technologies. Experienced in 
              mobile app development using React Native and Expo for Android and iOS platforms. 
              Skilled in HTML, CSS, JavaScript, and cloud services, with growing expertise in 
              Python and AI projects.
            </p>
          </TrueFocus>
        </div>
      </section>
      
      <section style={styles.skillsSection}>
        <TrueFocus>
          <h2 style={styles.sectionTitle}>
            <SplitText
              text="My Expertise"
              style={styles.sectionTitleText}
              delay={50}
              animationFrom={{ opacity: 0, transform: 'translate3d(0,30px,0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            />
          </h2>
        </TrueFocus>
        
        <div style={styles.skillsContainer}>
          <TiltedCard
            imageSrc={profileImage}
            altText="Mugesh Kumar M"
            captionText="Full-Stack & Mobile Developer"
            containerHeight="350px"
            containerWidth="350px"
            imageHeight="350px"
            imageWidth="350px"
            rotateAmplitude={15}
            scaleOnHover={1.1}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <div style={styles.profileOverlay}>
                <h3 style={styles.profileOverlayTitle}>MUGESH KUMAR M</h3>
                <p style={styles.profileOverlaySubtitle}>Full-Stack & Mobile Developer</p>
              </div>
            }
          />
          
          <div style={styles.skillsDetails}>
            <TrueFocus>
              <div 
                style={styles.skillItem} 
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = styles.skillItemHover.transform;
                  e.currentTarget.style.boxShadow = styles.skillItemHover.boxShadow;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3 style={styles.skillItemTitle}>Frontend Development</h3>
                <p style={styles.skillItemText}>React.js, Vue.js, HTML5, CSS3, JavaScript</p>
              </div>
            </TrueFocus>
            
            <TrueFocus>
              <div 
                style={styles.skillItem}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = styles.skillItemHover.transform;
                  e.currentTarget.style.boxShadow = styles.skillItemHover.boxShadow;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3 style={styles.skillItemTitle}>Mobile Development</h3>
                <p style={styles.skillItemText}>React Native, Expo, iOS, Android, Cross-platform</p>
              </div>
            </TrueFocus>
            
            <TrueFocus>
              <div 
                style={styles.skillItem}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = styles.skillItemHover.transform;
                  e.currentTarget.style.boxShadow = styles.skillItemHover.boxShadow;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3 style={styles.skillItemTitle}>Backend & Cloud</h3>
                <p style={styles.skillItemText}>Node.js, Express, MongoDB, Firebase, AWS</p>
              </div>
            </TrueFocus>
            
            <TrueFocus>
              <div 
                style={styles.skillItem}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = styles.skillItemHover.transform;
                  e.currentTarget.style.boxShadow = styles.skillItemHover.boxShadow;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3 style={styles.skillItemTitle}>Emerging Tech</h3>
                <p style={styles.skillItemText}>Python, AI/ML projects, Data Visualization</p>
              </div>
            </TrueFocus>
          </div>
        </div>
      </section>
      
      <section style={styles.callToAction}>
        <TrueFocus>
          <div style={styles.ctaContent}>
            <h2 style={styles.ctaTitle}>Let's Work Together</h2>
            <p style={styles.ctaText}>Ready to build amazing web and mobile experiences? Check out my projects or get in touch!</p>
            <div style={styles.ctaButtons}>
              <motion.a 
                href="/projects" 
                style={styles.ctaButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See Projects
              </motion.a>
              <motion.a 
                href="/contact" 
                style={{...styles.ctaButton, ...styles.ctaButtonPrimary}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
            </div>
          </div>
        </TrueFocus>
      </section>
    </div>
  );
};

export default Home;