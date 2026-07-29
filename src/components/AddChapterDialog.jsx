import { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField
} from "@mui/material";

export default function AddChapterDialog({
    open,
    nextChapter,
    onClose,
    onSave
}) {

    const [chapterNumber, setChapterNumber] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {

        if (open) {
            setChapterNumber(nextChapter);
        }

    }, [open, nextChapter]);

    const handleSave = async () => {

        if (!content.trim()) {
            alert("Vui lòng nhập nội dung");
            return;
        }

        try {

            await onSave({
                chapter_number: Number(chapterNumber),
                content
            });

            setContent("");

            onClose();

        } catch (error) {

            alert(error.message);

        }

    };

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>

                Thêm chương

            </DialogTitle>

            <DialogContent>

                <Stack spacing={2} sx={{ mt: 1 }}>

                    <TextField
                        label="Số chương"
                        type="number"
                        value={chapterNumber}
                        onChange={(e) => setChapterNumber(e.target.value)}
                    />

                    <TextField
                        id="content"
                        label="Nội dung"
                        multiline
                        rows={18}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                </Stack>
<Button id="paste-content" onClick={async () => {
    const text = await navigator.clipboard.readText();
    setContent(text);
}}>
    Dán nội dung
</Button>
            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>
                    Hủy
                </Button>

                <Button
                id="save"
                    variant="contained"
                    onClick={handleSave}
                >
                    Lưu
                </Button>

            </DialogActions>

        </Dialog>

    );

}