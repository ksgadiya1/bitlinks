"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";

export default function NewsCard(props) {
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
  // Helper to trim description to 30 words
  const getShortDesc = (desc) => {
    if (!desc) return "";
    const words = desc.split(/\s+/);
    if (words.length <= 30) return desc;
    return words.slice(0, 35).join(" ") + " .....";
  };

  return (
    <div className=" flex items-center justify-center bg-white p-4">
      <div className="bg-green-200 rounded-3xl p-6 w-full max-w-4xl border-4 border-black shadow-lg  text-black">
        <Link href={props.slug}>
          <h2 className="text-3xl mb-4 font-bold">{props.title}</h2>
        </Link>
        <p className="text-lg mb-6">{getShortDesc(props.desc)}</p>
        <div className="flex items-center justify-between">
          <Link
            href={props.slug}
            className="bg-pink-200 px-6 py-2 rounded-xl border-2 border-black hover:bg-pink-300 transition inline-block text-center"
          >
            Read more
          </Link>

          <div className="flex space-x-3">
            <Link
              href={`https://wa.me/?text=https://bitlinks.in/${props.slug}`}
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
