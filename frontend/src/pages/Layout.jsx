import React from "react";
import { Outlet } from "react-router-dom";
import SideNavBar from "../components/common/SideNavBar"
import { useAuth } from "../auth/AuthContext"

export default function Layout() {
    const { isAuthenticated } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    return (
        <div className="flex h-screen w-full overflow-hidden bg-(--color-background-dark)">
            {/* MOBILE HEADER */}
            {isAuthenticated && (
                <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-(--color-background-dark) border-b border-white/5 p-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
                            <span className="material-symbols-outlined text-lg">account_balance_wallet</span>
                        </div>
                        <h1 className="text-sm font-bold tracking-tight text-white">Smart Finance</h1>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="text-white p-1 rounded-lg hover:bg-white/10"
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            )}

            {isAuthenticated && (
                <SideNavBar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />
            )}

            <main className="flex-1 overflow-auto w-full pt-16 md:pt-0">
                <Outlet />
            </main>
        </div>
    );
}



