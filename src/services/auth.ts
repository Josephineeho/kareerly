"use server"
import { createClient } from "../utils/supabase/server";
import { SignUpProps } from "../types"; 
export async function login(email: string, password: string) {
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

export async function signUp() {
    const supabase = await createClient();
    console.log(email, password, full_name, role, company_name, industry);
    if (!email || !password || !full_name || !role) {
        return { error: "All fields are required" };
    }

    const { data, error } = await supabase.auth.signUp({
        email, 
        password,
        options: {
            data: {
                full_name: full_name,
                role: role,
                company: company_name,
                industry: industry
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