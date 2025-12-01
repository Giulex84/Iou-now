import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, memo, metadata } = await req.json();

    // Questo server NON parla con Pi.
    // Genera solo un ID interno che il client userà nel Pi SDK.
    const serverPaymentId = "SP_" + Math.random().toString(36).substring(2, 12);

    return NextResponse.json({
      ok: true,
      serverPaymentId,
      amount,
      memo,
      metadata,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "server failure" },
      { status: 500 }
    );
  }
}
