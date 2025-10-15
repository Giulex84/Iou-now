// api/iou-manager.js — simple in-memory / mock IOU manager
let iouData = [
  { id: 1, from_user: "@GiuleX84", to_user: "@piuser", amount: 5.0, memo: "Coffee", status: "PENDING" },
  { id: 2, from_user: "@piuser", to_user: "@GiuleX84", amount: 8.0, memo: "Lunch", status: "PENDING" }
];

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Use POST' });
  const { action } = req.body || {};
  try {
    switch(action) {
      case 'GET_USER_IOUS': {
        const { user } = req.body;
        if (!user) return res.status(400).json({ message: 'Missing user' });
        const list = iouData.filter(i => i.from_user === `@${user}` || i.to_user === `@${user}`);
        return res.status(200).json({ ious: list });
      }
      case 'CREATE_IOU': {
        const { from_user, to_user, amount, memo } = req.body;
        const newIou = { id: iouData.length+1, from_user, to_user, amount: parseFloat(amount), memo, status: 'PENDING' };
        iouData.push(newIou);
        return res.status(201).json({ iou: newIou });
      }
      case 'APPROVE_PAYMENT': {
        const txid = 'iounow-' + Math.random().toString(36).slice(2,12);
        return res.status(200).json({ success: true, txid, message: 'Mock approved' });
      }
      default:
        return res.status(400).json({ message: 'Unknown action' });
    }
  } catch (err) {
    console.error('iou-manager err', err);
    return res.status(500).json({ message: err.message });
  }
}
