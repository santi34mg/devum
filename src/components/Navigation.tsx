import { Home, Search, Bell, PlusSquare, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { ProfileMenu } from "./ProfileMenu";
import { useNavigate, useLocation } from "react-router-dom";

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  path: string;
}

function NavButton({ icon, label, path }: NavButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.pathname === path;

  return (
    <Button
      variant="ghost"
      className={`w-full justify-start gap-3 px-2 py-1.5 ${
        active ? "font-semibold" : "font-normal"
      }`}
      onClick={() => navigate(path)}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </Button>
  );
}

export function Navigation() {
  return (
    <div className="space-y-1 py-2 md:min-w-[180px]">
      <NavButton icon={<Home className="h-5 w-5" />} label="Home" path="/" />
      <NavButton
        icon={<Search className="h-5 w-5" />}
        label="Search"
        path="/search"
      />
      <NavButton
        icon={<Bell className="h-5 w-5" />}
        label="Notifications"
        path="/notifications"
      />
      <NavButton
        icon={<MessageSquare className="h-5 w-5" />}
        label="Messages"
        path="/messages"
      />
      <NavButton
        icon={<PlusSquare className="h-5 w-5" />}
        label="Create"
        path="/create"
      />
      <div className="px-2 py-1.5">
        <ProfileMenu />
      </div>
    </div>
  );
}
