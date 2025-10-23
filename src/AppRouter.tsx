import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import PostDetail from "./pages/PostDetail";
import WIP from "./pages/WIP";

export function AppRouter() {
  return (
    <BrowserRouter basename="/devum">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
        <Route path="/messages" element={<WIP />} />
        <Route path="/search" element={<WIP />} />
        <Route path="/create" element={<WIP />} />
        <Route path="/profile" element={<WIP />} />
        <Route path="/settings" element={<WIP />} />
        <Route path="/notifications" element={<WIP />} />
        <Route path="/login" element={<WIP />} />
      </Routes>
    </BrowserRouter>
  );
}
