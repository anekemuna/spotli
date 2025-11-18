import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../services/supabaseClient";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // signUp function
  const signUp = (email, password) => supabase.auth.signUp({email, password})

  // signIn function 
  const signIn = (email, password) =>
    supabase.auth.signInWithPassword({ email, password });

  // signOut function
  const signOut = () => supabase.auth.signOut();

  // useEffect with auth state listener 
  useEffect(() => {
    // Get session and set user
    supabase.auth.getSession().then(({data}) => {
        setUser(data.session?.user || null)
        setLoading(false)
    })

    // Listen for auth changes (signIn / signOut)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe()
  }, []);

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
