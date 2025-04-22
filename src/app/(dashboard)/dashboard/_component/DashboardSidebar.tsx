"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getAvatarName } from "@/lib/getAvatarName";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FileIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import CreateProject from "./CreateProject";
import Axios from "@/lib/Axios";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const session = useSession();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await Axios.get("/api/recent-project-update");
      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Sidebar className="bg-background border-r border-border shadow-sm">
      <SidebarHeader className="px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
          <SidebarTrigger className="lg:hidden" />
        </div>
        <p className="text-sm text-muted-foreground">Your personal workspace</p>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <CreateProject />

        <div className="px-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <Link
                href="/dashboard"
                className={cn(
                  "w-full block px-3 py-1.5 rounded-md hover:bg-muted transition",
                  pathname === "/dashboard" && "bg-muted"
                )}
              >
                Dashboard
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Recent Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.length === 0 && !isLoading && (
                <p className="text-sm px-3 text-muted-foreground">No recent projects.</p>
              )}
              {data.map((item: any) => (
                <SidebarMenuItem key={item._id}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={`${process.env.NEXT_PUBLIC_BASE_URL}/editor/${item?._id}?file=index.html`}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-muted transition text-sm"
                    >
                      <FileIcon className="w-4 h-4" />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md hover:shadow cursor-pointer transition">
              <Avatar className="w-8 h-8">
                <AvatarImage src={session.data?.user?.image || ""} />
                <AvatarFallback className="text-xs">
                  {getAvatarName(session.data?.user?.name || "")}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-muted-foreground">
                {session.data?.user?.name}
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            <div className="text-center py-2">
              <p className="text-sm font-medium">{session.data?.user?.name}</p>
            </div>
            <div className="border-t border-border my-2" />
            <Button
              variant="destructive"
              className="w-full cursor-pointer"
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </PopoverContent>
        </Popover>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
