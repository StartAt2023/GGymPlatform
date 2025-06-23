import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import Navigation from './Navigation';
import backgroundVideo from '../assets/videos/HomePageBackground.mp4';

interface CompletedWorkout {
    id: string;
    planId: string;
    planName: string;
    day: number;
    date: Timestamp;
}

function HistoryPage() {
    const { currentUser } = useAuth();
    const [history, setHistory] = useState<CompletedWorkout[]>([]);
    const [loading, setLoading] = useState(true);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const video = document.getElementById('background-video') as HTMLVideoElement;
        if (video) {
            video.addEventListener('loadeddata', () => {
                setIsVideoLoaded(true);
            });
        }
    }, []);

    useEffect(() => {
        const fetchHistory = async () => {
            if (currentUser) {
                console.log("HistoryPage: Fetching history for user UID:", currentUser.uid);
                try {
                    const q = query(
                        collection(db, 'users', currentUser.uid, 'completedWorkouts')
                    );
                    const querySnapshot = await getDocs(q);
                    
                    console.log("HistoryPage: Firestore query executed WITHOUT ordering.");
                    console.log("HistoryPage: Is query snapshot empty?", querySnapshot.empty);
                    console.log("HistoryPage: Number of documents found:", querySnapshot.size);

                    const workoutHistory = querySnapshot.docs.map(doc => {
                        const data = doc.data();
                        console.log("HistoryPage: Document data:", data);
                        return {
                            id: doc.id,
                            ...data
                        };
                    }) as CompletedWorkout[];
                    
                    setHistory(workoutHistory);
                } catch (error) {
                    console.error("HistoryPage: Error fetching workout history: ", error);
                } finally {
                    setLoading(false);
                }
            } else {
                console.log("HistoryPage: No current user, skipping fetch.");
                setLoading(false);
            }
        };

        fetchHistory();
    }, [currentUser, refreshKey]);

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
                        <h1>Workout History</h1>
                        <p>Here is a record of all the workouts you have completed.</p>
                        <button className="btn btn-secondary" onClick={() => setRefreshKey(oldKey => oldKey + 1)} style={{ marginTop: '1rem' }}>
                            Refresh History
                        </button>
                    </div>
                    <div className="history-container">
                        {loading ? (
                            <p className="loading-text">Loading history...</p>
                        ) : history.length > 0 ? (
                            <div className="history-list">
                                {history.map((item) => (
                                    <div key={item.id} className="history-item">
                                        <div className="history-item-icon">{item.planName.charAt(0)}</div>
                                        <div className="history-item-details">
                                            <h3>{item.planName} - Day {item.day}</h3>
                                            <p>Completed on: {item.date ? item.date.toDate().toLocaleDateString() : 'Date not available'}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="loading-text">You haven't completed any workouts yet. Get started today!</p>
                        )}
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

export default HistoryPage; 