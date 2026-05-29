import { createClient } from "@/utils/supabase/server";


export async function cvUpload(file: File, path: string){
    const supabase = await createClient();

    const {data, error} = await supabase.storage.from("cv_storage").upload(path, file, {upsert: true});
    if(error){
        return {error: error.message, data}
    }

    

    
}