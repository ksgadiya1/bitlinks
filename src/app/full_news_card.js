"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";

// Full page component
export default async function FullNewsCard(newsItem) {
  let shareUrl = "https://bitlinks.in/" + newsItem.slug;
  const handleNativeShare = useCallback(async () => {
    const shareData = {
      title: newsItem.title,
      text: newsItem.title,
      url: "https://bitlinks.in/" + newsItem.slug,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      // fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(`${title}\n${desc}\n${shareUrl}`);
        alert("Link copied to clipboard! Paste it anywhere to share.");
      } catch {
        alert("Please copy this link to share:\n" + shareUrl);
      }
    }
  }, []);
  return (
    <div className="flex items-center justify-center bg-white p-4">
      <div className="bg-green-200 rounded-3xl p-6 w-full max-w-3xl border-4 border-black shadow-lg text-black">
        <h1 className="text-3xl mb-4 font-bold">{newsItem.title}</h1>
        <img
          className="w-full h-64 object-cover rounded-lg mb-4"
          src={newsItem.image}
          alt={newsItem.title}
          width={800}
          height={450}
          priority={true}
        />
        <p className="text-lg mb-6">{newsItem.desc}</p>
        <div className="flex items-center justify-between">
          <Link href={newsItem.source_url} target="_blank">
            <button className="bg-pink-200 px-6 py-2 rounded-xl border-2 border-black hover:bg-pink-300 transition">
              Read Full News
            </button>
          </Link>
          <div className="flex space-x-3">
            <Link
              href={`https://wa.me/?text=https://bitlinks.in/${newsItem.slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-pink-200 px-6 py-2 rounded-xl border-2 border-black hover:bg-pink-300 transition">
                <Image src="/whatsapp.svg" alt="Share" width={24} height={24} />
              </button>
            </Link>

            <button
              onClick={handleNativeShare}
              className="bg-pink-200 px-6 py-2 rounded-xl border-2 border-black hover:bg-pink-300 transition"
            >
              <Image src="/share.svg" alt="Share" width={24} height={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
