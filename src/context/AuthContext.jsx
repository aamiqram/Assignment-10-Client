import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = async (email, password, name, photoURL) => {
    // Password validation
    if (!/[A-Z]/.test(password)) {
      throw new Error("Password must contain an uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      throw new Error("Password must contain a lowercase letter");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    const result = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(result.user, {
      displayName: name,
      photoURL:
        photoURL ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          name
        )}&background=007AFF&color=fff`,
    });

    await result.user.reload();
    setUser(auth.currentUser);

    return result.user;
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    return signOut(auth);
  };

  const updateUserProfile = async (name, photoURL) => {
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
    await auth.currentUser.reload();
    setUser(auth.currentUser);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    register,
    login,
    loginWithGoogle,
    logout,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
