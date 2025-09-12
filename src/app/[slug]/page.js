import FullNewsCard from "../full_news_card";
import pool from "@/lib/db";
import { notFound } from "next/navigation";

export const revalidate = 600;

async function getPost(slug) {
  let res = await pool.query("SELECT * FROM news WHERE slug = $1", [slug]);
  console.log(res.rows[0]);
  if (res.rows.length === 0) {
    //show error 404
    notFound();
  }

  return res.rows[0];
}

export async function generateMetadata({ params }) {
  const slug = params.slug;
  const item = await getPost(slug);

  return {
    title: item.title,
    description: item.description,
    openGraph: {
      title: item.title,
      description: item.description,
      url: `https://bitlinks.in/news/${slug}`,
      siteName: "BitLinks",
      images: [
        {
          url: item.image,
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
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

export default async function NewsPage({ params }) {
  const slug = params.slug;
  const item = await getPost(slug);

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
