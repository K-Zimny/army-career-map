import { NextResponse } from "next/server";

export function middleware(req) {
  // Get the Authorization header from the request
  const basicAuth = req.headers.get("authorization");

  // If the Authorization header exists, validate it
  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, password] = Buffer.from(authValue, "base64")
      .toString()
      .split(":");

    // Check if the provided credentials match the environment variables
    if (
      user === process.env.BASIC_AUTH_USER &&
      password === process.env.BASIC_AUTH_PASSWORD
    ) {
      return NextResponse.next(); // Allow request to proceed
    }
  }

  // If no valid credentials, return a 401 Unauthorized response
  return new Response("Auth Required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}
