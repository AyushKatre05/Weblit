"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getAvatarName } from "@/lib/getAvatarName";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const DashboardHeader = () => {
  const session = useSession();

  return (
    <header className="h-16 bg-background border-b border-border flex items-center px-4 sticky top-0 z-40 shadow-sm">
      <div className="flex flex-col justify-center">
        <h1 className="text-lg text-muted-foreground">Welcome back 👋</h1>
      </div>

      <div className="hidden md:flex items-center gap-3 ml-auto">
        <span className="text-sm font-medium text-muted-foreground">
          Hi, {session?.data?.user?.name?.split(" ")[0] || "there"}
        </span>

        <Popover>
          <PopoverTrigger asChild>
            <Avatar className="w-10 h-10 ring-1 ring-ring ring-offset-background shadow hover:shadow-md transition cursor-pointer">
              <AvatarImage src={session.data?.user?.image as string} />
              <AvatarFallback>
                {getAvatarName(session.data?.user?.name || "")}
              </AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-52 space-y-3">
            <div className="text-sm font-medium text-center text-muted-foreground">
              {session.data?.user?.name}
            </div>
            <div className="border-t border-border" />
            <Button
              variant="destructive"
              className="w-full cursor-pointer"
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      <div className="md:hidden ml-auto">
        <SidebarTrigger />
      </div>
    </header>
  );
};

export default DashboardHeader;
