"use server"
import { createClient } from "../utils/supabase/server";

export async function signIn(email: string, password: string) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email, 
        password
    });

    if (error) {
        return { error: error.message };
    }

    return { data };
}

export async function signUp(email: string, password: string, fullName: string, role: string) {
    const supabase = await createClient();
    console.log(email, password,fullName,role)
    if (!email || !password || !fullName || !role) {
        return { error: "All fields are required" };
    }
    const { data, error } = await supabase.auth.signUp({
        email, 
        password,
        options: {
            data: {
                full_name: fullName,
                role: role,
            }
        }
    });

    if (error) {
        return { error: error.message };
    }

    return { data };
}


export async function signOut() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        return { error: error.message };
    }

    return { data: "Signed out successfully" };
}

export async function signInWithGoogle() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
    });

    if (error) {
        return { error: error.message };
    }

    return { data };
}

export async function signInWithGitHub() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
    });

    if (error) {
        return { error: error.message };
    }

    return { data };
}