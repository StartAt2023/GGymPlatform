import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import planningVideo from '../assets/videos/BackgroundForPlanning.mp4'
import Navigation from './Navigation'
import plan1Image from '../assets/images/1.jpg'
import plan2Image from '../assets/images/2.jpg'
import plan4Image from '../assets/images/4.jpg'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase'
import { collection, addDoc, query, where, getDocs, serverTimestamp, orderBy } from 'firebase/firestore'

function TrainingPlanDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [todayWorkout, setTodayWorkout] = useState<any>(null)
  const [completedWorkouts, setCompletedWorkouts] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  // YouTube训练视频链接
  const workoutVideos = {
    "Cardio HIIT": "https://www.youtube.com/watch?v=ml6cT4AZdqI",
    "Strength Training": "https://www.youtube.com/watch?v=3VcKaXpzqRo",
    "Active Recovery": "https://www.youtube.com/watch?v=Gc4eQHd2Lgw",
    "Cardio Steady State": "https://www.youtube.com/watch?v=ml6cT4AZdqI",
    "Flexibility & Mobility": "https://www.youtube.com/watch?v=Gc4eQHd2Lgw",
    "Push Day (Chest, Shoulders, Triceps)": "https://www.youtube.com/watch?v=3VcKaXpzqRo",
    "Pull Day (Back, Biceps)": "https://www.youtube.com/watch?v=3VcKaXpzqRo",
    "Legs Day": "https://www.youtube.com/watch?v=3VcKaXpzqRo",
    "Chest & Triceps": "https://www.youtube.com/watch?v=3VcKaXpzqRo",
    "Back & Biceps": "https://www.youtube.com/watch?v=3VcKaXpzqRo",
    "Legs": "https://www.youtube.com/watch?v=3VcKaXpzqRo",
    "Shoulders & Arms": "https://www.youtube.com/watch?v=3VcKaXpzqRo",
    "Chest & Back": "https://www.youtube.com/watch?v=3VcKaXpzqRo",
    "Legs & Core": "https://www.youtube.com/watch?v=3VcKaXpzqRo",
    "HIIT Cardio": "https://www.youtube.com/watch?v=ml6cT4AZdqI",
    "Steady State Cardio": "https://www.youtube.com/watch?v=ml6cT4AZdqI",
    "Interval Training": "https://www.youtube.com/watch?v=ml6cT4AZdqI",
    "Recovery Cardio": "https://www.youtube.com/watch?v=Gc4eQHd2Lgw",
    "Long Distance Cardio": "https://www.youtube.com/watch?v=ml6cT4AZdqI",
    "Upper Body Mobility": "https://www.youtube.com/watch?v=Gc4eQHd2Lgw",
    "Lower Body Stretching": "https://www.youtube.com/watch?v=Gc4eQHd2Lgw",
    "Full Body Flow": "https://www.youtube.com/watch?v=Gc4eQHd2Lgw",
    "Hip & Spine Mobility": "https://www.youtube.com/watch?v=Gc4eQHd2Lgw",
    "Recovery & Relaxation": "https://www.youtube.com/watch?v=Gc4eQHd2Lgw",
    "Active Stretching": "https://www.youtube.com/watch?v=Gc4eQHd2Lgw",
    "Power Training": "https://www.youtube.com/watch?v=3VcKaXpzqRo",
    "Sport-Specific Skills": "https://www.youtube.com/watch?v=3VcKaXpzqRo",
    "Agility & Speed": "https://www.youtube.com/watch?v=3VcKaXpzqRo",
    "Game Simulation": "https://www.youtube.com/watch?v=3VcKaXpzqRo",
    "Push/Pull Patterns": "https://www.youtube.com/watch?v=3VcKaXpzqRo",
    "Squat & Lunge Patterns": "https://www.youtube.com/watch?v=3VcKaXpzqRo",
    "Core & Stability": "https://www.youtube.com/watch?v=3VcKaXpzqRo",
    "Hip Hinge Patterns": "https://www.youtube.com/watch?v=3VcKaXpzqRo",
    "Balance & Coordination": "https://www.youtube.com/watch?v=Gc4eQHd2Lgw",
    "Full Body Integration": "https://www.youtube.com/watch?v=3VcKaXpzqRo",
    "Gentle Strength Training": "https://www.youtube.com/watch?v=Gc4eQHd2Lgw",
    "Low-Impact Cardio": "https://www.youtube.com/watch?v=Gc4eQHd2Lgw",
    "Strength Maintenance": "https://www.youtube.com/watch?v=Gc4eQHd2Lgw",
    "Light Walking": "https://www.youtube.com/watch?v=Gc4eQHd2Lgw"
  }

  // 获取今天的星期几
  const getTodayWorkout = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const today = days[new Date().getDay()]
    return selectedPlan?.weeklySchedule.find((day: any) => day.day === today)
  }

  const handleStartTodayWorkout = () => {
    const workout = getTodayWorkout();
    setTodayWorkout(workout);
  };

  // 生成PDF
  const generatePDF = async () => {
    if (!selectedPlan) return

    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 20

    // 标题
    pdf.setFontSize(24)
    pdf.setTextColor(0, 212, 255)
    pdf.text(selectedPlan.name, pageWidth / 2, 30, { align: 'center' })

    // 描述
    pdf.setFontSize(12)
    pdf.setTextColor(85, 85, 85)
    pdf.text(selectedPlan.description, margin, 50)

    // 基本信息
    pdf.setFontSize(14)
    pdf.setTextColor(0, 0, 0)
    pdf.text(`Duration: ${selectedPlan.duration}`, margin, 70)
    pdf.text(`Difficulty: ${selectedPlan.difficulty}`, margin, 80)

    // 周计划表
    pdf.setFontSize(16)
    pdf.setTextColor(0, 212, 255)
    pdf.text('Weekly Schedule', margin, 100)

    pdf.setFontSize(10)
    pdf.setTextColor(0, 0, 0)
    let yPosition = 115

    selectedPlan.weeklySchedule.forEach((day: any, index: number) => {
      if (yPosition > pageHeight - 40) {
        pdf.addPage()
        yPosition = 20
      }

      pdf.setFontSize(12)
      pdf.setTextColor(0, 212, 255)
      pdf.text(`${day.day}:`, margin, yPosition)
      
      pdf.setFontSize(10)
      pdf.setTextColor(0, 0, 0)
      pdf.text(`${day.workout} - ${day.duration}`, margin + 30, yPosition)
      
      yPosition += 8
    })

    // 营养指南
    if (yPosition > pageHeight - 80) {
      pdf.addPage()
      yPosition = 20
    }

    pdf.setFontSize(16)
    pdf.setTextColor(0, 212, 255)
    pdf.text('Nutrition Guidelines', margin, yPosition + 10)

    pdf.setFontSize(10)
    pdf.setTextColor(0, 0, 0)
    yPosition += 25

    selectedPlan.nutritionGuidelines.forEach((guideline: string) => {
      if (yPosition > pageHeight - 20) {
        pdf.addPage()
        yPosition = 20
      }
      pdf.text(`• ${guideline}`, margin, yPosition)
      yPosition += 6
    })

    // 设备清单
    if (yPosition > pageHeight - 60) {
      pdf.addPage()
      yPosition = 20
    }

    pdf.setFontSize(16)
    pdf.setTextColor(0, 212, 255)
    pdf.text('Equipment Needed', margin, yPosition + 10)

    pdf.setFontSize(10)
    pdf.setTextColor(0, 0, 0)
    yPosition += 25

    selectedPlan.equipment.forEach((item: string) => {
      if (yPosition > pageHeight - 20) {
        pdf.addPage()
        yPosition = 20
      }
      pdf.text(`• ${item}`, margin, yPosition)
      yPosition += 6
    })

    // 保存PDF
    pdf.save(`${selectedPlan.name.replace(/\s+/g, '_')}_Training_Plan.pdf`)
  }

  useEffect(() => {
    const video = document.getElementById('plan-detail-background-video') as HTMLVideoElement
    if (video) {
      video.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true)
      })
    }
  }, [])

  useEffect(() => {
    // 根据id获取对应的训练计划详情
    const planDetails = {
      "1": {
        id: 1,
        name: "Weight Loss Training",
        description: "Comprehensive program designed to help you lose weight effectively and safely",
        duration: "8-12 weeks",
        difficulty: "Beginner to Intermediate",
        icon: "🔥",
        features: ["Cardio workouts", "Strength training", "Nutrition guidance", "Progress tracking"],
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

    if (id && planDetails[id as keyof typeof planDetails]) {
      setSelectedPlan(planDetails[id as keyof typeof planDetails])
    } else {
      // 如果找不到计划，可以导航回列表页或显示错误信息
      // navigate('/training-plans')
    }
    setLoading(false)
  }, [id, navigate])

  // Fetch completed workouts from Firestore
  useEffect(() => {
    const fetchCompletedWorkouts = async () => {
      if (!currentUser) return;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const q = query(
        collection(db, 'users', currentUser.uid, 'completedWorkouts'),
        where('date', '>=', today)
      );
      
      const querySnapshot = await getDocs(q);
      const completedToday = querySnapshot.docs.map(doc => doc.data().day);
      setCompletedWorkouts(completedToday);
    };

    if (currentUser) {
      fetchCompletedWorkouts();
    }
  }, [currentUser]);

  const markTodayAsCompleted = async () => {
    const todayWorkout = getTodayWorkout();
    if (!currentUser || !todayWorkout || isTodayCompleted()) return;

    try {
      const historyRef = collection(db, 'users', currentUser.uid, 'completedWorkouts');
      await addDoc(historyRef, {
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        day: todayWorkout.day,
        date: serverTimestamp(), // Correctly use server timestamp
      });
      setCompletedWorkouts(prev => [...prev, todayWorkout.day]);
    } catch (error) {
      console.error("Error marking workout as completed: ", error);
    }
  };

  const isWorkoutCompleted = (day: string) => {
    return completedWorkouts.includes(day);
  }

  const isTodayCompleted = () => {
    const todayWorkout = getTodayWorkout()
    if (!todayWorkout || !selectedPlan) return false
    const todayKey = `${selectedPlan.id}-${todayWorkout.day}-${new Date().toDateString()}`
    return completedWorkouts.includes(todayWorkout.day)
  }

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
            <h2>Training Overview</h2>
            <div className="training-overview">
              {selectedPlan.id === 1 && (
                <div className="overview-content">
                  <h3>Weight Loss Training Program</h3>
                  <p>This comprehensive weight loss program combines high-intensity cardio workouts with strength training to maximize fat burning and build lean muscle. The program follows a progressive approach, starting with foundational movements and gradually increasing intensity.</p>
                  <div className="key-points">
                    <h4>Key Training Principles:</h4>
                    <ul>
                      <li><strong>HIIT Cardio:</strong> High-intensity interval training to boost metabolism and burn calories efficiently</li>
                      <li><strong>Strength Training:</strong> Compound movements to build muscle and increase resting metabolic rate</li>
                      <li><strong>Active Recovery:</strong> Low-intensity activities to promote recovery and maintain momentum</li>
                      <li><strong>Progressive Overload:</strong> Gradually increasing workout intensity to continue seeing results</li>
                    </ul>
                  </div>
                  <div className="training-tips">
                    <h4>Training Tips:</h4>
                    <ul>
                      <li>Focus on form over speed, especially when starting</li>
                      <li>Stay hydrated throughout your workouts</li>
                      <li>Listen to your body and adjust intensity as needed</li>
                      <li>Track your progress to stay motivated</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {selectedPlan.id === 2 && (
                <div className="overview-content">
                  <h3>Strength Training Program</h3>
                  <p>This advanced strength training program focuses on compound movements and progressive overload to build maximum strength and muscle mass. The program uses a push-pull-legs split to ensure balanced development.</p>
                  <div className="key-points">
                    <h4>Key Training Principles:</h4>
                    <ul>
                      <li><strong>Compound Movements:</strong> Multi-joint exercises that recruit multiple muscle groups</li>
                      <li><strong>Progressive Overload:</strong> Gradually increasing weight or reps to stimulate growth</li>
                      <li><strong>Proper Form:</strong> Emphasizing technique to prevent injury and maximize results</li>
                      <li><strong>Recovery Focus:</strong> Adequate rest between sessions for optimal muscle repair</li>
                    </ul>
                  </div>
                  <div className="training-tips">
                    <h4>Training Tips:</h4>
                    <ul>
                      <li>Always warm up properly before heavy lifts</li>
                      <li>Focus on controlled movements with proper breathing</li>
                      <li>Gradually increase weight while maintaining form</li>
                      <li>Allow 48-72 hours between training the same muscle group</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {selectedPlan.id === 3 && (
                <div className="overview-content">
                  <h3>Muscle Building Program</h3>
                  <p>This hypertrophy-focused program is designed for maximum muscle growth through high-volume training and targeted isolation exercises. The program emphasizes muscle time under tension and metabolic stress.</p>
                  <div className="key-points">
                    <h4>Key Training Principles:</h4>
                    <ul>
                      <li><strong>Volume Training:</strong> High sets and reps to maximize muscle stimulation</li>
                      <li><strong>Isolation Exercises:</strong> Targeted movements to focus on specific muscle groups</li>
                      <li><strong>Time Under Tension:</strong> Controlled movements to increase muscle fiber recruitment</li>
                      <li><strong>Supersets:</strong> Combining exercises to increase training density</li>
                    </ul>
                  </div>
                  <div className="training-tips">
                    <h4>Training Tips:</h4>
                    <ul>
                      <li>Focus on the mind-muscle connection during exercises</li>
                      <li>Use moderate weights with higher rep ranges (8-15)</li>
                      <li>Include both compound and isolation movements</li>
                      <li>Ensure adequate protein intake for muscle repair</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {selectedPlan.id === 4 && (
                <div className="overview-content">
                  <h3>Cardio Fitness Program</h3>
                  <p>This comprehensive cardio program improves cardiovascular health and endurance through a variety of training methods. The program includes HIIT, steady-state cardio, and interval training to build a strong aerobic base.</p>
                  <div className="key-points">
                    <h4>Key Training Principles:</h4>
                    <ul>
                      <li><strong>HIIT Training:</strong> High-intensity intervals to improve cardiovascular efficiency</li>
                      <li><strong>Steady State:</strong> Moderate-intensity cardio to build endurance</li>
                      <li><strong>Heart Rate Zones:</strong> Training in different zones for optimal results</li>
                      <li><strong>Progressive Overload:</strong> Gradually increasing duration and intensity</li>
                    </ul>
                  </div>
                  <div className="training-tips">
                    <h4>Training Tips:</h4>
                    <ul>
                      <li>Monitor your heart rate during workouts</li>
                      <li>Start with shorter sessions and gradually increase duration</li>
                      <li>Vary your cardio activities to prevent boredom</li>
                      <li>Stay hydrated and fuel properly for longer sessions</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {selectedPlan.id === 5 && (
                <div className="overview-content">
                  <h3>Flexibility & Mobility Program</h3>
                  <p>This program focuses on improving flexibility, joint mobility, and overall movement quality. The program combines static stretching, dynamic movements, and mobility drills to enhance range of motion and prevent injury.</p>
                  <div className="key-points">
                    <h4>Key Training Principles:</h4>
                    <ul>
                      <li><strong>Static Stretching:</strong> Hold positions to improve muscle length</li>
                      <li><strong>Dynamic Mobility:</strong> Movement-based exercises to improve joint range</li>
                      <li><strong>Recovery Focus:</strong> Techniques to reduce muscle tension and soreness</li>
                      <li><strong>Injury Prevention:</strong> Addressing common movement limitations</li>
                    </ul>
                  </div>
                  <div className="training-tips">
                    <h4>Training Tips:</h4>
                    <ul>
                      <li>Breathe deeply and relax into stretches</li>
                      <li>Never force a stretch beyond your comfort level</li>
                      <li>Be consistent - flexibility takes time to develop</li>
                      <li>Include both warm-up and cool-down routines</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {selectedPlan.id === 6 && (
                <div className="overview-content">
                  <h3>Sports Performance Program</h3>
                  <p>This sport-specific training program enhances athletic performance through power training, agility work, and sport-specific drills. The program is designed to improve speed, power, and overall athletic ability.</p>
                  <div className="key-points">
                    <h4>Key Training Principles:</h4>
                    <ul>
                      <li><strong>Power Training:</strong> Explosive movements to improve force production</li>
                      <li><strong>Agility Work:</strong> Multi-directional movements and quick changes of direction</li>
                      <li><strong>Sport-Specific Skills:</strong> Movements that mimic your sport's demands</li>
                      <li><strong>Performance Testing:</strong> Regular assessments to track progress</li>
                    </ul>
                  </div>
                  <div className="training-tips">
                    <h4>Training Tips:</h4>
                    <ul>
                      <li>Focus on quality over quantity in power movements</li>
                      <li>Allow adequate recovery between high-intensity sessions</li>
                      <li>Practice sport-specific movements regularly</li>
                      <li>Monitor performance metrics to track improvement</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {selectedPlan.id === 7 && (
                <div className="overview-content">
                  <h3>Functional Fitness Program</h3>
                  <p>This program improves daily movement patterns and overall functionality through exercises that mimic real-world activities. The program focuses on core stability, balance, and movement efficiency.</p>
                  <div className="key-points">
                    <h4>Key Training Principles:</h4>
                    <ul>
                      <li><strong>Movement Patterns:</strong> Exercises that improve daily functional movements</li>
                      <li><strong>Core Stability:</strong> Strengthening the body's center for better movement</li>
                      <li><strong>Balance Training:</strong> Improving stability and coordination</li>
                      <li><strong>Real-World Application:</strong> Movements that translate to daily life</li>
                    </ul>
                  </div>
                  <div className="training-tips">
                    <h4>Training Tips:</h4>
                    <ul>
                      <li>Focus on proper movement patterns over heavy weights</li>
                      <li>Include single-leg and single-arm exercises</li>
                      <li>Practice movements that challenge your balance</li>
                      <li>Think about how exercises apply to daily activities</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {selectedPlan.id === 8 && (
                <div className="overview-content">
                  <h3>Senior Fitness Program</h3>
                  <p>This age-appropriate program focuses on maintaining health, independence, and quality of life through safe and effective exercises. The program emphasizes balance, strength maintenance, and low-impact activities.</p>
                  <div className="key-points">
                    <h4>Key Training Principles:</h4>
                    <ul>
                      <li><strong>Low-Impact Exercises:</strong> Joint-friendly movements that reduce stress</li>
                      <li><strong>Balance Training:</strong> Exercises to improve stability and prevent falls</li>
                      <li><strong>Strength Maintenance:</strong> Preserving muscle mass and bone density</li>
                      <li><strong>Safety Focus:</strong> Prioritizing injury prevention and proper form</li>
                    </ul>
                  </div>
                  <div className="training-tips">
                    <h4>Training Tips:</h4>
                    <ul>
                      <li>Always consult with healthcare providers before starting</li>
                      <li>Start slowly and progress gradually</li>
                      <li>Use support when needed (chairs, walls, etc.)</li>
                      <li>Focus on consistency rather than intensity</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Weekly Schedule */}
          <section className="plan-detail-section">
            <h2>Weekly Schedule</h2>
            <div className="weekly-schedule">
              {selectedPlan.weeklySchedule.map((day: any, index: number) => {
                const isCompleted = isWorkoutCompleted(day.day)
                return (
                  <div key={index} className={`schedule-day ${isCompleted ? 'completed' : ''}`}>
                    <div className="day-name">{day.day}</div>
                    <div className="day-workout">{day.workout}</div>
                    <div className="day-duration">{day.duration}</div>
                    {isCompleted && <div className="completion-badge">Done</div>}
                  </div>
                )
              })}
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
              <button className="btn btn-secondary" onClick={generatePDF}>
                Download PDF Guide
              </button>
              <button className="btn btn-primary" onClick={handleStartTodayWorkout}>
                Start This Program
              </button>
            </div>
          </section>

          {/* Today's Workout Section */}
          {todayWorkout !== null && (
            <section className="plan-detail-section" id="today-workout-section">
              <h2 className="today-workout-title">Today's Workout: {todayWorkout ? todayWorkout.day : 'Rest Day'}</h2>
              {todayWorkout && todayWorkout.workout !== "Rest Day" ? (
                <div className="workout-card">
                  <div className="workout-header">
                    <h3>{todayWorkout.workout}</h3>
                    <span className="workout-duration">{todayWorkout.duration}</span>
                  </div>
                  <div className="workout-content">
                    <p>Follow the video for a guided session. Focus on your form and breathing.</p>
                    <a 
                      href={workoutVideos[todayWorkout.workout as keyof typeof workoutVideos] || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="workout-video-link"
                    >
                      Watch Today's Workout Video
                    </a>
                    {!isTodayCompleted() ? (
                      <div className="completion-section">
                        <button className="btn btn-success" onClick={markTodayAsCompleted}>
                          Completed Today's Task
                        </button>
                      </div>
                    ) : (
                      <div className="completion-section">
                        <p className="completed-message">You've completed today's task. Well done!</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="no-workout">
                  <p>Today is a rest day. Enjoy your recovery!</p>
                </div>
              )}
            </section>
          )}
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