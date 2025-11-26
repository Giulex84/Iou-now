"use client";

export default function PolicyPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        This Privacy Policy explains how we collect, use, and protect your data when using our application.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Data We Collect</h2>
      <p className="mb-4">
        We may collect user-provided information such as name, IOU entries, notes, and transaction details.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Pi Network Data</h2>
      <p className="mb-4">
        For Pi payments, we may access your Pi UID and transaction data required by the Pi SDK to process payments.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Firebase Storage</h2>
      <p className="mb-4">
        Your IOUs, history, and settings may be securely stored in Firebase under your user session.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Cookies and Local Data</h2>
      <p className="mb-4">
        Local storage may be used to keep filters, UI preferences, or session status.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Data Sharing</h2>
      <p className="mb-4">
        We do not sell or share your personal data with third parties except for necessary integrations (Pi SDK, Firebase).
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Security</h2>
      <p className="mb-4">
        We use industry-standard protections to keep your data secure.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Your Rights</h2>
      <p>
        You may request deletion of your stored data at any time by contacting the developer.
      </p>
    </div>
  );
}
