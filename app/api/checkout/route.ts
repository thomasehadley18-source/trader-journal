import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req: Request) {

  const stripeKey = process.env.STRIPE_SECRET_KEY

  if (!stripeKey) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 })
  }

  const stripe = new Stripe(stripeKey)

  try {

    const { priceId } = await req.json()

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}`
    })

    return NextResponse.json({ url: session.url })

  } catch (err: any) {

    return NextResponse.json({ error: err.message }, { status: 500 })

  }

}