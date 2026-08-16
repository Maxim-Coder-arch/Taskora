import SidePanel from "@/src/components/shared/side-panel";
import type { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex h-screen gap-6">
            <SidePanel />

            <main>
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout;