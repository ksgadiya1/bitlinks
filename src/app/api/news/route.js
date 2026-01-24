import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import pool from "@/lib/db";

// Initialize S3/R2 client - only in server environment
let s3Client;

if (typeof window === "undefined") {
  s3Client = new S3Client({
    region: "auto",
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
    endpoint: process.env.R2_PUBLIC_URL,
  });
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    // Extract form fields - matching field names from your Express code
    const slug = formData.get("slug");
    const title = formData.get("title");
    const source_url = formData.get("sourceUrl");
    const description = formData.get("description");
    const file = formData.get("file");

    // Validate required fields
    if (!slug || !title || !source_url || !description) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Validate slug format (alphanumeric and hyphens only)
    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(slug)) {
      return new Response(
        JSON.stringify({
          error:
            "Slug must contain only lowercase letters, numbers, and hyphens",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Validate URL format
    try {
      new URL(source_url);
    } catch (e) {
      return new Response(JSON.stringify({ error: "Invalid URL format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if slug already exists
    const existingResult = await pool.query(
      "SELECT id FROM news WHERE slug = $1",
      [slug],
    );

    if (existingResult.rows.length > 0) {
      return new Response(
        JSON.stringify({
          error: "Slug already exists. Please choose a different one.",
        }),
        { status: 409, headers: { "Content-Type": "application/json" } },
      );
    }

    // Upload image to R2 if provided
    let imageUrl = null;
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Get file extension
      const ext = file.name.split(".").pop();
      const key = `${slug}.${ext}`;

      try {
        const command = new PutObjectCommand({
          Bucket: process.env.R2_BUCKET,
          Key: key,
          Body: buffer,
          ContentType: file.type,
        });

        await s3Client.send(command);

        // Generate CDN URL
        imageUrl = `${process.env.CDN_URL}/${encodeURIComponent(key)}`;
        console.log(`Image uploaded: ${imageUrl}`);
      } catch (s3Error) {
        console.error("S3 upload error:", s3Error);
        throw new Error(`Failed to upload image: ${s3Error.message}`);
      }
    }

    // Generate UUID for the news item
    const id = uuidv4();

    // Insert into database
    try {
      await pool.query(
        `INSERT INTO news (id, slug, image, title, source_url, description)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [id, slug, imageUrl, title, source_url, description],
      );

      console.log(`News item created with ID: ${id}`);

      // Clean up old logs (older than 7 days)
      await pool.query(
        "DELETE FROM logs WHERE created_at >= NOW() - INTERVAL '7 days';",
      );
    } catch (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "✅ News added successfully!",
        data: {
          id,
          slug,
          title,
          source_url,
          description,
          image: imageUrl,
        },
      }),
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error adding news:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: `❌ Error: ${error.message}`,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
