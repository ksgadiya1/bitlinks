"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBar({ onSearch }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handle keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsExpanded(true);
        setTimeout(() => {
          document.getElementById("search-input")?.focus();
        }, 100);
      }
      // Escape to close
      if (e.key === "Escape") {
        setIsExpanded(false);
        setSearchQuery("");
        onSearch?.("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSearch]);

  const handleSearch = useCallback(
    (value) => {
      setSearchQuery(value);
      onSearch?.(value);
    },
    [onSearch]
  );

  const handleClear = () => {
    setSearchQuery("");
    onSearch?.("");
    document.getElementById("search-input")?.focus();
  };

  return (
    <div className="relative flex items-center">
      {/* Desktop: Always show input */}
      <div className="hidden md:flex items-center relative">
        <input
          id="search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search news... (Ctrl+K)"
          className="w-72 px-4 py-2.5 pr-10 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all shadow-minimal hover:shadow-premium"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Clear search"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        {!searchQuery && (
          <svg
            className="absolute right-3 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        )}
      </div>

      {/* Mobile: Icon that expands to input */}
      <div className="md:hidden flex items-center">
        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 shadow-minimal bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50"
            aria-label="Search"
          >
            <svg
              className="w-5 h-5 text-gray-700 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        ) : (
          <div className="fixed inset-0 bg-black/20 dark:bg-black/40 z-50 flex items-start justify-center pt-20 px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 animate-fadeIn">
              <div className="flex items-center gap-2">
                <input
                  id="search-input-mobile"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search news..."
                  autoFocus
                  className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-100"
                />
                <button
                  onClick={() => {
                    setIsExpanded(false);
                    setSearchQuery("");
                    onSearch?.("");
                  }}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {searchQuery && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Searching for "{searchQuery}"...
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
