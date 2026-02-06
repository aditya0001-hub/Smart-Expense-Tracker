import { Outlet } from "react-router-dom"
import SideNavBar from "../components/common/SideNavBar"
import { useAuth } from "../auth/AuthContext"

export default function Layout() {
    const { isAuthenticated } = useAuth();
    return (

        <>
            <div className="flex h-screen w-full overflow-hidden bg-(--color-background-dark)">
                {isAuthenticated && <SideNavBar />}
                <main className=" overflow-auto flex-1">
                    <Outlet />
                </main>
            </div>
        </>
    )
}



