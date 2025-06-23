import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Navigation from './Navigation';
import backgroundVideo from '../assets/videos/HomePageBackground.mp4';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const video = document.getElementById('background-video') as HTMLVideoElement;
    if (video) {
        video.addEventListener('loadeddata', () => {
            setIsVideoLoaded(true);
        });
    }
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    setLoading(true);
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

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
            <main className="page-main auth-main">
                <div className="auth-container">
                    <div className="auth-card">
                        <h2>Sign Up</h2>
                        {error && <p className="auth-error">{error}</p>}
                        <form onSubmit={handleRegister}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirm-password">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Signing up...' : 'Sign Up'}
                            </button>
                        </form>
                        <p className="auth-switch">
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </div>
                </div>
            </main>
            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2024 GGymPlatform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    </div>
  );
}

export default RegisterPage; 