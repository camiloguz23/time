"use client";

import { Button } from "@/components/ui/button";
import { DividerWithTitle } from "@/lib/components/divider/divider-with-title";
import { logoutAction } from "@/lib/actions/logout.action";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { LogOut } from "lucide-react";
import React from "react";
import { User,Plus } from "lucide-react";
import { addHoursAction } from "@/lib/actions/table-register.action";

interface Props {
  userId: string;
}

export function UiHeader({userId}: Props) {
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  const addHours = (hours: number) => {
    addHoursAction({ userId, year, month,minutes:( hours * 60) });
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900">
      <div className=" mx-auto px-6 py-4">
        <div className="flex items-center justify-end">
          <div className="flex items-center mr-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative rounded-full flex items-center justify-center"
                >
                  <User className="h-4 w-4" /> Menu
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-zinc-900">
                <DropdownMenuLabel className="px-3 py-2 text-gray-900 dark:text-white">
                  Menu
                </DropdownMenuLabel>
                <DividerWithTitle title="Acciones Tiempo" className="mb-1" />
                <DropdownMenuItem
                  onClick={() => addHours(1)}
                  className="px-3 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
                >
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Agregar 1 hora</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => addHours(2)}
                  className="px-3 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
                >
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Agregar 2 horas</span>
                  </div>
                </DropdownMenuItem>
                <DividerWithTitle title="Cuenta" className="mb-1" />
                <DropdownMenuItem
                  onClick={logoutAction}
                  className="px-3 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
                >
                  <div className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    <span>Salir</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
