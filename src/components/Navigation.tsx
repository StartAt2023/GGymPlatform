import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { auth, db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import logo from '../assets/images/logo.png'

function Navigation() {
  const { currentUser } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [username, setUsername] = useState('')
  const dropdownRef = useRef<HTMLLIElement>(null)

  // Fetch username from Firestore
  useEffect(() => {
    const fetchUsername = async () => {
      if (currentUser) {
        console.log("Navigation: Current user found. UID:", currentUser.uid);
        console.log("Navigation: currentUser.displayName is:", currentUser.displayName);
        try {
          const userRef = doc(db, 'users', currentUser.uid)
          const userSnap = await getDoc(userRef)
          if (userSnap.exists()) {
            const dbUsername = userSnap.data().username;
            console.log("Navigation: Fetched from DB. Username:", dbUsername);
            setUsername(dbUsername || currentUser.email?.split('@')[0] || 'User')
          } else {
            console.log("Navigation: User document not found in DB. Using email as fallback.");
            setUsername(currentUser.email?.split('@')[0] || 'User')
          }
        } catch (error) {
          console.error('Navigation: Error fetching username:', error)
          setUsername(currentUser.email?.split('@')[0] || 'User')
        }
      } else {
        console.log("Navigation: No current user.");
        setUsername('')
      }
    }

    fetchUsername()
  }, [currentUser])

  const handleLogout = async () => {
    try {
      await auth.signOut()
      setDropdownOpen(false) // Close dropdown on logout
    } catch (error) {
      console.error('Failed to log out', error)
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/" className="nav-logo-link">
            <img src={logo} alt="GGymPlatform Logo" className="logo-img" />
            <h2>GGymPlatform</h2>
          </Link>
        </div>
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/training-plans">Training Plans</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><a href="https://e-commerce-order-processing-system.vercel.app/" target="_blank" rel="noopener noreferrer">Shop</a></li>
          {currentUser ? (
            <li className="user-info-dropdown" ref={dropdownRef}>
              <div className="user-info-trigger" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <span className="user-name">{username}</span>
                <span className="dropdown-arrow">{dropdownOpen ? '▴' : '▾'}</span>
              </div>
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li><Link to="/profile" onClick={() => setDropdownOpen(false)}>Profile</Link></li>
                  <li><Link to="/history" onClick={() => setDropdownOpen(false)}>History</Link></li>
                  <li><button onClick={handleLogout} className="btn-logout-dropdown">Logout</button></li>
                </ul>
              )}
            </li>
          ) : (
            <li><Link to="/login" className="btn-nav btn-nav-primary">Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation 