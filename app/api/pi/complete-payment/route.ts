import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { paymentId, txid } = await req.json();

    const apiKey = process.env.PI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ ok: false, error: "PI_API_KEY missing" }, { status: 500 });
    }

    if (!paymentId || !txid) {
      return NextResponse.json({ ok: false, error: "paymentId and txid required" }, { status: 400 });
    }

    const res = await fetch(`https://sandbox-api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Key ${apiKey}`,
      },
      body: JSON.stringify({ txid }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ ok: false, error: data }, { status: 500 });
    }

    return NextResponse.json({ ok: true, payment: data });

  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
