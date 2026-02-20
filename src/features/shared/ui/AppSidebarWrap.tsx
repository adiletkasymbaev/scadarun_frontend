import type { ReactNode } from "react";
import AppSidebar from "./AppSidebar";

interface ComponentProps {
    children: ReactNode;   
}

function AppSidebarWrap({ children }: ComponentProps) {
    const content = (
        <div className="min-h-screen w-full flex pl-[260px]" style={{ backgroundColor: "#101828" }}>
            <AppSidebar />
            {children}
        </div>
    );

    return content;
}

export default AppSidebarWrap;