import { Feed } from "../components/feed/Feed";
import { Navigation } from "../components/Navigation";

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-6">
          <aside className="hidden sm:block sticky top-24 h-fit">
            <Navigation />
          </aside>
          <main className="col-span-3 space-y-6">
            <Feed />
          </main>
        </div>
      </div>
    </div>
  );
}
