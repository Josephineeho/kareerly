"use server"
import { createClient } from "../utils/supabase/server";
import { SignUpEmployer, SignUpJobSeeker } from "../types";

export async function login(email: string, password: string) {
    const supabase = await createClient();
    if (!email || !password) {
        return { data: {}, error: "All fields are required" };
    }
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        return { error: error.message };
    }

    return { data };
}

export async function signUpJobSeeker({ full_name, email, password, role }: SignUpJobSeeker) {
    const supabase = await createClient();
    if (!email || !password || !full_name || !role) {
        return { data: {}, error: "All fields are required" };
    } else {
        const { data, error } = await supabase.auth.signUp({
            email, password,
            options: { data: { full_name: full_name, role: role } }
        })
        if (error) {
            return { error: error.message, data }
        } else return { data, error }
    }
}


export async function signUpEmployer({ email, password, full_name, role, company_name, industry }: SignUpEmployer) {
    const supabase = await createClient();
    console.log(email, password, full_name, role, company_name, industry);
    if (!email || !password || !full_name || !role) {
        return { data: {}, error: "All fields are required", };
    } else {

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
            return { data, error: error.message };
        }

        return { data, error };
    }
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