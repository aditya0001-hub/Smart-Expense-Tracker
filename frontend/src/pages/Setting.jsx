import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Settings() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-full flex-col p-8 md:p-12 lg:pr-20 text-white">

      {/* HEADER */}
      <header className="mb-10 flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-gray-400">
          Manage your profile, security preferences, and account settings.
        </p>
      </header>

      <div className="flex max-w-4xl flex-col gap-8">

        {/* PROFILE CARD */}
        <section className="rounded-3xl border border-white/5 bg-(--color-bg-dark) p-8 shadow-sm">
          <div className="mb-8 flex items-center gap-6">

            {/* Avatar */}
            <div className="relative h-20 w-20 shrink-0 flex items-center justify-center rounded-full bg-white/10 ring-4 ring-white/5">
              <span className="material-symbols-outlined text-white text-5xl">account_circle</span>
              <button className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-black shadow-lg hover:scale-105 transition">
                <span className="material-symbols-outlined text-[18px]">edit</span>
              </button>
            </div>

            {/* User Info */}
            <div>
              <h3 className="text-xl font-bold">{user?.name || "User"}</h3>
              <p className="text-sm font-medium text-primary">
                Pro Member
              </p>
            </div>
          </div>

          {/* Inputs */}
          <div className="grid gap-6 md:grid-cols-2">

            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">
                Display Name
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  person
                </span>
                <input
                  readOnly
                  value={user?.name || ""}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  mail
                </span>
                <input
                  readOnly
                  value={user?.email || ""}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

          </div>
        </section>

        {/* SECURITY CARD */}
        <section className="rounded-3xl border border-white/5 bg-(--color-bg-dark) p-8 shadow-sm">
          <div className="mb-6 border-b border-white/5 pb-4">
            <h3 className="text-lg font-bold">Security</h3>
            <p className="text-sm text-gray-400 mt-1">
              Update your password to keep your account secure.
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">lock</span>
              </div>
              <div>
                <p className="font-semibold">Password</p>
                <p className="text-xs text-gray-400">Last changed 3 months ago</p>
              </div>
            </div>

            <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-black shadow-[0_0_15px_rgba(19,236,91,0.2)] hover:shadow-[0_0_25px_rgba(19,236,91,0.4)] transition">
              <span className="material-symbols-outlined">lock_reset</span>
              Change Password
            </button>
          </div>
        </section>

        {/* LOGOUT */}
        <div className="mt-8 flex justify-end border-t border-white/5 pt-4">
          <button
            onClick={handleLogout}
            className="group flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-8 py-3 font-semibold text-red-400 hover:bg-red-500/10 transition sm:w-auto"
          >
            <span className="material-symbols-outlined group-hover:-translate-x-1 transition">
              logout
            </span>
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}
