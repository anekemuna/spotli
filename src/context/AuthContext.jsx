import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../services/supabaseClient";

const AuthContext = createContext({});

// eslint-disable-next-line
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // signUp function
  const signUp = async (username, email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
        },
      },
    });

    if (error) throw error;

    // Profile will be created automatically in the auth state listener
    return data;
  };

  // signIn function
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  // signOut function
  const signOut = () => supabase.auth.signOut();

  // Helper function to create profile if it doesn't exist
  const createProfileIfNeeded = async (user) => {
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!existingProfile) {
      await supabase
        .from("profiles")
        .insert([{ id: user.id, username: user.user_metadata.username }]);
    }
  };

  // useEffect with auth state listener
  useEffect(() => {
    // Get session and set user
    supabase.auth.getSession().then(async ({ data }) => {
      const currentUser = data.session?.user || null;
      setUser(currentUser);

      // Create profile if user is authenticated and has username in metadata
      if (currentUser && currentUser.user_metadata?.username) {
        await createProfileIfNeeded(currentUser);
      }

      setLoading(false);
    });

    // Listen for auth changes (signIn / signOut)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user || null;
        setUser(currentUser);

        // Create profile if user is authenticated and has username in metadata
        if (currentUser && currentUser.user_metadata?.username) {
          await createProfileIfNeeded(currentUser);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
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
