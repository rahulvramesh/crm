"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  Users,
  Sparkles,
} from "lucide-react";

const menuItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/companies", label: "Companies", icon: Building2 },
  { href: "/contacts", label: "Contacts", icon: Users },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 bg-sidebar flex flex-col border-r border-sidebar-border">
      {/* Logo */}
      <div className="p-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-semibold text-sidebar-foreground">
          CRM Pro
        </span>
      </div>

      {/* Menu */}
      <div className="flex-1 px-3 py-4">
        <p className="px-3 mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Menu
        </p>
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-foreground"
                      : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* CTA Card */}
      <div className="p-3">
        <div className="rounded-xl bg-gradient-to-br from-primary to-orange-600 p-4">
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm font-semibold text-white mb-1">
            Try CRM Pro AI
          </p>
          <p className="text-xs text-white/80 mb-3">
            Make smarter, data-driven decisions with AI insights.
          </p>
          <button className="w-full bg-white text-primary text-sm font-medium py-2 px-4 rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Get An Analysis
          </button>
        </div>
      </div>
    </nav>
  );
}
