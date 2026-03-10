import Stripe from "stripe"
import { headers } from "next/headers"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {

  const stripeKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!stripeKey || !webhookSecret || !supabaseUrl || !serviceKey) {
    return new Response("Environment not configured", { status: 500 })
  }

  const stripe = new Stripe(stripeKey)
  const supabase = createClient(supabaseUrl, serviceKey)

  const body = await req.text()

  const headerList = await headers()
  const sig = headerList.get("stripe-signature")

  if (!sig) {
    return new Response("Missing signature", { status: 400 })
  }

  let event: Stripe.Event

  try {

    event = stripe.webhooks.constructEvent(
      body,
      sig,
      webhookSecret
    )

  } catch {

    return new Response("Webhook error", { status: 400 })

  }

  if (event.type === "checkout.session.completed") {

    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.userId

    if (userId) {

      await supabase
        .from("profiles")
        .update({ plan: "pro" })
        .eq("id", userId)

    }

  }

  return new Response("ok")
}