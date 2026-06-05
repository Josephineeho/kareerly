
"use server"
import { createClient } from "@/utils/supabase/server";


export async function cvUpload(file: File, path: string){
    const supabase = await createClient();

    const {data, error} = await supabase.storage.from("cv_storage").upload(path, file, {upsert: true});
    if(error){
        // console.log(data)
        return {error: error.message, data}
    }else {
        const {data : {publicUrl}} =  supabase.storage.from("cv_storage").getPublicUrl(data.path);
        if(!publicUrl){
            return {data: { }, error: "Failed to get url"}
        }else{
            const { data: {user} } = await supabase.auth.getUser();
            console.log(user)
            const {data, error} = await supabase.from("seekers").update({resume_url: publicUrl}).eq("id", user?.id);
            if (error){
                console.log(error)
                return {data: {}, error: "Failed to create entry in database"}
            }else{
                return {data: "success"}
            }
        }
    }
    
}