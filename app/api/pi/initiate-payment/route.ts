import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, memo, metadata } = await req.json();

    const apiKey = process.env.PI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "PI_API_KEY missing" },
        { status: 500 }
      );
    }

    const res = await fetch("https://sandbox-api.minepi.com/v2/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Key ${apiKey}`,
      },
      body: JSON.stringify({
        amount,
        memo,
        metadata,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ ok: false, error: data }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      serverPaymentId: data.identifier,
      payment: data,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
