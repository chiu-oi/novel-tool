import {
    createBrowserRouter
} from "react-router-dom";

import NovelList from "./pages/NovelList";
import ChapterList from "./pages/ChapterList";
import ReaderPage from "./pages/ReaderPage";

export default createBrowserRouter([
    {
        path: "/",
        element: <NovelList />
    },
    {
        path: "/novels/:id",
        element: <ChapterList />
    },
    {
        path: "/novels/:novelId/chapters/:chapterId",
        element: <ReaderPage />
    }
]);