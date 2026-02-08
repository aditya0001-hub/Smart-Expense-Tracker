import { useState, useEffect, useRef } from 'react';
import heroImage from './../assets/front_image_rising_green.png'
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../utils/apiCall';
import { Link } from 'react-router-dom';
import GoogleAuth from '../auth/GoogleAuth';

export default function Login() {
  const [visible, setVisible] = useState("visibility_off")
  const [pass_text, setPass_text] = useState("password")
  const [userPassword, setuserPassword] = useState("")
  const [userEmail, setuserEmail] = useState("")
  const topRef = useRef(null);

  // Error State

  // Error State
  const [error, setError] = useState(null)

  const { login } = useAuth();
  const navigate = useNavigate();

  // Auto-dismiss error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await apiCall("/api/auth/login", "POST", { "userEmail": userEmail, "userPassword": userPassword });
      console.log(data);
      if (data.token) {
        login(data.token, data.user);
        navigate('/dashboard');
      } else {
        // Fallback if no token but no exception thrown (unlikely with new apiCall)
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  const handleHome = (e) => {
    e.preventDefault();
    navigate('/')
  }

  return (
    <div ref={topRef} className="dark flex min-h-screen w-full flex-col lg:flex-row font-[Inter] bg-[#f6f8f6] dark:bg-bg-dark text-slate-900 dark:text-white relative overflow-hidden">

      {/* ERROR POPUP */}
      {error && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-500/50 text-red-600 dark:text-red-200 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 min-w-75 max-w-md">
            <span className="material-symbols-outlined text-red-500">error</span>
            <p className="text-sm font-medium flex-1">{error}</p>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-500">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>
      )}

      {/* LEFT LOGIN SECTION */}
      <div className="flex flex-1 flex-col justify-center px-8  sm:px-12 lg:px-20 xl:px-24">
        <div className="w-full max-w-110 mx-auto">

          {/* BRAND */}
          <div onClick={handleHome} className="flex items-center gap-2 mb-12 cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <span className="material-symbols-outlined text-bg-dark text-2xl font-bold">
                account_balance_wallet
              </span>
            </div>
            <span className="text-xl font-bold tracking-tight">Smart Expense tracker</span>
          </div>

          {/* HEADING */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Log in to your account</h1>
            <p className="text-slate-500 dark:text-gray-400">
              Welcome back! Please enter your details.
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* EMAIL */}
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

            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <input onChange={(e) => { setuserPassword(e.target.value) }}
                  required
                  type={pass_text}
                  placeholder="••••••••"
                  className="flex h-12 w-full rounded-lg border border-slate-300 dark:border-[#1c2e22] bg-white dark:bg-[#15241a] px-3 py-2 text-sm placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                />
                <span onClick={() => { if (visible === "visibility_off") { setVisible("visibility"); setPass_text("text") } else { setVisible("visibility_off"); setPass_text("password") } }} className="material-symbols-outlined absolute right-3 top-3 text-slate-400 text-[20px] cursor-pointer">
                  {visible}
                </span>
              </div>
            </div>

            {/* REMEMBER + FORGOT */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {/* <input type="checkbox" className="h-4 w-4 text-primary" />
                <span className="text-sm">Remember for 30 days</span> */}
              </div>
              <a className="text-sm font-medium text-primary hover:opacity-80 cursor-pointer">
                Forgot password?
              </a>
            </div>

            {/* SIGN IN */}
            <button className="cursor-pointer h-12 w-full rounded-lg bg-primary text-bg-dark font-bold hover:bg-primary/90 transition active:scale-[0.98]">
              Sign in
            </button>

            {/* GOOGLE LOGIN */}
            <GoogleAuth text="signin_with" mode="login" />
          </form>

          {/* FOOTER */}
          <div className="mt-8 text-center text-sm text-slate-500 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link to="/register" className=" cursor-pointer font-semibold text-primary hover:opacity-80">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT HERO SECTION */}
      <div className="relative hidden lg:flex flex-1 items-center justify-center bg-[#1c2e22]/50 dark:bg-[#0c1a11] overflow-hidden">

        {/* GLOW BLOBS */}
        <div className="absolute top-[-10%] right-[-5%] w-125 h-125 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-150 h-150 rounded-full bg-primary/10 blur-[100px]" />

        <div className="relative z-10 text-center max-w-xl px-12 py-10">

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
