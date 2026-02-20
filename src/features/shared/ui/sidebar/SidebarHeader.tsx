import { SidebarSection } from "./SidebarSection";

export function SidebarHeader() {
  return (
    <SidebarSection variant="filled" className="p-3 flex items-center justify-center">
      <img className="w-52" src="/logo.png" alt="Logo" />
    </SidebarSection>
  );
}