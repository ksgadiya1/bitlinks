"use client";

import { useState } from "react";
import "../login.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    slug: "",
    sourceUrl: "",
    file: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Add your login logic here
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      setIsLoggedIn(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    setLoading(true);

    try {
      // Validate required fields
      if (
        !formData.title ||
        !formData.description ||
        !formData.slug ||
        !formData.sourceUrl
      ) {
        throw new Error("All fields are required");
      }

      // Validate slug format
      const slugRegex = /^[a-z0-9-]+$/;
      if (!slugRegex.test(formData.slug)) {
        throw new Error(
          "Slug must contain only lowercase letters, numbers, and hyphens",
        );
      }

      // Create FormData to handle file upload
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("slug", formData.slug);
      formDataToSend.append("sourceUrl", formData.sourceUrl);
      if (formData.file) {
        formDataToSend.append("file", formData.file);
      }

      const response = await fetch("/api/news", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || errorData.message || "Failed to add news",
        );
      }

      const data = await response.json();
      console.log("News added successfully:", data);
      setFormSuccess(data.message || "News added successfully!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        slug: "",
        sourceUrl: "",
        file: null,
      });

      // Reset file input
      const fileInput = document.getElementById("file");
      if (fileInput) fileInput.value = "";

      // Clear success message after 3 seconds
      setTimeout(() => setFormSuccess(""), 3000);
    } catch (err) {
      setFormError(err.message);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    setFormData({
      title: "",
      description: "",
      slug: "",
      sourceUrl: "",
      file: null,
    });
  };

  if (isLoggedIn) {
    return (
      <div className="dashboard-container" style={styles.container}>
        <div style={styles.dashboardForm}>
          {formSuccess && <p style={styles.success}>{formSuccess}</p>}
          {formError && <p style={styles.error}>{formError}</p>}

          <form onSubmit={handleFormSubmit} style={styles.dummyForm}>
            <h3 style={styles.formTitle}>Add News</h3>

            <div style={styles.formGroup}>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                required
                style={styles.input}
                placeholder="Title"
              />
            </div>

            <div style={styles.formGroup}>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                required
                style={{
                  ...styles.input,
                  minHeight: "100px",
                  resize: "vertical",
                }}
                placeholder="Description"
              />
            </div>

            <div style={styles.formGroup}>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleFormChange}
                required
                style={styles.input}
                placeholder="Slug"
              />
            </div>

            <div style={styles.formGroup}>
              <input
                type="url"
                id="sourceUrl"
                name="sourceUrl"
                value={formData.sourceUrl}
                onChange={handleFormChange}
                required
                style={styles.input}
                placeholder="Source URL"
              />
            </div>

            <div style={styles.formGroup}>
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleFormChange}
                style={styles.fileInput}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.addNewsButton,
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Adding News..." : "Add News"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container" style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Admin Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            placeholder="Enter your email"
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
  },
  form: {
    backgroundColor: "#fff",
    padding: "50px",
    borderRadius: "12px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    width: "100%",
    maxWidth: "420px",
    animation: "slideIn 0.5s ease-out",
  },
  dashboardForm: {
    backgroundColor: "#fff",
    padding: "50px",
    borderRadius: "12px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    width: "100%",
    maxWidth: "700px",
    animation: "slideIn 0.5s ease-out",
  },
  dashboardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    paddingBottom: "20px",
    borderBottom: "2px solid #f0f0f0",
  },
  heading: {
    margin: 0,
    color: "#1a1a1a",
    fontSize: "32px",
    fontWeight: "700",
    letterSpacing: "-0.5px",
  },
  formTitle: {
    marginBottom: "30px",
    color: "#1a1a1a",
    fontSize: "22px",
    fontWeight: "600",
    borderBottom: "3px solid #667eea",
    paddingBottom: "12px",
  },
  welcomeText: {
    marginBottom: "35px",
    color: "#667eea",
    fontSize: "16px",
    fontWeight: "600",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  dummyForm: {
    marginTop: "0",
  },
  formGroup: {
    marginBottom: "24px",
  },
  label: {
    display: "block",
    marginBottom: "10px",
    color: "#333",
    fontWeight: "600",
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "15px",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "all 0.3s ease",
    backgroundColor: "#f9f9f9",
  },
  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginTop: "10px",
  },
  logoutButton: {
    padding: "12px 28px",
    backgroundColor: "#ff6b6b",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(255, 107, 107, 0.3)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  submitButton: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(40, 167, 69, 0.4)",
  },
  addNewsButton: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginTop: "15px",
  },
  fileInput: {
    width: "100%",
    padding: "12px",
    border: "2px dashed #667eea",
    borderRadius: "8px",
    fontSize: "14px",
    boxSizing: "border-box",
    cursor: "pointer",
    backgroundColor: "#f9f9f9",
    transition: "all 0.3s ease",
  },
  error: {
    color: "#ff6b6b",
    marginBottom: "24px",
    padding: "14px 16px",
    backgroundColor: "#ffe0e0",
    border: "1px solid #ff6b6b",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
  },
  success: {
    color: "#28a745",
    marginBottom: "24px",
    padding: "14px 16px",
    backgroundColor: "#e0ffe0",
    border: "1px solid #28a745",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
  },
};
