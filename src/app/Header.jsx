"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "./components/SearchBar";
import DarkModeToggle from "./components/DarkModeToggle";
import { HyperText } from "@/components/ui/hyper-text";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

export default function Header({ onSearch }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const nav = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Privacy", href: "/privacy" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 glass-effect shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/favicon.ico"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full transition-transform duration-300 group-hover:scale-110"
              />
              <div className="hidden sm:block">
                <HyperText
                  as="span"
                  className="font-bold text-gray-900 dark:text-gray-100 text-lg tracking-tight block"
                  text="BitLinks"
                />
                <div className="text-[10px] uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 leading-none">
                  <AnimatedShinyText>
                    Crypto News
                  </AnimatedShinyText>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Nav + Tools */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-1">
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${active
                        ? "text-blue-600 bg-blue-50/50 dark:bg-blue-900/20 dark:text-blue-400"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800"
                      }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-4">
              <SearchBar onSearch={onSearch} />
              <DarkModeToggle />
            </div>
          </div>

          {/* Mobile: Search + Dark Mode + Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <SearchBar onSearch={onSearch} />
            <DarkModeToggle />
            <button
              onClick={() => setOpen((s) => !s)}
              aria-expanded={open}
              aria-label="Toggle menu"
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {open ? (
                <svg className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      <div className={`md:hidden ${open ? "block" : "hidden"}`}>
        <div className="px-4 pt-2 pb-4 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ${active
                  ? "bg-blue-50 text-blue-600 dark:bg-gray-800 dark:text-blue-400"
                  : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
