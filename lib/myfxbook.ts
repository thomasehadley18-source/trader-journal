import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function myfxbookLogin(email: string, password: string) {
  const res = await fetch(
    `https://www.myfxbook.com/api/login.json?email=${encodeURIComponent(
      email
    )}&password=${encodeURIComponent(password)}`
  )

  const json = await res.json()
  if (!json || !json.session || json.error) {
    throw new Error(json.message || "Login failed")
  }

  return json.session
}

export async function myfxbookGetAccounts(session: string) {
  const res = await fetch(
    `https://www.myfxbook.com/api/get-my-accounts.json?session=${session}`
  )
  return res.json()
}

export async function myfxbookGetHistory(session: string, accountId: string) {
  const res = await fetch(
    `https://www.myfxbook.com/api/get-history.json?session=${session}&id=${accountId}`
  )
  return res.json()
}

export async function saveMyFxBookSession(userId: string, session: string) {
  await supabase.from("myfxbook_accounts").upsert({
    user_id: userId,
    myfxbook_session: session,
    connected: true,
  })
}
