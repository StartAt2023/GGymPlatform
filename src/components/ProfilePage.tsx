import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { auth, db } from '../firebase';
import { updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import Navigation from './Navigation';
import backgroundVideo from '../assets/videos/HomePageBackground.mp4';

function ProfilePage() {
  const { currentUser } = useAuth();
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = document.getElementById('background-video') as HTMLVideoElement;
    if (video) {
      video.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true);
      });
    }
  }, []);

  useEffect(() => {
    const fetchUsername = async () => {
      if (currentUser) {
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUsername(userSnap.data().username || currentUser.email?.split('@')[0] || '');
          } else {
            setUsername(currentUser.email?.split('@')[0] || '');
          }
        } catch (error) {
          console.error('Error fetching username:', error);
          setUsername(currentUser.email?.split('@')[0] || '');
        }
      }
    };

    fetchUsername();
  }, [currentUser]);

  const handleUsernameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !username.trim()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Update Firebase Auth displayName
      await updateProfile(currentUser, { displayName: username.trim() });
      
      // Update Firestore user document
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        username: username.trim(),
        updatedAt: new Date(),
      });
      
      setSuccess('Username updated successfully!');
    } catch (err) {
      setError('Failed to update username. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !currentPassword || !newPassword) {
      setError('Please fill in all password fields.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const credential = EmailAuthProvider.credential(currentUser.email!, currentPassword);
      await reauthenticateWithCredential(currentUser, credential);
      
      await updatePassword(currentUser, newPassword);
      setSuccess('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      if (err.code === 'auth/wrong-password') {
        setError('Incorrect current password. Please try again.');
      } else {
        setError('Failed to update password. Please try again later.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="app">
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

        <div className="content-overlay">
          <Navigation />
          <main className="page-main">
            <p>Please log in to see your profile.</p>
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
        <main className="page-main profile-main">
          <div className="page-header">
            <h1>Account Information</h1>
            <p>Manage your account settings and set a new password.</p>
          </div>

          <div className="profile-form-container">
            {error && <div className="auth-error">{error}</div>}
            {success && <div className="auth-success">{success}</div>}
            
            <form onSubmit={handleUsernameUpdate} className="profile-form">
              <h2>Update Username</h2>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your new username"
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Updating...' : 'Update Username'}
              </button>
            </form>

            <div className="auth-divider">OR</div>

            <form onSubmit={handlePasswordUpdate} className="profile-form">
              <h2>Change Password</h2>
               <div className="form-group">
                <label htmlFor="current-password">Current Password</label>
                <input
                  type="password"
                  id="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="new-password">New Password</label>
                <input
                  type="password"
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Updating...' : 'Change Password'}
              </button>
            </form>
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

export default ProfilePage; 