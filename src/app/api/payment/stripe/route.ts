import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export async function POST(req: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY is not set in environment variables");
      return NextResponse.json({ error: "Stripe secret key not configured" }, { status: 500 });
    }

    const { url } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Pro Plan - $10",
            },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      success_url: `${url}/success`,
      cancel_url: `${url}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout session creation failed:", error);
    return NextResponse.json({ error: "Checkout session creation failed" }, { status: 500 });
  }
}
