"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuList = [
    { name: "Katalog Produk", url: "/products/1" },
  ];

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="top-0 right-0 left-0 absolute flex justify-between items-center py-4 container">
      <Link href="/">
        <h1 className="text-lg font-bold">Web Seller</h1>
      </Link>
      <Button
        variant="default"
        className="!p-0 md:invisible"
        onClick={handleMenuClick}
      >
        {/* <FiMenu size={20} /> */}
      </Button>
      <ul
        className={`z-50 max-md:top-0 max-md:right-0 max-md:fixed flex max-md:flex-col md:items-center gap-6 max-md:bg-white max-md:px-8 max-md:py-12 max-md:h-screen max-md:${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out md:flex`}
      >
        {menuList.map((menu) => (
          <li
            key={menu.name}
            className="font-medium hover:text-primary transition-colors"
          >
            <Link href={menu.url}>{menu.name}</Link>
          </li>
        ))}
        <li>
          <Link href="/login">
            <Button variant="default">Login</Button>
          </Link>
        </li>
      </ul>
      <div
        className={`top-0 right-0 bottom-0 left-0 z-10 fixed bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleMenuClick}
      />
    </nav>
  );
}
