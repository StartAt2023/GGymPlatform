import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import backgroundVideo from '../assets/videos/HomePageBackground.mp4'
import Navigation from './Navigation'

function HomePage() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const video = document.getElementById('background-video') as HTMLVideoElement
    if (video) {
      video.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true)
      })
    }
  }, [])

  const handleGetStarted = () => {
    navigate('/training-plans')
  }

  const handleLearnMore = () => {
    navigate('/about')
  }

  return (
    <div className="app">
      {/* Video Background */}
      <div className="video-background">
        <video
          id="background-video"
          autoPlay
          muted
          loop
          playsInline
          className="background-video"
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {!isVideoLoaded && (
          <div className="video-loading">
            <div className="loading-spinner"></div>
            <p>Loading...</p>
          </div>
        )}
      </div>

      {/* Content Overlay */}
      <div className="content-overlay">
        <Navigation />

        {/* Main Content */}
        <main className="main-content">
          <div className="hero-section">
            <h1 className="hero-title">
              Welcome to <span className="highlight">GGymPlatform</span>
            </h1>
            <p className="hero-subtitle">
              Professional fitness management platform providing you with the best workout experience
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={handleGetStarted}>
                Get Started
              </button>
              <button className="btn btn-secondary" onClick={handleLearnMore}>
                Learn More
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div className="features-section">
            <div className="feature-card">
              <div className="feature-icon">💪</div>
              <h3>Professional Training</h3>
              <p>Personalized training plans and professional guidance</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Progress Tracking</h3>
              <p>Real-time tracking of your fitness progress and results</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Community</h3>
              <p>Share experiences and achievements with other fitness enthusiasts</p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <p>&copy; 2024 GGymPlatform. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default HomePage 