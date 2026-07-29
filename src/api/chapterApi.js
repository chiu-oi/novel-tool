import { supabase } from "./supabase";

export async function getChapters(novelId) {

    const { data, error } = await supabase
        .from("chapters")
        .select("*")
        .eq("novel_id", novelId)
        .order("chapter_number");

    if (error) throw error;

    return data;
}

export async function addChapter(chapter) {

    const { error } = await supabase
        .from("chapters")
        .insert(chapter);

    if (error) throw error;
}

export async function getChapter(chapterId) {

    const { data, error } = await supabase
        .from("chapters")
        .select("*")
        .eq("id", chapterId)
        .single();

    if (error) throw error;

    return data;
}

export async function getAdjacentChapter(
    novelId,
    chapterNumber,
    direction
) {

    let query = supabase
        .from("chapters")
        .select("id, chapter_number")
        .eq("novel_id", novelId);

    if (direction === "next") {

        query = query
            .gt("chapter_number", chapterNumber)
            .order("chapter_number")
            .limit(1);

    } else {

        query = query
            .lt("chapter_number", chapterNumber)
            .order("chapter_number", {
                ascending: false
            })
            .limit(1);

    }

    const { data, error } = await query;

    if (error) throw error;

    return data[0] ?? null;
}