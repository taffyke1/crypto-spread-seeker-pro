
import { Bell, ChevronDown, CircleDollarSign, Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

type HeaderProps = {
  sidebarToggle: () => void;
};

export function Header({ sidebarToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-4 lg:px-6">
      <Button variant="outline" size="icon" className="mr-3 lg:hidden" onClick={sidebarToggle}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>

      <div className="relative hidden md:flex md:w-64 md:items-center">
        <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg pl-8 md:w-64 lg:w-80"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1 md:h-9 relative">
              <CircleDollarSign className="h-4 w-4" />
              <span className="hidden md:inline-block">BTC / USD</span>
              <span className="inline-block font-mono md:hidden">$38,245</span>
              <span className="inline-block font-mono hidden md:inline-block">$38,245.67</span>
              <span className="text-crypto-green ml-1">+2.4%</span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Select Pair</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <CircleDollarSign className="mr-2 h-4 w-4" />
              <span>BTC / USD</span>
              <span className="ml-auto text-xs text-crypto-green">+2.4%</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CircleDollarSign className="mr-2 h-4 w-4" />
              <span>ETH / USD</span>
              <span className="ml-auto text-xs text-crypto-green">+1.8%</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CircleDollarSign className="mr-2 h-4 w-4" />
              <span>SOL / USD</span>
              <span className="ml-auto text-xs text-crypto-red">-0.5%</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Search className="mr-2 h-4 w-4" />
              <span>Search Pairs</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
          <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-crypto-red"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border border-border h-8 w-8"
            >
              <span className="sr-only">User menu</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                TS
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/billing">Billing</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
