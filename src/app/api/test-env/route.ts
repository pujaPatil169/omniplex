import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    // Return all environment variables accessible to the server
    return NextResponse.json({
      env: {
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || null,
        NODE_ENV: process.env.NODE_ENV || null,
        NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || null,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to get env variables" }, { status: 500 });
  }
}
