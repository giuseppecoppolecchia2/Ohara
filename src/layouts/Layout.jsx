import { Outlet, useLoaderData, useNavigation } from "react-router";
import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import SplashScreen from "../components/SplashScreen";
import PageLoader from "../components/PageLoader";

let splashShown = false;

export default function Layout() {
  const genres = useLoaderData();
  const navigation = useNavigation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(!splashShown);

 const loading = navigation.state !== "idle";

  const handleSplashComplete = () => {
    splashShown = true;
    setShowSplash(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f2a3a] relative">

      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <PageLoader visible={loading && !showSplash} />

      <div className="absolute inset-0 opacity-20 bg-[url('/src/assets/parchment.jpg')] bg-cover bg-center pointer-events-none" />

      <Navbar
        onBurgerClick={() => setSidebarOpen((o) => !o)}
        sidebarOpen={sidebarOpen}
      />

      <section className="grid grid-cols-1 lg:grid-cols-7 gap-6 flex-1 px-6 py-8 relative">

        <aside className="hidden lg:block lg:col-span-1 bg-[#0a1f2b]/80 backdrop-blur-sm rounded-2xl border border-[#e8d8b5]/20 p-4 shadow-lg z-10 h-fit sticky top-20">
          <Sidebar genres={genres} />
        </aside>

        <div className="col-span-1 lg:col-span-6 bg-[#0f2a3a]/70 backdrop-blur-sm rounded-2xl border border-[#e8d8b5]/10 p-6 shadow-inner z-0">
          <Outlet />
        </div>
      </section>

      <div className="lg:hidden">
        <div
          className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-250
            ${
              sidebarOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />

        <aside
          className={`fixed top-14 left-0 z-50 h-[calc(100vh-3.5rem)] w-56
            bg-[#0a1f2b] border-r border-[#e8d8b5]/10
            transform transition-transform duration-[280ms]
            ease-[cubic-bezier(0.4,0,0.2,1)]
            overflow-y-auto p-5
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <Sidebar
            genres={genres}
            onClose={() => setSidebarOpen(false)}
          />
        </aside>
      </div>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}