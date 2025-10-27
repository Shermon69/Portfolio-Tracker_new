// AuthContext.jsx (Corrected with useRef)

import React, { createContext, useState, useEffect, useContext, useRef } from 'react'; // Added useRef
import { supabase, auth } from '../lib/supabase'; // Added auth import

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authListenerRef = useRef(null); // Use a ref for the subscription

  useEffect(() => {
    setLoading(true); // Set loading true at the start of the effect

    const fetchUserProfile = async (currentAuthUser) => {
      if (!currentAuthUser) {
        setProfile(null);
        return null;
      }
      try {
        const { data: userProfile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentAuthUser.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          setProfile(null);
          return null;
        }
        setProfile(userProfile);
        return userProfile;
      } catch (e) {
        console.error('Exception fetching profile:', e);
        setProfile(null);
        return null;
      }
    };

    // Listener for auth state changes
    // The 'data' object from onAuthStateChange contains the subscription
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        // setLoading(true) here might be too frequent if auth state changes rapidly
        // It's better to manage loading around initial session check and sign-in/out operations.
        const currentAuthUser = session?.user;
        const userProfileData = await fetchUserProfile(currentAuthUser);

        if (currentAuthUser) {
          setUser({ ...currentAuthUser, profile: userProfileData });
          setIsAuthenticated(true);
        } else {
          setUser(null);
          // profile is set by fetchUserProfile
          setIsAuthenticated(false);
        }
        // setLoading(false) here might also be too frequent.
        // The initial setLoading(false) should happen after getInitialSession.
      }
    );
    
    // Store the subscription in the ref
    authListenerRef.current = subscription;

    // Check initial session
    async function getInitialSession() {
        // setLoading(true) is already at the top of useEffect
        try {
            const { data: { session } , error: sessionError} = await supabase.auth.getSession();
            if (sessionError) {
                console.error("Error getting initial session:", sessionError);
                // No need to set user/profile/auth state here, listener will handle if it changes
                return; // Keep loading true until listener potentially fires or we determine no session
            }

            // If there's a session, the onAuthStateChange listener will usually fire.
            // However, it's good practice to set state here too for the initial load,
            // especially if onAuthStateChange might not fire immediately or if it's a very new session.
            if (session?.user) {
                const currentAuthUser = session.user;
                const userProfileData = await fetchUserProfile(currentAuthUser);
                setUser({ ...currentAuthUser, profile: userProfileData });
                setIsAuthenticated(true);
            } else {
                // If no session, ensure states are null/false
                setUser(null);
                setProfile(null);
                setIsAuthenticated(false);
            }
        } catch (e) {
            console.error("Exception in getInitialSession:", e);
            setUser(null);
            setProfile(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false); // Crucial: set loading to false after initial check completes
        }
    }
    getInitialSession();


    // Cleanup function
    return () => {
      if (authListenerRef.current) {
        authListenerRef.current.unsubscribe();
      }
    };
  }, []); // Empty dependency array: run once on mount, cleanup on unmount

  const value = {
    user,
    profile,
    isAuthenticated,
    loading,
    signUp: async (email, password, userData) => {
      const { data, error } = await auth.signUp(email, password, userData);
      if (error) throw error;
      return data;
    },
    signIn: async (email, password) => {
      const { data, error } = await auth.signIn(email, password);
      if (error) throw error;
      return data;
    },
    signInWithGoogle: async () => {
      const { data, error } = await auth.signInWithGoogle();
      if (error) throw error;
      return data;
    },
    signOut: async () => {
        // setLoading(true); // Optional: set loading true during sign out
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Sign out error", error);
            // setLoading(false); // Reset loading if error
        }
        // onAuthStateChange listener will handle state updates (setUser, setProfile, setIsAuthenticated, setLoading)
    },
    updateProfile: async (profileDataToUpdate) => {
        if (!user) throw new Error("No user logged in.");
        const { id: _id, ...updateData } = profileDataToUpdate; // FIX: Renamed id to _id

        // setLoading(true); // Optional: set loading true
        const { data: updatedProfileData, error } = await supabase
            .from('profiles')
            .update(updateData)
            .eq('id', user.id)
            .select()
            .single();
        // setLoading(false); // Reset loading

        if (error) {
            console.error("Error updating profile in DB:", error);
            throw error;
        }
        
        setProfile(updatedProfileData);
        setUser(prevUser => ({ ...prevUser, profile: updatedProfileData }));
        return updatedProfileData;
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// FIX: Added eslint-disable-next-line to address the react-refresh/only-export-components warning
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};