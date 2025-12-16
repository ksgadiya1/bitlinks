import FullNewsCard from "../full_news_card";
import pool from "@/lib/db";
import { notFound } from "next/navigation";

export const revalidate = 600;

// DB helper (NO notFound here)
async function getPost(slug) {
  try {
    const res = await pool.query("SELECT * FROM news WHERE slug = $1", [slug]);
    return res.rows[0] || null;
  } catch (e) {
    console.error("DB error:", e);
    return null;
  }
}

// ✅ SAFE metadata (no notFound)
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const res = await pool.query(
    "SELECT title, description, image FROM news WHERE slug = $1",
    [slug]
  );

  const item = res.rows[0];

  if (!item) {
    return { title: "News not found" };
  }

  return {
    title: item.title,
    description: item.description,
    openGraph: {
      title: item.title,
      description: item.description,
      url: `https://bitlinks.in/news/${slug}`,
      siteName: "BitLinks",
      images: [{ url: item.image, width: 1200, height: 630 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.description,
      images: [item.image],
    },
  };
}

// ✅ notFound ONLY here
export default async function NewsPage({ params }) {
  const { slug } = await params;

  const item = await getPost(slug);
  if (!item) notFound();

  return (
    <FullNewsCard
      title={item.title}
      desc={item.description}
      image={item.image}
      source_url={item.source_url}
      slug={item.slug}
      cretaed_at={item.created_at}
    />
  );
}
