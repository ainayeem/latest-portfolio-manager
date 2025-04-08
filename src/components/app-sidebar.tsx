"use client";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { logoutFromCookie } from "@/services/auth";
import { Award, Book, Edit, FilePlus, Folder, Home, LogOut, Users } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SidebarGroupComponent from "./sideBarGroupComponent";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

// menu items

const application = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
];

const project = [
  {
    title: "Create Project",
    url: "/projects/create-project",
    icon: FilePlus,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: Folder,
  },
];

const skill = [
  {
    title: "Create Skill",
    url: "/skills/create-skill",
    icon: FilePlus,
  },
  {
    title: "Skills",
    url: "/skills",
    icon: Award,
  },
];

const blog = [
  {
    title: "Create Blog",
    url: "/blogs/create-blog",
    icon: Edit,
  },
  {
    title: "Blogs",
    url: "/blogs",
    icon: Book,
  },
];

const contact = [
  {
    title: "Contacts",
    url: "/contacts",
    icon: Users,
  },
];

export function AppSidebar({ user }: { user: { email: string; exp: number; iat: number } }) {
  const router = useRouter();
  const pathName = usePathname();

  const handleLogout = async () => {
    await logoutFromCookie();
    router.push("/login");
  };

  return (
    <Sidebar className="">
      <SidebarHeader className="">
        <Link href="/">
          <div className="flex gap-2">
            {/* <Image src={logo} width={40} height={40} alt="Logo" /> */}
            <div className="leading-[0.8] text-sm">
              <h2 className="text-base">Portfolio Manager</h2>
            </div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="">
        <SidebarGroupComponent label="Application" items={application} pathName={pathName} />
        <SidebarGroupComponent label="Project" items={project} pathName={pathName} />
        <SidebarGroupComponent label="Skill" items={skill} pathName={pathName} />
        <SidebarGroupComponent label="Blog" items={blog} pathName={pathName} />
        <SidebarGroupComponent label="Contact" items={contact} pathName={pathName} />
      </SidebarContent>
      <SidebarFooter className="border-t p-3">
        {/* user info */}
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
            <AvatarFallback>ADMIN</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            {/* <p className="font-medium"></p> */}
            <p className="font-medium">{user?.email}</p>
          </div>
        </div>

        {/* actions */}
        <div className="mt-3 flex justify-between">
          {/* theme toggle */}

          {/* settings */}
          {/* <div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
              <Settings className="w-5 h-5" />
            </Button>
          </div> */}

          {/* logout */}
          <div className="flex-1 ">
            <Button onClick={handleLogout} className="flex items-center gap-2 w-full cursor-pointer">
              <LogOut />
              Log Out
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
