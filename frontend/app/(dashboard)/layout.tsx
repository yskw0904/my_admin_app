import { cookies } from "next/headers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
// Cookieが存在しない場合は 'true'（開いた状態）をデフォルトにする
  const sidebarState = cookieStore.get("sidebar_state")?.value;
  const defaultOpen = sidebarState === "false" ? false : true;

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="flex-1 flex flex-col min-h-screen bg-gray-100">
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 bg-white backdrop-blur-sm sticky top-0 z-10">
          <SidebarTrigger />
        </header>
        <div className="flex-1 p-4 md:p-6">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
