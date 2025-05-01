"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { logoutAction } from "@/lib/actions/logout.action";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { LogOut } from "lucide-react";
import React from "react";

export function UiHeader() {
  return (
    <header>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem onClick={logoutAction}>
            <LogOut />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
