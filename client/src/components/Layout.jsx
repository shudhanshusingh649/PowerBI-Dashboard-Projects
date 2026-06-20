import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="ml-64 flex-1 p-6">
        {children}
      </main>
    </div>
  );
}