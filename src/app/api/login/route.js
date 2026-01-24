export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Dummy validation
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Dummy authentication (replace with real authentication logic)
    // For demo: accept any email/password combination
    if (email == "admin@bitlinks.in" && password == "admin") {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Login successful",
          user: {
            email,
            id: Math.random().toString(36).substr(2, 9),
            name: email.split("@")[0],
          },
          token: "dummy-jwt-token-" + Math.random().toString(36).substr(2, 9),
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
