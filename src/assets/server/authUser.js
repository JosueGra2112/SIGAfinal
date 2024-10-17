// src/assets/server/authUser.js

import { useState, useEffect, createContext, useContext } from 'react';
import { getAuth, signInAnonymously, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from './firebase'; // Asegúrate de importar tu instancia de Firebase

// Crear un contexto para la autenticación
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Limpieza al desmontar el componente
    return () => unsubscribe();
  }, [auth]);

  const logIn = () => {
    return signInAnonymously(auth);
  };

  const logOut = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, logIn, logOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};
