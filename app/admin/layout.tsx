import AdminGate from "@/components/admin/AdminGate";
import Sidebar from "@/components/admin/Sidebar";
import MobileTabBar from "@/components/admin/MobileTabBar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGate>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 flex gap-6 pb-24 md:pb-6">
        <Sidebar />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
      <MobileTabBar />
    </AdminGate>
  );
}
