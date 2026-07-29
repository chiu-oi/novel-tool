import { supabase } from "./supabase";

export async function getNovels() {

    const { data, error } = await supabase
        .from("novels")
        .select("*")
        .order("created_at", {
            ascending: false
        });

    if (error) throw error;

    return data;
}

export async function addNovel(title) {

    const { data, error } = await supabase
        .from("novels")
        .insert({ title })
        .select()
        .single();

    if (error) throw error;

    return data;
}