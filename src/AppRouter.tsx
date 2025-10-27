import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import PostDetail from "./pages/PostDetail";
import WIP from "./pages/WIP";
import ProjectDelivery from "./pages/ProjectDelivery";
import Information from "./pages/Information";

export function AppRouter() {
  return (
    <BrowserRouter basename="/devum">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/info" element={<Information />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
        <Route path="/deliver/:postId" element={<ProjectDelivery />} />

        <Route path="*" element={<WIP />} />
      </Routes>
    </BrowserRouter>
  );
}
