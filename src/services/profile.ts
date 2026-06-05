"use server"
import { createClient } from "@/utils/supabase/server";

export async function getSeekerProfile() {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { data: null, error: "Not authenticated" };
    }

    const { data, error } = await supabase
        .from("seekers")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error) {
        return { data: null, error: error.message };
    }

    return { data, error: null };
}
