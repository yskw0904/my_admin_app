'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function AppSidebar() {
const [mounted, setMounted] = useState(false);

  // マウント（ブラウザでの描画準備）が完了した後にだけ中身を出す
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // マウント前は何も表示しない（またはスケルトンを表示する）
    // これにより、サーバーとブラウザの「初期状態」を強制的に一致させます
    return <div className="min-h-screen bg-background" />;
  }

  const projects = [{ name: "aaa", url: "/hoge" }];
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {projects.map((project) => (
              <SidebarMenuItem key={project.name}>
                <SidebarMenuButton asChild>
                  <Link href={project.url}>
                    <Plus />
                    <span>{project.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
