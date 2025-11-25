import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

const PI_API_KEY = process.env.PI_API_KEY;
const PI_API_BASE_URL = "https://api.minepi.com";

async function approveOnPi(paymentId: string) {
  if (!PI_API_KEY) {
    throw new Error("PI_API_KEY is not configured in environment variables.");
  }

  const res = await fetch(`${PI_API_BASE_URL}/v2/payments/${paymentId}/approve`, {
    method: "POST",
    headers: {
      Authorization: `Key ${PI_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Pi approve failed with status ${res.status}`);
  }

  return res.json();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { paymentId, serverPaymentId } = body || {};

    if (!paymentId) {
      return NextResponse.json(
        { ok: false, error: "paymentId is required." },
        { status: 400 }
      );
    }

    const piPayment = await approveOnPi(paymentId);

    if (serverPaymentId) {
      const ref = doc(db, "pi_payments", serverPaymentId);
      await setDoc(
        ref,
        {
          paymentId,
          status: "APPROVED",
          piPayment,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    }

    return NextResponse.json({
      ok: true,
      payment: piPayment,
    });
  } catch (err: any) {
    console.error("approve-payment error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Internal server error." },
      { status: 500 }
    );
  }
}
