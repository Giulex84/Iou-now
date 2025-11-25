import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

const PI_API_KEY = process.env.PI_API_KEY;
const PI_API_BASE_URL = "https://api.minepi.com";

async function completeOnPi(paymentId: string, txid: string) {
  if (!PI_API_KEY) {
    throw new Error("PI_API_KEY is not configured in environment variables.");
  }

  const res = await fetch(`${PI_API_BASE_URL}/v2/payments/${paymentId}/complete`, {
    method: "POST",
    headers: {
      Authorization: `Key ${PI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ txid }),
  });

  if (!res.ok) {
    throw new Error(`Pi complete failed with status ${res.status}`);
  }

  return res.json();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { paymentId, txid, serverPaymentId } = body || {};

    if (!paymentId || !txid) {
      return NextResponse.json(
        { ok: false, error: "paymentId and txid are required." },
        { status: 400 }
      );
    }

    const piPayment = await completeOnPi(paymentId, txid);

    if (serverPaymentId) {
      const ref = doc(db, "pi_payments", serverPaymentId);
      await setDoc(
        ref,
        {
          paymentId,
          txid,
          status: "COMPLETED",
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
    console.error("complete-payment error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Internal server error." },
      { status: 500 }
    );
  }
}
