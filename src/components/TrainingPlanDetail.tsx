import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import planningVideo from '../assets/videos/BackgroundForPlanning.mp4'
import Navigation from './Navigation'
import plan1Image from '../assets/images/1.jpg'
import plan2Image from '../assets/images/2.jpg'
import plan4Image from '../assets/images/4.jpg'

function TrainingPlanDetail() {
  const { planId } = useParams()
  const navigate = useNavigate()
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)

  useEffect(() => {
    const video = document.getElementById('plan-detail-background-video') as HTMLVideoElement
    if (video) {
      video.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true)
      })
    }
  }, [])

  useEffect(() => {
    // 根据planId获取对应的训练计划详情
    const planDetails = {
      "1": {
        id: 1,
        name: "Weight Loss Training",
        description: "Comprehensive program designed to help you lose weight effectively and safely",
        duration: "8-12 weeks",
        difficulty: "Beginner to Intermediate",
        icon: "🔥",
        features: ["Cardio workouts", "Strength training", "Nutrition guidance", "Progress tracking"],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        imageUrl: plan1Image,
        weeklySchedule: [
          { day: "Monday", workout: "Cardio HIIT", duration: "45 min" },
          { day: "Tuesday", workout: "Strength Training", duration: "60 min" },
          { day: "Wednesday", workout: "Active Recovery", duration: "30 min" },
          { day: "Thursday", workout: "Cardio Steady State", duration: "45 min" },
          { day: "Friday", workout: "Strength Training", duration: "60 min" },
          { day: "Saturday", workout: "Flexibility & Mobility", duration: "30 min" },
          { day: "Sunday", workout: "Rest Day", duration: "0 min" }
        ],
        nutritionGuidelines: [
          "Calorie deficit of 300-500 calories per day",
          "High protein intake (1.6-2.2g per kg body weight)",
          "Complex carbohydrates for energy",
          "Healthy fats for hormone production",
          "Stay hydrated with 8-10 glasses of water daily"
        ],
        equipment: ["Dumbbells", "Resistance bands", "Yoga mat", "Foam roller", "Cardio machine access"]
      },
      "2": {
        id: 2,
        name: "Strength Training",
        description: "Build muscle mass and increase overall strength with progressive overload",
        duration: "12-16 weeks",
        difficulty: "Intermediate to Advanced",
        icon: "💪",
        features: ["Compound movements", "Progressive overload", "Recovery protocols", "Form coaching"],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        imageUrl: plan2Image,
        weeklySchedule: [
          { day: "Monday", workout: "Push Day (Chest, Shoulders, Triceps)", duration: "75 min" },
          { day: "Tuesday", workout: "Pull Day (Back, Biceps)", duration: "75 min" },
          { day: "Wednesday", workout: "Legs Day", duration: "75 min" },
          { day: "Thursday", workout: "Rest Day", duration: "0 min" },
          { day: "Friday", workout: "Push Day", duration: "75 min" },
          { day: "Saturday", workout: "Pull Day", duration: "75 min" },
          { day: "Sunday", workout: "Rest Day", duration: "0 min" }
        ],
        nutritionGuidelines: [
          "Calorie surplus of 200-300 calories per day",
          "High protein intake (2.0-2.4g per kg body weight)",
          "Moderate to high carbohydrates for energy",
          "Healthy fats for hormone production",
          "Creatine supplementation recommended"
        ],
        equipment: ["Barbell", "Dumbbells", "Squat rack", "Bench press", "Pull-up bar", "Weight plates"]
      },
      "3": {
        id: 3,
        name: "Muscle Building",
        description: "Hypertrophy-focused program for maximum muscle growth",
        duration: "16-20 weeks",
        difficulty: "Intermediate",
        icon: "🏋️",
        features: ["Volume training", "Isolation exercises", "Nutrition plans", "Rest optimization"],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
        weeklySchedule: [
          { day: "Monday", workout: "Chest & Triceps", duration: "90 min" },
          { day: "Tuesday", workout: "Back & Biceps", duration: "90 min" },
          { day: "Wednesday", workout: "Legs", duration: "90 min" },
          { day: "Thursday", workout: "Shoulders & Arms", duration: "90 min" },
          { day: "Friday", workout: "Chest & Back", duration: "90 min" },
          { day: "Saturday", workout: "Legs & Core", duration: "90 min" },
          { day: "Sunday", workout: "Rest Day", duration: "0 min" }
        ],
        nutritionGuidelines: [
          "Calorie surplus of 300-500 calories per day",
          "High protein intake (2.2-2.6g per kg body weight)",
          "High carbohydrates for muscle glycogen",
          "Moderate healthy fats",
          "Post-workout protein shake within 30 minutes"
        ],
        equipment: ["Full gym access", "Cable machines", "Dumbbells", "Barbells", "Smith machine", "Leg press"]
      },
      "4": {
        id: 4,
        name: "Cardio Fitness",
        description: "Improve cardiovascular health and endurance",
        duration: "6-10 weeks",
        difficulty: "All Levels",
        icon: "❤️",
        features: ["HIIT training", "Steady state cardio", "Heart rate monitoring", "Endurance building"],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        imageUrl: plan4Image,
        weeklySchedule: [
          { day: "Monday", workout: "HIIT Cardio", duration: "30 min" },
          { day: "Tuesday", workout: "Steady State Cardio", duration: "45 min" },
          { day: "Wednesday", workout: "Interval Training", duration: "40 min" },
          { day: "Thursday", workout: "Recovery Cardio", duration: "30 min" },
          { day: "Friday", workout: "HIIT Cardio", duration: "30 min" },
          { day: "Saturday", workout: "Long Distance Cardio", duration: "60 min" },
          { day: "Sunday", workout: "Active Recovery", duration: "20 min" }
        ],
        nutritionGuidelines: [
          "Maintenance calories or slight deficit",
          "Moderate protein intake (1.4-1.8g per kg body weight)",
          "High carbohydrates for endurance",
          "Stay hydrated during workouts",
          "Electrolyte replacement for long sessions"
        ],
        equipment: ["Treadmill", "Stationary bike", "Rowing machine", "Elliptical", "Heart rate monitor"]
      },
      "5": {
        id: 5,
        name: "Flexibility & Mobility",
        description: "Enhance flexibility, mobility, and joint health",
        duration: "4-8 weeks",
        difficulty: "All Levels",
        icon: "🧘",
        features: ["Stretching routines", "Mobility drills", "Recovery techniques", "Injury prevention"],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
        weeklySchedule: [
          { day: "Monday", workout: "Upper Body Mobility", duration: "30 min" },
          { day: "Tuesday", workout: "Lower Body Stretching", duration: "30 min" },
          { day: "Wednesday", workout: "Full Body Flow", duration: "45 min" },
          { day: "Thursday", workout: "Hip & Spine Mobility", duration: "30 min" },
          { day: "Friday", workout: "Recovery & Relaxation", duration: "30 min" },
          { day: "Saturday", workout: "Active Stretching", duration: "40 min" },
          { day: "Sunday", workout: "Rest & Recovery", duration: "0 min" }
        ],
        nutritionGuidelines: [
          "Anti-inflammatory diet",
          "Adequate protein for tissue repair",
          "Omega-3 fatty acids",
          "Stay hydrated for joint lubrication",
          "Consider collagen supplementation"
        ],
        equipment: ["Yoga mat", "Foam roller", "Resistance bands", "Stretching straps", "Meditation cushion"]
      },
      "6": {
        id: 6,
        name: "Sports Performance",
        description: "Sport-specific training to improve athletic performance",
        duration: "12-16 weeks",
        difficulty: "Intermediate to Advanced",
        icon: "⚽",
        features: ["Sport-specific drills", "Power training", "Agility work", "Performance testing"],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
        weeklySchedule: [
          { day: "Monday", workout: "Power Training", duration: "60 min" },
          { day: "Tuesday", workout: "Sport-Specific Skills", duration: "90 min" },
          { day: "Wednesday", workout: "Agility & Speed", duration: "45 min" },
          { day: "Thursday", workout: "Strength Training", duration: "75 min" },
          { day: "Friday", workout: "Recovery & Mobility", duration: "30 min" },
          { day: "Saturday", workout: "Game Simulation", duration: "120 min" },
          { day: "Sunday", workout: "Active Recovery", duration: "30 min" }
        ],
        nutritionGuidelines: [
          "Performance-focused nutrition",
          "High protein for muscle repair",
          "Strategic carbohydrate timing",
          "Hydration optimization",
          "Pre/post workout nutrition"
        ],
        equipment: ["Cones", "Agility ladder", "Resistance bands", "Medicine balls", "Plyometric boxes"]
      },
      "7": {
        id: 7,
        name: "Functional Fitness",
        description: "Improve daily movement patterns and overall functionality",
        duration: "8-12 weeks",
        difficulty: "All Levels",
        icon: "🏃",
        features: ["Movement patterns", "Core stability", "Balance training", "Real-world applications"],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
        weeklySchedule: [
          { day: "Monday", workout: "Push/Pull Patterns", duration: "45 min" },
          { day: "Tuesday", workout: "Squat & Lunge Patterns", duration: "45 min" },
          { day: "Wednesday", workout: "Core & Stability", duration: "30 min" },
          { day: "Thursday", workout: "Hip Hinge Patterns", duration: "45 min" },
          { day: "Friday", workout: "Balance & Coordination", duration: "30 min" },
          { day: "Saturday", workout: "Full Body Integration", duration: "60 min" },
          { day: "Sunday", workout: "Recovery", duration: "0 min" }
        ],
        nutritionGuidelines: [
          "Balanced macronutrients",
          "Whole food focus",
          "Adequate protein for recovery",
          "Stay hydrated",
          "Eat for energy and recovery"
        ],
        equipment: ["Kettlebells", "Dumbbells", "Resistance bands", "Stability ball", "TRX straps"]
      },
      "8": {
        id: 8,
        name: "Senior Fitness",
        description: "Age-appropriate training for maintaining health and independence",
        duration: "Ongoing",
        difficulty: "Beginner",
        icon: "👴",
        features: ["Low-impact exercises", "Balance training", "Strength maintenance", "Safety focus"],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
        weeklySchedule: [
          { day: "Monday", workout: "Gentle Strength Training", duration: "30 min" },
          { day: "Tuesday", workout: "Balance & Coordination", duration: "20 min" },
          { day: "Wednesday", workout: "Low-Impact Cardio", duration: "25 min" },
          { day: "Thursday", workout: "Flexibility & Stretching", duration: "25 min" },
          { day: "Friday", workout: "Strength Maintenance", duration: "30 min" },
          { day: "Saturday", workout: "Light Walking", duration: "20 min" },
          { day: "Sunday", workout: "Rest Day", duration: "0 min" }
        ],
        nutritionGuidelines: [
          "Adequate protein for muscle maintenance",
          "Calcium-rich foods for bone health",
          "Vitamin D supplementation",
          "Stay hydrated",
          "Small, frequent meals"
        ],
        equipment: ["Light dumbbells", "Resistance bands", "Chair for support", "Walking aids if needed", "Stability ball"]
      }
    }

    const plan = planDetails[planId as keyof typeof planDetails]
    if (plan) {
      setSelectedPlan(plan)
    } else {
      navigate('/training-plans')
    }
  }, [planId, navigate])

  if (!selectedPlan) {
    return <div>Loading...</div>
  }

  return (
    <div className="page-container planning-page">
      {/* Video Background */}
      <div className="video-background">
        <video
          id="plan-detail-background-video"
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
        <div className="plan-detail-header">
          <div className="plan-detail-hero">
            <div className="plan-detail-icon">{selectedPlan.icon}</div>
            <h1>{selectedPlan.name}</h1>
            <p className="plan-detail-description">{selectedPlan.description}</p>
            <div className="plan-detail-meta">
              <span className="plan-duration">Duration: {selectedPlan.duration}</span>
              <span className="plan-difficulty">Level: {selectedPlan.difficulty}</span>
            </div>
          </div>
        </div>

        <div className="plan-detail-content">
          {/* Video Section */}
          <section className="plan-detail-section">
            <h2>Training Preview</h2>
            <div className="video-container">
              <iframe
                src={selectedPlan.videoUrl}
                title="Training Preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </section>

          {/* Weekly Schedule */}
          <section className="plan-detail-section">
            <h2>Weekly Schedule</h2>
            <div className="weekly-schedule">
              {selectedPlan.weeklySchedule.map((day: any, index: number) => (
                <div key={index} className="schedule-day">
                  <div className="day-name">{day.day}</div>
                  <div className="day-workout">{day.workout}</div>
                  <div className="day-duration">{day.duration}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Nutrition Guidelines */}
          <section className="plan-detail-section">
            <h2>Nutrition Guidelines</h2>
            <ul className="nutrition-list">
              {selectedPlan.nutritionGuidelines.map((guideline: string, index: number) => (
                <li key={index}>{guideline}</li>
              ))}
            </ul>
          </section>

          {/* Equipment Needed */}
          <section className="plan-detail-section">
            <h2>Equipment Needed</h2>
            <div className="equipment-grid">
              {selectedPlan.equipment.map((item: string, index: number) => (
                <div key={index} className="equipment-item">
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* Action Buttons */}
          <section className="plan-detail-section">
            <div className="plan-actions">
              <button className="btn btn-primary" onClick={() => navigate('/training-plans')}>
                Back to Plans
              </button>
              <button className="btn btn-secondary">
                Download PDF Guide
              </button>
              <button className="btn btn-primary">
                Start This Program
              </button>
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

export default TrainingPlanDetail 