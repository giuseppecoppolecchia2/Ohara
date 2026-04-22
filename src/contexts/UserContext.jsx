
import { createContext, useEffect, useState } from "react";
import { supabase } from "../database/supabase";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const download_avatar = async (avatar_url) => {
      const {data} = await supabase.storage.from("avatars").download(avatar_url);
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
  }

  const getUser = async () => {
    const {data: {session}, error } = await supabase.auth.getSession();
    if (session) {
        const {user} = session;
        setUser(()=> user ?? null);
        const {data: profile} = await supabase.from("profiles").select().eq("id", user.id).single();
        setProfile(profile ?? null);
    }
  };

    useEffect(()=>{
        if(profile?.avatar_url) download_avatar(profile.avatar_url);
    },[profile]);

    useEffect(() => {
        getUser();

    }, []);


    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setProfile(null);
    }

    const signUp = async (newUser) => {
        await supabase.auth.signUp(newUser);
        await getUser();
    }

    const login = async (loggedUser) =>{
        await supabase.auth.signInWithPassword(loggedUser);
        await getUser();
    }

    const updateProfile = async (newProfile) => {
        const {data, error} = await supabase.from("profiles").update(newProfile).eq("id", user.id).select().single();
        await getUser();
    }

    return (
        <UserContext.Provider value={{user, profile, signOut, signUp, login, updateProfile, getUser, avatarUrl}}>
            {children}
        </UserContext.Provider>
    )
    }