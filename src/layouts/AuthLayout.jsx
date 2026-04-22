import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f2a3a] relative">
      <div className="absolute inset-0 opacity-20 bg-[url('/src/assets/parchment.jpg')] bg-cover bg-center pointer-events-none" />

      <Navbar />

      <section className="flex-1 flex items-start sm:items-center justify-center px-4 py-8 relative z-10">
        <Outlet />
      </section>
    </div>
  );
}