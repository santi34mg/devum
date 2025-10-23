import { Header } from "./components/Header";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-background">
      <Header />
      <main className="w-full">
        <Home />
      </main>
    </div>
  );
}
