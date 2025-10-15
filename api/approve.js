// api/approve.js — Minimal serverless endpoint that returns a mock txid
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Use POST' });

  try {
    const { paymentId } = req.body || {};
    if (!paymentId) return res.status(400).json({ message: 'Missing paymentId' });

    // generate mock txid
    const txid = 'iounow-' + Math.random().toString(36).slice(2, 12);
    console.log('APPROVE: paymentId=', paymentId, 'txid=', txid);

    return res.status(200).json({ success: true, txid, message: 'Mock approved' });
  } catch (err) {
    console.error('approve error', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
