import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import Navigation from './Navigation';
import backgroundVideo from '../assets/videos/HomePageBackground.mp4';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };
  
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
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
                        <h2>Login</h2>
                        {error && <p className="auth-error">{error}</p>}
                        <form onSubmit={handleLogin}>
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
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>
                        <div className="auth-divider">
                            <span>OR</span>
                        </div>
                        <button onClick={handleGoogleSignIn} className="btn btn-google" disabled={loading}>
                            Sign in with Google
                        </button>
                        <p className="auth-switch">
                            Don't have an account? <Link to="/register">Sign Up</Link>
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

export default LoginPage; 