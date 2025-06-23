import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './components/HomePage'
import TrainingPlansPage from './components/TrainingPlansPage'
import TrainingPlanDetail from './components/TrainingPlanDetail'
import AboutPage from './components/AboutPage'
import ContactPage from './components/ContactPage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import ProfilePage from './components/ProfilePage'
import HistoryPage from './components/HistoryPage'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/training-plans" element={<ProtectedRoute><TrainingPlansPage /></ProtectedRoute>} />
          <Route path="/training-plans/:id" element={<ProtectedRoute><TrainingPlanDetail /></ProtectedRoute>} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
