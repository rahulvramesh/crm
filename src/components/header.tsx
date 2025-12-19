"use client";

import { Bell, Mail, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      {/* Title and Search */}
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-semibold">{title}</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search ..."
            className="w-64 pl-10 bg-secondary border-0 h-10"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
          <span className="text-lg">+</span>
          Export Report
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Mail className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-border">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
            AL
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-medium">Audrey Lay</p>
            <p className="text-xs text-muted-foreground">example@gmail.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
