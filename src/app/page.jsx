"use client";

import { useState, useEffect } from "react";
import NewsCard from "./news_card";
import LoadingSkeleton from "./components/LoadingSkeleton";
import { BlurFade } from "@/components/ui/blur-fade";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

export default function Home() {
  const [newsData, setNewsData] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch news data from API
  useEffect(() => {
    async function fetchNews() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/news");
        const result = await response.json();

        if (result.success) {
          setNewsData(result.data);
          setFilteredNews(result.data);
        } else {
          console.error("Failed to fetch news:", result.error);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNews();
  }, []);

  // Filter news based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredNews(newsData);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = newsData.filter((item) => {
      return (
        item.title?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query)
      );
    });

    setFilteredNews(filtered);
  }, [searchQuery, newsData]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 relative overflow-x-hidden">
      <ScrollProgress className="top-16" />

      {/* Background Pattern */}
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
        )}
      />

      {/* Breaking News Marquee */}
      {!isLoading && newsData.length > 0 && (
        <div className="w-full bg-blue-600/5 dark:bg-blue-400/5 border-b border-blue-100 dark:border-blue-900/30 overflow-hidden relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Marquee className="py-2 [--duration:40s]" pauseOnHover>
              {newsData.slice(0, 8).map((news) => (
                <span key={news.id} className="mx-4 text-sm font-medium text-blue-600 dark:text-blue-400">
                  BREAKING: {news.title}
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="mesh-gradient border-b border-gray-200 dark:border-gray-800 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-50">
          <div className="absolute top-[-10%] left-[20%] w-[30%] h-[50%] bg-blue-400/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[20%] w-[30%] h-[50%] bg-purple-400/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center relative z-10 flex flex-col items-center">
          <BlurFade delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-8 heading-premium tracking-tight leading-[1.1]">
              Latest Bitcoin & <span className="text-blue-600 dark:text-blue-400">Crypto</span> News
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed text-center">
              Stay ahead of the curve with the most reliable cryptocurrency updates, market analysis, and blockchain insights.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* News Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        {/* Search Results Info */}
        {searchQuery && (
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Search results for: <span className="text-blue-600">"{searchQuery}"</span>
            </h2>
            <p className="text-gray-500 mt-2">Found {filteredNews.length} articles</p>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            <LoadingSkeleton count={6} />
          </div>
        ) : (
          <>
            {/* News Cards or Empty State */}
            {filteredNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch w-full">
                {filteredNews.map((item, index) => (
                  <BlurFade key={item.id} delay={0.25 + index * 0.05} inView>
                    <NewsCard
                      title={item.title}
                      desc={item.description}
                      image={item.banner_image || item.thumbnail_image}
                      slug={item.slug}
                      created_at={item.created_at}
                    />
                  </BlurFade>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                <div className="mb-6 inline-flex p-6 rounded-full bg-white dark:bg-gray-800 shadow-xl">
                  <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">No news found</h3>
                <p className="text-gray-500 max-w-md mx-auto">We couldn't find any articles matching your current filters or search query.</p>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
