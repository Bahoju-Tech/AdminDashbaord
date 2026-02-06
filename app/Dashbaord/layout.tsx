import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex p-8 bg-[#F5F7FA]">
      <Sidebar />
      <main className="w-full ml-8">
        {children}
      </main>
    </div>
  );
}