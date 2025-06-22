import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.png'

function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <img src={logo} alt="GGymPlatform Logo" className="logo-img" />
          <h2>GGymPlatform</h2>
        </div>
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/training-plans">Training Plans</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><a href="https://e-commerce-order-processing-system.vercel.app/" target="_blank" rel="noopener noreferrer">Shop</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation 