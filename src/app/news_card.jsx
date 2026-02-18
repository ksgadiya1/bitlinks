"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { formatDistanceToNow } from "date-fns";
import { MagicCard } from "@/components/ui/magic-card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { useTheme } from "next-themes";

export default function NewsCard(props) {
  const { theme } = useTheme();
  let shareUrl = "https://bitlinks.in/" + props.slug;

  const handleNativeShare = useCallback(async () => {
    const shareData = {
      title: props.title,
      text: props.desc,
      url: "https://bitlinks.in/" + props.slug,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error("Share failed:", err);
        }
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  }, [props.slug, props.title, props.desc, shareUrl]);

  // Calculate reading time (assuming 200 words per minute)
  const readingTime = props.desc
    ? Math.ceil(props.desc.split(" ").length / 200)
    : 1;

  // Format date
  const timeAgo = props.created_at
    ? formatDistanceToNow(new Date(props.created_at), { addSuffix: true })
    : "";

  return (
    <MagicCard
      className="group flex flex-col bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 min-h-[550px]"
      gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
    >
      <div className="flex flex-col h-full relative">
        {/* Clickable Area for the whole card */}
        <Link href={props.slug} className="absolute inset-0 z-10" aria-label={`Read more about ${props.title}`} />

        {/* Image Section - Large prominent image */}
        {props.image && (
          <div className="block relative w-full h-56 overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Image
              src={props.image}
              alt={props.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Content Section - Structured with clear hierarchy and luxurious padding */}
        <div className="flex flex-col flex-1 p-10 text-center">
          {/* Metadata Row - At top for context */}
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-gray-400 dark:text-gray-500 mb-6 uppercase tracking-wider">
            {timeAgo && (
              <span className="flex items-center gap-1.5">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {timeAgo}
              </span>
            )}
            <span className="flex items-center gap-1.5">
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              {readingTime} min read
            </span>
          </div>

          {/* Title - Prominent and bold with better line height */}
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-5 line-clamp-2 leading-[1.3] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {props.title}
          </h2>

          {/* Description - Secondary text with better readability */}
          <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-8 line-clamp-4 flex-1">
            {props.desc}
          </p>

          {/* Actions - Material Design style action row with better spacing */}
          <div className="flex flex-col items-center gap-6 pt-8 border-t border-gray-100 dark:border-gray-800 relative z-20">
            {/* Primary Action */}
            <ShimmerButton
              borderRadius="12px"
              className="w-full px-6 py-3 text-sm font-bold uppercase tracking-widest shadow-2xl"
              background={theme === "dark" ? "rgba(37, 99, 235, 0.2)" : "rgba(37, 99, 235, 1)"}
            >
              <span className="flex items-center gap-2">
                Read Full Story
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
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </ShimmerButton>

            {/* Action Icons */}
            <div className="flex items-center gap-4">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  props.title + " " + shareUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-50 dark:bg-gray-800/50 hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200"
                aria-label="Share on WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNativeShare();
                }}
                className="p-3 rounded-full bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200"
                aria-label="Share"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </MagicCard>
  );
}
