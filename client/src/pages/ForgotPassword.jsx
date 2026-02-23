import { useState } from "react";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // ────────────────────────────────────────────────
  // STEP 1 → Send OTP
  const sendOtp = async () => {
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("OTP sent to your email");
        setStep(2);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ────────────────────────────────────────────────
  // STEP 2 → Verify OTP
  const verifyOtp = async () => {
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("OTP verified");
        setStep(3);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ────────────────────────────────────────────────
  // STEP 3 → Reset Password
  const resetPassword = async () => {
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Password reset successfully");
        setStep(1);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-10 text-center">
          <h2 className="text-3xl font-bold text-white">Forgot Password</h2>
          <p className="mt-3 text-indigo-100 text-sm">
            {step === 1 && "Enter your email to receive OTP"}
            {step === 2 && "Enter the OTP sent to your email"}
            {step === 3 && "Choose a strong new password"}
          </p>
        </div>

        {/* Form Content */}
        <div className="p-8">
          {/* Step 1 - Email */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                />
              </div>

              <button
                onClick={sendOtp}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Send OTP
              </button>
            </div>
          )}

          {/* Step 2 - OTP */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                  OTP (6 digits)
                </label>
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all tracking-widest text-center text-lg"
                />
              </div>

              <button
                onClick={verifyOtp}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Verify OTP
              </button>
            </div>
          )}

          {/* Step 3 - New Password */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                />
              </div>

              <button
                onClick={resetPassword}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Reset Password
              </button>
            </div>
          )}

          {/* Back / Help link */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setStep(1)}
              className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline"
            >
              ← Start over
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-gray-50 text-center text-sm text-gray-500 border-t">
          Remember your password?{" "}
          <a href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;