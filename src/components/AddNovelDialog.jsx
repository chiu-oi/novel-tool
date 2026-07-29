import { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";

export default function AddNovelDialog({
    open,
    onClose,
    onSave
}) {

    const [title, setTitle] = useState("");

    const handleSave = async () => {

        if (!title.trim()) {
            alert("Vui lòng nhập tên truyện");
            return;
        }

        try {

            await onSave(title);

            setTitle("");

            onClose();

        } catch (error) {

            console.error(error);

            alert(error.message);

        }

    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                Thêm truyện
            </DialogTitle>

            <DialogContent>

                <TextField
                    autoFocus
                    margin="dense"
                    fullWidth
                    label="Tên truyện"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>
                    Hủy
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSave}
                >
                    Lưu
                </Button>

            </DialogActions>

        </Dialog>
    );
}