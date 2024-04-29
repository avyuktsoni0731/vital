"use client";
import React from "react";
import { User } from "@nextui-org/react";
import { AcmeLogo } from "./icons/AcmeIcon";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
// import DarkLightSwitch from "./DarkLightSwitch";
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

export default function AuthNavbar() {
  const session = useSession();

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (session.status === "unauthenticated") {
      setIsSignedIn(false);
    }
    if (session.status === "authenticated") {
      setIsSignedIn(true);
      const profilePicture = session.data.user.image;
      const userName = session.data.user.name;
      const emailId = session.data.user.email;
      setProfilePicture(profilePicture);
      setUserName(userName);

      fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ googleUserId: emailId }),
      });
    }
  }, [session.status]);

  const login = async () => {
    signIn("google");
  };
  const logout = async () => {
    signOut("google");
  };

  const menuItems = [
    "Profile",
    "Dashboard",
    "My Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <AcmeLogo />
            <p className="font-bold text-inherit">ACME</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Customers
            </Link>
          </NavbarItem>
          {/* <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Customers
            </Link>
          </NavbarItem> */}
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
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
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
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
            <NavbarMenuItem key={`${item}-${index}`}>
              {item === "Log Out" ? (
                <Link color="danger" href="#" size="lg" onClick={logout}>
                  {item}
                </Link>
              ) : (
                <Link
                  color={index === 2 ? "primary" : "foreground"}
                  className="w-full"
                  href="#"
                  size="lg"
                >
                  {item}
                </Link>
              )}
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      {/* <DarkLightSwitch /> */}
    </>
  );
}
