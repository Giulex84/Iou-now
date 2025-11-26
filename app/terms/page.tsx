"use client";

export default function TermsPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="mb-4">
        These Terms govern your use of this application. By accessing the app, you agree to the following conditions.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of the App</h2>
      <p className="mb-4">
        You may use the app to track IOUs and, when available, execute Pi transactions through the Pi SDK.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. User Responsibilities</h2>
      <p className="mb-4">
        You are responsible for the accuracy of data you enter, including IOU details and transaction information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Pi Payments</h2>
      <p className="mb-4">
        Payments executed via the Pi SDK are final. The app does not control or reverse Pi blockchain operations.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. No Financial Liability</h2>
      <p className="mb-4">
        The app does not provide financial advice and is not responsible for losses, disputes, or errors between users.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Data Storage</h2>
      <p className="mb-4">
        IOUs and user data may be stored in Firebase. You are responsible for safeguarding your account.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Termination</h2>
      <p className="mb-4">
        We may suspend access in case of abuse, misuse, or violations of these terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to Terms</h2>
      <p>
        We may update these Terms at any time. Continued use of the app implies acceptance of the updated Terms.
      </p>
    </div>
  );
}
