import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getCurrentUser } from "@/services/auth";
import { ReactNode } from "react";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar user={user} />
        <main className="flex-1 overflow-auto p-4">
          <SidebarTrigger className="" />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
