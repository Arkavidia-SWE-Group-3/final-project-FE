import Link from "next/link";
import { Briefcase, Users, MessageSquare, Bell, LogIn } from "lucide-react";
import Sidebar from "./sidebar";
import Profile from "./profile-dropdown";
import { verifySession } from "@/lib/session";

export default async function Navbar() {
  const { isAuthenticated, user } = await verifySession();

  return (
    <header className="border-b sticky top-0 z-10 bg-white">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <Link href="/" className="text-2xl font-bold text-primary">
            ArkaNet
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-1">
          <NavItem icon={<Briefcase />} label="Jobs" href="/jobs" />
          <NavItem icon={<Users />} label="People" href="/people" />

          {isAuthenticated && (
            <>
              <NavItem
                icon={<MessageSquare />}
                label="Messaging"
                href="/chats"
              />
              <NavItem
                icon={<Bell />}
                label="Notifications"
                href="/notifications"
              />
              <Profile />{" "}
            </>
          )}
          {!isAuthenticated && (
            <Link
              href={"/seeker/login"}
              className="bg-primary px-4 py-2 text-white rounded-md flex items-center gap-2"
            >
              <LogIn className="h-5 w-5" />
              Login
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Sidebar isAuthenticated={isAuthenticated} user={user} />
        </div>
      </div>
    </header>
  );
}

function NavItem({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
}) {
  return (
    <Link href={href || "#"}>
      <div className="flex flex-col items-center px-3 py-1 hover:bg-muted rounded-md cursor-pointer">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
    </Link>
  );
}
