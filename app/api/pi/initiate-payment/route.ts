import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { iouId, amount, memo, metadata } = body || {};

    if (!iouId || typeof amount !== "number") {
      return NextResponse.json(
        { ok: false, error: "iouId and amount are required." },
        { status: 400 }
      );
    }

    const ref = collection(db, "pi_payments");
    const docRef = await addDoc(ref, {
      iouId,
      amount,
      memo: memo || `IOU payment for ${iouId}`,
      metadata: metadata || {},
      status: "INITIATED",
      network: "Pi Testnet",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({
      ok: true,
      serverPaymentId: docRef.id,
    });
  } catch (err: any) {
    console.error("initiate-payment error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Internal server error." },
      { status: 500 }
    );
  }
}
