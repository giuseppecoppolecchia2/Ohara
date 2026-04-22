import { Link, useNavigate } from "react-router";
import Logo from "./Logo";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import routes from "../routing/routes";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const { user, signOut } = useContext(UserContext);
  const navigate = useNavigate();

  const handle_logout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <footer className="relative mt-16 text-[#e8d8b5]">
      <div className="absolute inset-0 bg-[#0a1f2b]/90 pointer-events-none" />

      <div className="relative z-10 border-t border-[#e8d8b5]/20">
        <div className="container mx-auto w-full px-6 py-10 flex flex-col items-center text-center gap-10 md:flex-row md:justify-between md:text-left">
          
          

          <div className="flex flex-col items-center text-center gap-3">
            <Link
              to={routes.home}
              className="hover:text-white transition duration-300 hover:scale-110"
            >
              <Logo className="w-32 md:w-40 " />
            </Link>

            <p className="text-xs text-[#e8d8b5]/60 italic">
              “La storia del mondo è nascosta tra queste pagine”
            </p>

            <p className="text-xs text-[#e8d8b5]/60">

            Developed by Giuseppe Coppolecchia - © {new Date().getFullYear()} - All rights reserved
            </p>
          </div>

          <div className="flex flex-col items-center md:items-center">
            <h6 className="font-italic text-xs text-[#e8d8b5]/60 mb-3 border-b border-[#e8d8b5]/60 pb-1">
              Seguici sui social
            </h6>
            <div className="flex gap-4 text-[#e8d8b5]/60 ">
              <Link to={"https://www.linkedin.com/in/giuseppe-coppolecchia-dev"} className="hover:text-white transition duration-300 hover:scale-110">
                <FaLinkedin size={20} />
              </Link>
              <Link to={"https://github.com/giuseppecoppolecchia2"} className="hover:text-white transition duration-300 hover:scale-110">
                <FaGithub size={20} />
              </Link>
              <Link to={"https://www.instagram.com/peeenoh_/"} className="hover:text-white transition duration-300 hover:scale-110">
                <FaInstagram size={20} />
              </Link>
            </div>
          </div>

          <nav className="flex flex-col items-center md:items-end">
            <h6 className="font-italic text-xs text-[#e8d8b5]/60 mb-3 border-b border-[#e8d8b5]/60 pb-1">
              Gestisci il profilo
            </h6>

            <div className="flex gap-4 ">
              {!user && (
                <>
                  <Link
                    to={routes.login}
                    className="hover:text-white transition duration-300 hover:scale-110 text-xs font-italic text-[#e8d8b5]/60"
                  >
                    Accedi
                  </Link>

                  <Link
                    to={routes.register}
                    className="hover:text-white transition duration-300 hover:scale-110 text-xs font-italic text-[#e8d8b5]/60"
                  >
                    Registrati
                  </Link>
                </>
              )}

              {user && (
                <>
                  <Link
                    to={routes.profile}
                    className="hover:text-white transition duration-300 hover:scale-110 text-xs font-italic text-[#e8d8b5]/60"
                  >
                    Profilo
                  </Link>

                  <button
                    onClick={handle_logout}
                    className="hover:text-white transition duration-300 hover:scale-110 text-xs font-italic text-[#e8d8b5]/60"
                  >
                    Disconnetti
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}