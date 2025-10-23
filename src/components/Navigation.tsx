import { Home, Search, Bell, PlusSquare, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { ProfileMenu } from "./ProfileMenu";

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function NavButton({ icon, label, active = false }: NavButtonProps) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start gap-3 px-2 py-1.5 ${
        active ? "font-semibold" : "font-normal"
      }`}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </Button>
  );
}

export function Navigation() {
  return (
    <div className="space-y-1 py-2 md:min-w-[180px]">
      <NavButton icon={<Home className="h-5 w-5" />} label="Home" active />
      <NavButton icon={<Search className="h-5 w-5" />} label="Search" />
      <NavButton icon={<Bell className="h-5 w-5" />} label="Notifications" />
      <NavButton
        icon={<MessageSquare className="h-5 w-5" />}
        label="Messages"
      />
      <NavButton icon={<PlusSquare className="h-5 w-5" />} label="Create" />
      <div className="px-2 py-1.5">
        <ProfileMenu />
      </div>
    </div>
  );
}
