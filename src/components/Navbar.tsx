"use client";

import { useState } from "react";
import { Link } from "@heroui/link";
import { usePathname } from "next/navigation";
import {
    Navbar as HeroNavbar,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenuItem,
    NavbarMenu,
    NavbarContent,
    NavbarItem,
} from "@heroui/navbar";
import Image from "next/image";

import Logo from "../assets/images/meme-site-logo.png";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <HeroNavbar className="mb-6" onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
                <NavbarBrand>
                    <Link className="font-bold text-inherit flex flex-row gap-x-2" href="/">
                        <Image alt="logo" height={0} src={Logo} width={34} />
                        <span className="text-xl">House Of Memes</span>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive={pathname === "/table"}>
                    <Link
                        className="font-medium"
                        color={pathname === "/table" ? "primary" : "foreground"}
                        href="/table"
                    >
                        Table View
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={pathname === "/list"}>
                    <Link className="font-medium" color={pathname === "/list" ? "primary" : "foreground"} href="/list">
                        List View
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                <NavbarMenuItem>
                    <Link
                        className="w-full"
                        color={pathname === "/table" ? "primary" : "foreground"}
                        href="/table"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Table View
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link
                        className="w-full"
                        color={pathname === "/list" ? "primary" : "foreground"}
                        href="/list"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        List View
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </HeroNavbar>
    );
}
