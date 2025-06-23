import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { type User, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: ReactNode;
}

// Function to create or update user document in Firestore
const createUserDocument = async (user: User) => {
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  
  try {
    // Check if user document already exists
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      // Create new user document - use email prefix as default username
      const userData = {
        uid: user.uid,
        email: user.email,
        username: user.email?.split('@')[0] || 'User',
        createdAt: new Date(),
        lastLogin: new Date(),
      };
      
      await setDoc(userRef, userData);
      console.log('User document created successfully');
    } else {
      // Update last login time for existing user - preserve existing username
      const existingData = userSnap.data();
      const updateData: any = {
        lastLogin: new Date(),
      };
      
      // Only update username if user has explicitly set a displayName and it's different from current
      if (user.displayName && user.displayName !== existingData.username) {
        updateData.username = user.displayName;
      }
      
      await setDoc(userRef, updateData, { merge: true });
      console.log('User document updated successfully');
    }
  } catch (error) {
    console.error('Error creating/updating user document:', error);
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      // Create or update user document when user state changes
      if (user) {
        await createUserDocument(user);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 