import { useState, useEffect } from 'react'
import planningVideo from '../assets/videos/BackgroundForPlanning.mp4'
import Navigation from './Navigation'

function TrainingPlansPage() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    const video = document.getElementById('planning-background-video') as HTMLVideoElement
    if (video) {
      video.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true)
      })
    }
  }, [])

  const trainingPlans = [
    {
      id: 1,
      name: "Weight Loss Training",
      description: "Comprehensive program designed to help you lose weight effectively and safely",
      duration: "8-12 weeks",
      difficulty: "Beginner to Intermediate",
      icon: "🔥",
      features: ["Cardio workouts", "Strength training", "Nutrition guidance", "Progress tracking"]
    },
    {
      id: 2,
      name: "Strength Training",
      description: "Build muscle mass and increase overall strength with progressive overload",
      duration: "12-16 weeks",
      difficulty: "Intermediate to Advanced",
      icon: "💪",
      features: ["Compound movements", "Progressive overload", "Recovery protocols", "Form coaching"]
    },
    {
      id: 3,
      name: "Muscle Building",
      description: "Hypertrophy-focused program for maximum muscle growth",
      duration: "16-20 weeks",
      difficulty: "Intermediate",
      icon: "🏋️",
      features: ["Volume training", "Isolation exercises", "Nutrition plans", "Rest optimization"]
    },
    {
      id: 4,
      name: "Cardio Fitness",
      description: "Improve cardiovascular health and endurance",
      duration: "6-10 weeks",
      difficulty: "All Levels",
      icon: "❤️",
      features: ["HIIT training", "Steady state cardio", "Heart rate monitoring", "Endurance building"]
    },
    {
      id: 5,
      name: "Flexibility & Mobility",
      description: "Enhance flexibility, mobility, and joint health",
      duration: "4-8 weeks",
      difficulty: "All Levels",
      icon: "🧘",
      features: ["Stretching routines", "Mobility drills", "Recovery techniques", "Injury prevention"]
    },
    {
      id: 6,
      name: "Sports Performance",
      description: "Sport-specific training to improve athletic performance",
      duration: "12-16 weeks",
      difficulty: "Intermediate to Advanced",
      icon: "⚽",
      features: ["Sport-specific drills", "Power training", "Agility work", "Performance testing"]
    },
    {
      id: 7,
      name: "Functional Fitness",
      description: "Improve daily movement patterns and overall functionality",
      duration: "8-12 weeks",
      difficulty: "All Levels",
      icon: "🏃",
      features: ["Movement patterns", "Core stability", "Balance training", "Real-world applications"]
    },
    {
      id: 8,
      name: "Senior Fitness",
      description: "Age-appropriate training for maintaining health and independence",
      duration: "Ongoing",
      difficulty: "Beginner",
      icon: "👴",
      features: ["Low-impact exercises", "Balance training", "Strength maintenance", "Safety focus"]
    }
  ]

  return (
    <div className="page-container planning-page">
      {/* Video Background for Training Plans */}
      <div className="video-background">
        <video
          id="planning-background-video"
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
        <div className="page-header">
          <h1>Training Plans</h1>
          <p>Choose the perfect training program for your fitness goals</p>
        </div>

        <div className="training-plans-grid">
          {trainingPlans.map((plan) => (
            <div key={plan.id} className="training-plan-card">
              <div className="plan-header">
                <div className="plan-icon">{plan.icon}</div>
                <h3>{plan.name}</h3>
              </div>
              <p className="plan-description">{plan.description}</p>
              <div className="plan-details">
                <span className="plan-duration">Duration: {plan.duration}</span>
                <span className="plan-difficulty">Level: {plan.difficulty}</span>
              </div>
              <ul className="plan-features">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button className="btn btn-primary plan-btn">
                Start This Plan
              </button>
            </div>
          ))}
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

export default TrainingPlansPage 