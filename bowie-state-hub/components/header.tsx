"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, Settings, BookOpen, Calendar, Users, BookMarked, ShoppingBag } from "lucide-react"

export function Header() {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header className="bg-black text-yellow-400 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          BSU Student Hub
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/events" className="hover:text-white">
                Events
              </Link>
            </li>
            <li>
              <Link href="/clubs" className="hover:text-white">
                Clubs
              </Link>
            </li>
            <li>
              <Link href="/study-groups" className="hover:text-white">
                Study Groups
              </Link>
            </li>
            <li>
              <Link href="/resources" className="hover:text-white">
                Resources
              </Link>
            </li>
            <li>
              <Link href="/marketplace" className="hover:text-white">
                Marketplace
              </Link>
            </li>

            {isAuthenticated ? (
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full bg-yellow-400 text-black hover:bg-yellow-300"
                    >
                      <span className="sr-only">Open user menu</span>
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/events" className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>My Events</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/clubs" className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        <span>My Clubs</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/study-groups" className="flex items-center">
                        <BookOpen className="mr-2 h-4 w-4" />
                        <span>My Study Groups</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/resources" className="flex items-center">
                        <BookMarked className="mr-2 h-4 w-4" />
                        <span>My Resources</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/marketplace" className="flex items-center">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        <span>My Listings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-500 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ) : (
              <li>
                <Link href="/login" className="hover:text-white">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

