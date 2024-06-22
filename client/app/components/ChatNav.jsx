import React from "react";
import { User } from "@nextui-org/react";
import { useState } from "react";
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
import {space_grotesk, inter} from "../fonts";
import { useAuth } from "../utils/useAuth";

export default function AuthNavbar() {
  
  const {
    isSignedIn,
    profilePicture,
    userName,
    login,
    logout
  } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const menuItems = [
    {name: "Home", href: '/'},
    {name: "Dashboard", href: '/dashboard'},
    {name: "Nearby Hospitals", href: '/maps'},
    {name: "Log Out"},
  ];

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-black text-white h-[10vh]">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <h1 className={`${space_grotesk.className} font-bold text-3xl `}>
                Vital<span className="gradient-text">AI</span>
            </h1>
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
                  className="sm:flex hidden"
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
                <Link
                    color={item.name === 'Log Out' ? 'danger' : 'foreground'}
                    className="w-full"
                    href={item.href}
                    size="lg"
                >
                    {item.name}
                </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
}
