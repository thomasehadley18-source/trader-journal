import Stripe from "stripe"
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export const runtime = "edge"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")!

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (e) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const obj = event.data.object

  if (event.type === "checkout.session.completed") {
    await supabase.from("subscriptions").upsert({
      user_id: obj.metadata.userId,
      stripe_customer_id: obj.customer,
      stripe_subscription_id: obj.subscription,
      status: "active",
    })
  }

  if (event.type === "customer.subscription.deleted") {
    await supabase
      .from("subscriptions")
      .update({ status: "canceled" })
      .eq("stripe_subscription_id", obj.id)
  }

  return NextResponse.json({ ok: true })
}
