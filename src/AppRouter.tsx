import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import PostDetail from "./pages/PostDetail";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
