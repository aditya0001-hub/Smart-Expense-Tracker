import heroImage from './../assets/front_image_rising_green.png'
import { apiCall } from '../utils/apiCall';
import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import GoogleAuth from '../auth/GoogleAuth';
import { useAuth } from '../auth/AuthContext';

export default function Register() {

  const navigate = useNavigate()
  const { login } = useAuth();
  const [userName, setuserName] = useState("")
  const [visible, setVisible] = useState("visibility_off");
  const [pass_text, setPass_text] = useState("password")
  const [userEmail, setuserEmail] = useState("")
  const [userPassword, setuserPassword] = useState("")
  const topRef = useRef(null);

  // Error State

  // Error State
  const [error, setError] = useState(null);

  // Auto-dismiss error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      const data = await apiCall("/api/auth/register", "POST", { "userName": userName, "userEmail": userEmail, "userPassword": userPassword });
      console.log("Registration success:", data);
      // Automatically login after successful registration
      const loginData = await apiCall("/api/auth/login", "POST", { "userEmail": userEmail, "userPassword": userPassword });
      if (loginData && loginData.token) {
        login(loginData.token, loginData.user);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error("Registration error:", err);
      // apiCall now throws the actual message
      setError(err.message || "Registration failed. Please try again.");
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  const handleHome = (e) => {
    e.preventDefault();
    navigate('/')
  }

  return (
    <div ref={topRef} className="dark min-h-screen flex flex-col lg:flex-row bg-white dark:bg-bg-dark text-slate-900 dark:text-white relative overflow-hidden">

      {/* ERROR POPUP */}
      {error && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-500/50 text-red-600 dark:text-red-200 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 min-w-75 max-w-md">
            <span className="material-symbols-outlined text-red-500">error</span>
            <p className="text-sm font-medium flex-1">{error}</p>
            <button _onClick={() => setError(null)} className="text-red-400 hover:text-red-500">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>
      )}

      {/* LEFT FORM */}
      <div className="flex flex-1 items-center px-6 sm:px-12 lg:px-20 py-12">
        <div className="max-w-110 w-full mx-auto">

          {/* Logo */}
          <div onClick={handleHome} className="flex items-center gap-3 mb-10 cursor-pointer">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-black text-2xl">account_balance_wallet</span>
            </div>
            <span className="text-xl font-bold">Smart Spend</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Create an account</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Start managing your personal finances today.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <div className="relative">
                <input onChange={(e) => { setuserName(e.target.value) }}
                  required
                  type="text"
                  placeholder=""
                  className="flex h-12 w-full rounded-lg border border-slate-300 dark:border-[#1c2e22] bg-white dark:bg-[#15241a] px-3 py-2 text-sm placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                />
                <span className="material-symbols-outlined absolute right-3 top-3 text-slate-400 text-[20px]">
                  person
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <input onChange={(e) => { setuserEmail(e.target.value) }}
                  required
                  type="email"
                  placeholder=""
                  className="flex h-12 w-full rounded-lg border border-slate-300 dark:border-[#1c2e22] bg-white dark:bg-[#15241a] px-3 py-2 text-sm placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                />
                <span className="material-symbols-outlined absolute right-3 top-3 text-slate-400 text-[20px]">
                  mail
                </span>
              </div>
            </div>
            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Create Password</label>
              <div className="relative">
                <input onChange={(e) => { setuserPassword(e.target.value) }}
                  type={pass_text}
                  required
                  placeholder="••••••••"
                  className="h-12 w-full rounded-lg border border-gray-300 dark:border-surface-dark
                  bg-white dark:bg-(--color-input-bg) px-3 text-sm outline-none
                  focus:ring-2 focus:ring-primary/50"
                />
                <span onClick={() => { if (visible === "visibility_off") { setVisible("visibility"); setPass_text("text") } else { setVisible("visibility_off"); setPass_text("password") } }} className="material-symbols-outlined absolute right-3 top-3 text-gray-400 cursor-pointer">
                  {visible}
                </span>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input required type="checkbox" className="h-4 w-4 accent-primary mt-1 cursor-pointer" />
              <p className="text-sm text-gray-600 dark:text-gray-300">
                I agree to the <a className="text-primary cursor-pointer">Terms</a> and{" "}
                <a className="text-primary cursor-pointer">Privacy Policy</a>
              </p>
            </div>

            {/* Buttons */}
            <button className="cursor-pointer h-12 w-full bg-primary text-black font-bold rounded-lg hover:opacity-90">
              Create account
            </button>

            <div className="mt-4">
              <GoogleAuth text="signup_with" mode="register" />
            </div>
          </form>

          <p className="mt-8 text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold cursor-pointer">
              Sign in
            </Link>
          </p>
        </div>
      </div>


      {/* RIGHT HERO SECTION */}
      <div className="relative hidden lg:flex flex-1 items-center justify-center bg-[#1c2e22]/50 dark:bg-[#0c1a11] overflow-hidden">

        {/* GLOW BLOBS */}
        <div className="absolute top-[-10%] right-[-5%] w-125 h-125 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-150 h-150 rounded-full bg-primary/10 blur-[100px]" />

        <div className="relative z-10 text-center max-w-xl p-12">

          {/* IMAGE */}
          <div
            className="w-full aspect-square max-w-md bg-center bg-contain bg-no-repeat mb-8 rounded-2xl shadow-[0_25px_50px_-12px_rgba(19,236,91,0.15)]"
            style={{
              backgroundImage: `url(${heroImage})`,
            }}
          />

          <h2 className="text-3xl sm:text-4xl font-bold">
            Smart Expense Tracker
          </h2>
          <p className="text-lg text-slate-600 dark:text-gray-300 mt-3">
            Manage your personal finances efficiently. Track spending, set budgets,
            and achieve your financial goals with ease.
          </p>

          {/* FEATURE PILLS */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {[
              { icon: "analytics", text: "Analytics" },
              { icon: "savings", text: "Budgeting" },
              { icon: "security", text: "Secure" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2 rounded-full bg-white/80 dark:bg-bg-dark/50 border border-slate-200 dark:border-white/10 px-4 py-2 backdrop-blur-sm"
              >
                <span className="material-symbols-outlined text-primary text-xl">
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translate(-50%, -20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-slide-down {
          animation: slide-down 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}

/* Components */

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 20.45c4.66 0 8.56-3.21 9.97-7.66H12v-4.48h14.88c.15 1.14.24 2.33.24 3.59 0 8.79-5.88 15.1-15.12 15.1C3.66 27.0 0 20.24 0 12S6.76 -3 15.1 -3c4.07 0 7.75 1.49 10.62 3.93l-3.23 3.23c-1.88-1.52-4.47-2.68-7.39-2.68-6.19 0-11.2 5.01-11.2 11.2s5.01 11.2 11.2 11.2z" />
    </svg>
  );
}
