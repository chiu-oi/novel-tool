import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Button,
    List,
    ListItem,
    ListItemText
} from "@mui/material";

import AddNovelDialog from "../components/AddNovelDialog";

import {
    addNovel,
    getNovels
} from "../api/novelApi";

export default function NovelList() {

    const [novels, setNovels] = useState([]);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    async function loadData() {

        try {

            const data = await getNovels();

            setNovels(data);

        } catch (error) {

            console.error(error);

            alert(error.message);

        }

    }

    useEffect(() => {

        loadData();

    }, []);

    async function handleSave(title) {

        await addNovel(title);

        await loadData();

    }

    return (
        <>

            <h1>Novel Manager</h1>

            <Button
                variant="contained"
                onClick={() => setOpen(true)}
            >
                Thêm truyện
            </Button>

            <List>

                {
                    novels.map((novel)=>(

                        <ListItem

                            key={novel.id}

                            onClick={() => navigate(`/novels/${novel.id}`)}

                            sx={{
                                cursor:"pointer"
                            }}

                        >

                            <ListItemText
                                primary={novel.title}
                            />

                        </ListItem>

                    ))
                }

            </List>

            <AddNovelDialog
                open={open}
                onClose={() => setOpen(false)}
                onSave={handleSave}
            />

        </>
    );
}