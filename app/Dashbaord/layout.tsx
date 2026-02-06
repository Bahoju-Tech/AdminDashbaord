import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex lg:p-8 bg-[#F5F7FA]">
      <Sidebar />
      <main className="w-full lg:ml-8 lg:mt-0 mt-16 lg:p-0 p-4">
        {children}
      </main>
    </div>
  );
}