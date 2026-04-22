import { Link } from "react-router";
import Logo from "./Logo";
import routes from "../routing/routes";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f2a3a] relative">
      <div className="absolute inset-0 opacity-20 bg-[url('/src/assets/parchment.jpg')] bg-cover bg-center pointer-events-none" />

      <div className="flex-1 flex flex-col items-center justify-center gap-6 relative z-10 px-4 text-[#e8d8b5]">
        <Logo className="w-40 sm:w-52 opacity-80" />

        <div className="text-center">
          <h1 className="text-8xl font-bold text-[#e8d8b5]/80 mb-2">404</h1>
          <p className="text-xl font-medium text-[#e8d8b5]/80 mb-1">
            Pagina non trovata
          </p>
          <p className="text-sm text-[#e8d8b5]/50">
            La rotta che cerchi non esiste in questo mondo.
          </p>
        </div>

        <div className="w-24 h-px bg-[#c9a227]/40" />

        <Link
          to={routes.home}
          replace
          className="btn bg-[#a68847]/90 hover:text-[#0f2a3a] hover:scale-101 transition-all duration-200 px-8"
        >
          Torna alla home
        </Link>
      </div>
    </div>
  );
}