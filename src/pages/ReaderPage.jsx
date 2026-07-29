import {
    Box,
    Button,
    Typography
} from "@mui/material";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    getAdjacentChapter,
    getChapter
} from "../api/chapterApi";

import {
    useEffect,
    useState
} from "react";

export default function ReaderPage() {

    const { novelId, chapterId } = useParams();

    const navigate = useNavigate();

    const [chapter, setChapter] = useState();

    const [prev, setPrev] = useState(null);

    const [next, setNext] = useState(null);

    useEffect(() => {

        load();

    }, [chapterId]);

    async function load() {

        const data = await getChapter(chapterId);

        setChapter(data);

        const p = await getAdjacentChapter(
            novelId,
            data.chapter_number,
            "prev"
        );

        const n = await getAdjacentChapter(
            novelId,
            data.chapter_number,
            "next"
        );

        setPrev(p);

        setNext(n);

    }

    if (!chapter) return null;

    return (

        <Box
            maxWidth={900}
            mx="auto"
            p={4}
        >

            <Typography
                variant="h4"
                gutterBottom
            >
                Chương {chapter.chapter_number}
            </Typography>

            <Typography
                sx={{
                    whiteSpace: "pre-wrap",
                    lineHeight: 2,
                    fontSize: 18
                }}
            >
                {chapter.content}
            </Typography>

            <Box
                mt={5}
                display="flex"
                justifyContent="space-between"
            >

                <Button

                    disabled={!prev}

                    onClick={() =>
                        navigate(
                            `/novels/${novelId}/chapters/${prev.id}`
                        )
                    }

                >

                    ← Chương trước

                </Button>

                <Button

                    disabled={!next}

                    onClick={() =>
                        navigate(
                            `/novels/${novelId}/chapters/${next.id}`
                        )
                    }

                >

                    Chương sau →

                </Button>

            </Box>

        </Box>

    );

}