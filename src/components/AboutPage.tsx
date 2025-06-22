import { useState, useEffect } from 'react'
import planningVideo from '../assets/videos/BackgroundForPlanning.mp4'
import Navigation from './Navigation'

function AboutPage() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    const video = document.getElementById('about-background-video') as HTMLVideoElement
    if (video) {
      video.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true)
      })
    }
  }, [])

  return (
    <div className="page-container planning-page">
      {/* Video Background for About Page */}
      <div className="video-background">
        <video
          id="about-background-video"
          autoPlay
          muted
          loop
          playsInline
          className="background-video"
        >
          <source src={planningVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {!isVideoLoaded && (
          <div className="video-loading">
            <div className="loading-spinner"></div>
            <p>Loading...</p>
          </div>
        )}
      </div>

      <Navigation />

      <main className="page-main">
        <div className="about-hero">
          <h1>About GGymPlatform</h1>
          <p>Empowering your fitness journey with cutting-edge technology and expert guidance</p>
        </div>

        <div className="about-content">
          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              At GGymPlatform, we believe that everyone deserves access to professional fitness guidance. 
              Our mission is to democratize fitness by providing personalized training programs, 
              expert coaching, and comprehensive progress tracking through an intuitive digital platform.
            </p>
          </section>

          <section className="about-section">
            <h2>Our Vision</h2>
            <p>
              We envision a world where achieving fitness goals is accessible, enjoyable, and sustainable. 
              Through innovative technology and evidence-based training methodologies, we're building 
              the future of fitness where every individual can unlock their full potential.
            </p>
          </section>

          <section className="about-section">
            <h2>What We Offer</h2>
            <div className="offerings-grid">
              <div className="offering-card">
                <h3>Personalized Training</h3>
                <p>AI-powered workout plans tailored to your goals, fitness level, and schedule</p>
              </div>
              <div className="offering-card">
                <h3>Expert Guidance</h3>
                <p>Access to certified fitness professionals and nutritionists</p>
              </div>
              <div className="offering-card">
                <h3>Progress Tracking</h3>
                <p>Comprehensive analytics and progress monitoring tools</p>
              </div>
              <div className="offering-card">
                <h3>Community Support</h3>
                <p>Connect with like-minded fitness enthusiasts and share your journey</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Our Team</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-avatar">👨‍💼</div>
                <h3>John Smith</h3>
                <p>CEO & Founder</p>
                <p>Former professional athlete with 15+ years in fitness industry</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">👩‍💻</div>
                <h3>Sarah Johnson</h3>
                <p>Head of Technology</p>
                <p>Expert in fitness technology and user experience design</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">👨‍⚕️</div>
                <h3>Dr. Mike Chen</h3>
                <p>Chief Fitness Officer</p>
                <p>Certified personal trainer and sports medicine specialist</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 GGymPlatform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default AboutPage 