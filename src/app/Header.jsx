"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const nav = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Privacy", href: "/privacy" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white/60 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/60 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/favicon.ico"
                alt="Logo"
                width={44}
                height={44}
                className="rounded-full shadow-sm"
              />
              <div className="hidden sm:block">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  BitLinks
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Latest Crypto News
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-6 items-center">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2 py-1 rounded-md text-sm font-medium transition-colors duration-150 ${
                    active
                      ? "text-indigo-600 bg-indigo-50 dark:bg-gray-800 dark:text-indigo-400"
                      : "text-gray-700 hover:text-indigo-600 dark:text-gray-300"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-expanded={open}
              aria-label="Toggle menu"
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      <div className={`md:hidden ${open ? "block" : "hidden"}`}>
        <div className="px-4 pt-2 pb-4 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ${
                  active
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-700 hover:bg-gray-50 dark:text-gray-300"
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
