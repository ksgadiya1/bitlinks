export const metadata = {
  title: "Privacy Policy - BitLinks",
  description:
    "Learn how BitLinks.in collects, uses, and protects your information.",
  robots: {
    index: false,
    follow: false,
  },
};

function PrivacyPolicy() {
  return (
    <>
      <section style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
          This Privacy Policy explains how <strong>BitLinks.in</strong> (“we,”
          “our,” or “us”) collects, uses, and protects your information when you
          use our website.
        </p>

        <h2 style={{ marginTop: "2rem" }}>1. Information We Collect</h2>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
          We may collect the following types of information:
        </p>
        <ul
          style={{
            paddingLeft: "1.5rem",
            fontSize: "1.1rem",
            lineHeight: "1.6",
          }}
        >
          <li>
            <strong>Personal Information:</strong> such as your name and email
            address if you contact us or subscribe to updates.
          </li>
          <li>
            <strong>Non-Personal Information:</strong> including browser type,
            device information, IP address, and usage data collected via cookies
            and analytics tools.
          </li>
        </ul>

        <h2 style={{ marginTop: "2rem" }}>2. How We Use Your Information</h2>
        <ul
          style={{
            paddingLeft: "1.5rem",
            fontSize: "1.1rem",
            lineHeight: "1.6",
          }}
        >
          <li>To provide and improve our news aggregation services.</li>
          <li>To personalize content and enhance user experience.</li>
          <li>To analyze site performance using AI-driven analytics.</li>
          <li>
            To communicate with you if you have contacted us or subscribed to
            updates.
          </li>
        </ul>

        <h2 style={{ marginTop: "2rem" }}>3. Cookies & Tracking</h2>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
          We use cookies, analytics tools, and AI-based systems to track user
          activity and improve our content delivery. You can disable cookies in
          your browser settings, but some features may not function properly.
        </p>

        <h2 style={{ marginTop: "2rem" }}>4. Data Sharing</h2>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
          We do not sell or trade your personal information. We may share
          limited data with trusted third parties (such as analytics and hosting
          providers) to operate and improve our services.
        </p>

        <h2 style={{ marginTop: "2rem" }}>5. Security</h2>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
          We implement industry-standard security measures to protect your data.
          However, no method of online transmission is 100% secure.
        </p>

        <h2 style={{ marginTop: "2rem" }}>6. Third-Party Links</h2>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
          Our website may contain links to third-party sites. We are not
          responsible for the privacy practices of these websites.
        </p>

        <h2 style={{ marginTop: "2rem" }}>7. Changes to This Policy</h2>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated revision date.
        </p>

        <h2 style={{ marginTop: "2rem" }}>8. Contact Us</h2>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
          If you have any questions about this Privacy Policy, please contact us
          at:
        </p>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
          <strong>Email:</strong> info@bitlinks.in
        </p>
        <br />
      </section>
    </>
  );
}

export default PrivacyPolicy;
