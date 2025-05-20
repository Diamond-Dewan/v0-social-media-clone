"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, User, Bell, Mail, Bookmark, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/notifications", label: "Notifications", icon: Bell },
    { href: "/messages", label: "Messages", icon: Mail },
    { href: "/bookmarks", label: "Bookmarks", icon: Bookmark },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="w-64 p-4 h-screen sticky top-0 flex flex-col justify-between">
      <div className="space-y-2">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold text-primary">Murmur</h1>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-full hover:bg-secondary transition-colors",
                  isActive && "font-bold",
                )}
              >
                <Icon className={cn("h-6 w-6", isActive && "text-primary")} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <Button className="w-full mt-4 rounded-full">Murmur</Button>
      </div>

      <div className="mt-auto pb-4">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  )
}
