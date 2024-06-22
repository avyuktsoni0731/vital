"use client";
import React from "react";
import { User } from "@nextui-org/react";
import Image from "next/image";
import VitalLogo from "./icons/vital.png";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarItem,
  NavbarMenuItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Button,
} from "@nextui-org/react";
import { useAuth } from "../utils/useAuth";


export default function AuthNavbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    isSignedIn,
    profilePicture,
    userName,
    login,
    logout
  } = useAuth();


  const menuItems = [
    {name: "Home", href: '/'},
    {name: "Dashboard", href: '/dashboard'},
    {name: "Nearby Hospitals", href: '/maps'},
    {name: "Try VitalAI", href: '/chatbot'},
  ];

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-black text-white">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Image src={VitalLogo} alt="vital-logo"/>
            <p className="font-bold text-inherit text-xl">VITAL</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive>
            <Link color="foreground" href="/" className="font-normal text-sm text-white">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link color="foreground" href="/dashboard" className="font-normal text-sm text-white">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link color="foreground" href="/maps" className="font-normal text-sm text-white">
              Nearby Hospitals
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link color="foreground" href="/chatbot" className="font-semibold font-space text-sm bg-custom-gradient text-black px-4 py-2 rounded-md">
              Try VitalAI
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent as="div" justify="end">
          {!isSignedIn && (
            <Button onClick={() => login()} color="primary" variant="flat">
              Sign In
            </Button>
          )}
          {isSignedIn && (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <User
                  name={userName}
                  description="Developer"
                  avatarProps={{
                    isBordered: true,
                    color: "secondary",
                    src: profilePicture,
                  }}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{userName}</p>
                </DropdownItem>
                <DropdownItem href="/dashboard" key="dashboard">
                  Dashboard
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  onClick={logout}
                  className="text-danger"
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.name}-${index}`}>
              {item.name === "Try VitalAI" ?(
                <Link
                color="foreground"
                className="font-semibold font-space text-md bg-custom-gradient text-black px-4 py-2 rounded-md"
                href={item.href}
              >
                {item.name}
              </Link>
              ) : (
              <Link
                color="foreground"
                className="w-full"
                href={item.href}
                size="lg"
              >
                {item.name}
              </Link>
              )}
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
}
