import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

// eslint-disable-next-line react/prop-types
export default function SideNavBar({ isOpen, onClose }) {
  const { user } = useAuth();
  if (true) {
    return (
      <>
        {/* BACKDROP for MOBILE */}
        <div
          className={`fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
            }`}
          onClick={onClose}
        />

        {/* SIDEBAR */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-white/5 bg-(--color-background-dark) p-2 pt-7 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
            } flex h-full flex-col justify-between`}
        >

          {/* TOP */}
          <div className="flex flex-col gap-8">

            {/* LOGO & CLOSE */}
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-xl bg-primary/20 text-primary ring-1 ring-primary/30">
                  <span className="material-symbols-outlined">account_balance_wallet</span>
                </div>
                <h1 className="text-base font-bold tracking-tight text-white">Smart Finance</h1>
              </div>

              {/* Close Button (Mobile Only) */}
              <button
                onClick={onClose}
                className="md:hidden text-gray-400 hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* NAV LINKS */}
            <nav className="flex flex-col gap-4">

              {/* DASHBOARD */}
              <NavLink
                to="/dashboard"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-full px-4 py-3 transition-all
                ${isActive ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}`
                }>
                <span className="material-symbols-outlined">dashboard</span>
                <span className="font-semibold">Dashboard</span>
              </NavLink>

              {/* BUDGETS */}
              <NavLink
                to="/budgets"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-full px-4 py-3 transition-all
                ${isActive ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}`
                }
              >
                <span className="material-symbols-outlined">savings</span>
                <span>Budgets</span>
              </NavLink>

              {/* TRANSACTIONS */}
              <NavLink
                to="/transactions"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-full px-4 py-3 transition-all
                ${isActive ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}`
                }
              >
                <span className="material-symbols-outlined">sync_alt</span>
                <span>Transactions</span>
              </NavLink>

            </nav>
          </div>

          {/* BOTTOM */}
          <div className="flex flex-col gap-6">

            {/* SETTINGS */}
            <NavLink
              to="/settings"
              onClick={onClose}
              className="flex items-center gap-3 rounded-full px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white"
            >
              <span className="material-symbols-outlined">settings</span>
              <span>Settings</span>
            </NavLink>

            {/* DIVIDER */}
            <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent"></div>

            {/* USER PROFILE */}
            <div className="flex items-center gap-4 rounded-2xl border border-transparent p-2 hover:border-white/10 hover:bg-white/5 transition">
              <div className="relative h-12 w-12 shrink-0 flex items-center justify-center rounded-full bg-white/10 ring-2 ring-white/10">
                <span className="material-symbols-outlined text-white text-3xl">account_circle</span>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-primary ring-2 ring-(--color-background-dark)"></span>
              </div>

              <div className="flex flex-col overflow-hidden">
                <p className="truncate text-sm font-semibold text-white">{user?.name || "User"}</p>
                <p className="truncate text-xs text-gray-400">{user?.email || ""}</p>
              </div>


            </div>

          </div>
        </aside>


      </>
    );
  }
}
