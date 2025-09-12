import Link from "next/link";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#111",
        color: "#fff",
        padding: "2rem 1rem",
        marginTop: "3rem",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "1rem",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "bold" }}>
          BitLinks.in | Latest Crypto News & Updates
        </h2>

        <nav style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "#aaa", textDecoration: "none" }}>
            Home
          </Link>
          <Link href="/about" style={{ color: "#aaa", textDecoration: "none" }}>
            About
          </Link>
          <Link
            href="/privacy"
            style={{ color: "#aaa", textDecoration: "none" }}
          >
            Privacy Policy
          </Link>
        </nav>

        <p style={{ fontSize: "0.85rem", color: "#777", marginTop: "1rem" }}>
          © {new Date().getFullYear()} BitLinks.in — All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
