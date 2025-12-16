// app/page.jsx
import NewsCard from "./news_card";
import pool from "@/lib/db";
const result = await pool.query(
  "SELECT * FROM news ORDER BY created_at DESC LIMIT 22"
);
const data = result.rows;

export const revalidate = 600;

export default async function Home() {
  return (
    <div>
      {data.map((item) => (
        <NewsCard
          key={item.id}
          title={item.title}
          desc={item.description}
          image={item.image}
          source_url={item.source_url}
          slug={item.slug}
          created_at={item.created_at}
        />
      ))}
    </div>
  );
}
