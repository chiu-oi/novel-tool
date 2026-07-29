import { useEffect, useState } from "react";

import {
    Button,
    List,
    ListItem,
    ListItemText,
    Box,
    Typography,
      ListItemButton
} from "@mui/material";


import { useNavigate, useParams } from "react-router-dom";

import {
    addChapter,
    getChapters
} from "../api/chapterApi";

import AddChapterDialog from "../components/AddChapterDialog";

export default function ChapterList() {

    const { id } = useParams();

    const [chapters, setChapters] = useState([]);

    const [open, setOpen] = useState(false);

    async function loadData() {

        try {

            const data = await getChapters(id);

            setChapters(data);

        } catch (error) {

            console.error(error);

            alert(error.message);

        }

    }

    useEffect(() => {

        loadData();

    }, []);

    async function handleSave(chapter) {

        await addChapter({

            novel_id: Number(id),

            ...chapter

        });

        await loadData();

    }

    const navigate = useNavigate();

    const nextChapter =
    chapters.length === 0
        ? 1
        : Number(chapters[chapters.length - 1].chapter_number) + 1;

    return (

        <Box p={3}>

             <Typography
                variant="h4"
                mb={3}
            >
                Danh sách chương
            </Typography>

            <Button
                id="add-chap"
                variant="contained"

                onClick={() => setOpen(true)}

            >

                Thêm chương

            </Button>

            <List>

                {

                    chapters.map(chapter => (

<ListItem
    key={chapter.id}
    disablePadding
>
    <ListItemButton
        onClick={() =>
            navigate(`/novels/${id}/chapters/${chapter.id}`)
        }
    >
        <ListItemText
            primary={`Chương ${chapter.chapter_number}`}
        />
    </ListItemButton>
</ListItem>

                    ))

                }

            </List>

        <AddChapterDialog
            open={open}
            nextChapter={nextChapter}
            onClose={() => setOpen(false)}
            onSave={handleSave}
        />

        </Box>

    );

}