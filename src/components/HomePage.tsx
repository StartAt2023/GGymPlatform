import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase'
import { collection, query, where, getDocs, limit } from 'firebase/firestore'
import backgroundVideo from '../assets/videos/HomePageBackground.mp4'
import Navigation from './Navigation'

function HomePage() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [todayWorkout, setTodayWorkout] = useState<any>(null)
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  useEffect(() => {
    const video = document.getElementById('background-video') as HTMLVideoElement
    if (video) {
      video.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true)
      })
    }
  }, [])

  // Fetch today's completed workout from Firestore
  useEffect(() => {
    const fetchTodayWorkout = async () => {
      if (!currentUser) {
        setTodayWorkout(null)
        return
      }

      const today = new Date().toDateString()
      const completedWorkoutsRef = collection(db, 'users', currentUser.uid, 'completedWorkouts')
      const q = query(completedWorkoutsRef, where("completedAt", "==", today), limit(1))
      
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data()
        setTodayWorkout({
          planName: docData.planName,
          icon: docData.icon,
          day: docData.day
        })
      } else {
        setTodayWorkout(null)
      }
    }

    fetchTodayWorkout()
  }, [currentUser])

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

          {/* Today's Completed Workout */}
          {todayWorkout && (
            <div className="today-completed-section">
              <div className="today-completed-card">
                <div className="completed-icon">🎉</div>
                <h3>Today's Achievement</h3>
                <div className="completed-workout-info">
                  <span className="workout-icon">{todayWorkout.icon}</span>
                  <span className="workout-name">{todayWorkout.planName}</span>
                  <span className="workout-day">({todayWorkout.day})</span>
                </div>
                <p className="congratulations">Congratulations! You've completed today's workout!</p>
              </div>
            </div>
          )}

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