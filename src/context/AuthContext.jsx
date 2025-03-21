import { createContext, useContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, signOut, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "../firebase";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || "default-avatar.png");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL || "",
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);
  
  const loginUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Tizimga muvaffaqiyatli kirdingiz!");
      return true;
    } catch (error) {
      console.error("Login Error:", error.message);
      alert("Login xatosi: " + error.message);
      return false;
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent!");
      alert("Parolni tiklash uchun email yuborildi!");
    } catch (error) {
      console.error("Reset Password Error:", error.message);
      alert("Parolni tiklashda xato yuz berdi: " + error.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      setProfileImage(result.user.photoURL || "default-avatar.png");
      localStorage.setItem("profileImage", result.user.photoURL || "default-avatar.png");
    } catch (error) {
      alert("Google bilan kirishda xatolik: " + error.message);
    }
  };

  const updateUserProfile = async (newDisplayName, newPhotoURL) => {
    try {
      if (!auth.currentUser) return;

      await updateProfile(auth.currentUser, {
        displayName: newDisplayName || auth.currentUser.displayName,
      });

      setUser((prevUser) => ({
        ...prevUser,
        displayName: newDisplayName || prevUser.displayName,
      }));

      if (newPhotoURL) {
        setProfileImage(newPhotoURL);
        localStorage.setItem("profileImage", newPhotoURL);
      }
    } catch (error) {
      console.error("Profilni yangilashda xato:", error.message);
    }
  };

  const logoutUser = async () => {
    await signOut(auth);
    setUser(null); 
  };
  
  return (
    <AuthContext.Provider value={{ user , setUser , loading, loginUser, profileImage, resetPassword  , logoutUser  , loginWithGoogle , updateUserProfile}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
