// Navbar.jsx
import { Link, useNavigate } from "react-router";
import routes from "../routing/routes";
import { useContext, useState } from "react";
import { FaSearch, FaUserCircle, FaSignOutAlt, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { UserContext } from "../contexts/UserContext";
import Logo from "./Logo";

export default function Navbar({ onBurgerClick, sidebarOpen }) {
  const [slug, setSlug] = useState("");
  const navigate = useNavigate();
  const { user, signOut, avatarUrl } = useContext(UserContext);

  const handle_logout = async () => { signOut(); navigate("/"); };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!slug.trim()) return;
    navigate(`/search/${slug}`);
    setSlug("");
  };

  return (
    <div className="navbar bg-[#0B212E] shadow-lg px-4 sticky top-0 z-40 border-b border-[#e8d8b5]/20 h-14">

      <button
        className="lg:hidden flex flex-col items-center justify-center gap-[4.5px] w-[34px] h-[34px]
          rounded-[9px] border border-[#e8d8b5]/15 bg-[#e8d8b5]/5
          hover:bg-[#e8d8b5]/10 transition-colors mr-2 flex-shrink-0"
        onClick={onBurgerClick}
        aria-label="Menu generi"
        aria-expanded={sidebarOpen}
      >
        <span className={`block w-[15px] h-[1.5px] bg-[#e8d8b5] rounded-full transition-all duration-200 origin-center
          ${sidebarOpen ? "translate-y-[6px] rotate-45" : ""}`} />
        <span className={`block w-[15px] h-[1.5px] bg-[#e8d8b5] rounded-full transition-all duration-200
          ${sidebarOpen ? "opacity-0 scale-x-0" : ""}`} />
        <span className={`block w-[15px] h-[1.5px] bg-[#e8d8b5] rounded-full transition-all duration-200 origin-center
          ${sidebarOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
      </button>

      <div className="navbar-start ">
        <Link to={routes.home} className="  hover:scale-105 transition-transform shrink-0  ">
          <Logo className="h-10 w-auto md:h-15" />
        </Link>
      </div>

      <div className="navbar-end gap-2">
        <form onSubmit={handleSubmit}
          className="flex items-center gap-0 bg-[#e8d8b5]/7 border border-[#e8d8b5]/15
            rounded-[10px] px-3 pr-1 h-9 focus-within:border-[#e8d8b5]/35 transition-colors">
          <input
            type="text"
            placeholder="Cerca giochi..."
            className="bg-transparent border-none outline-none text-[13px] text-[#e8d8b5]
              placeholder:text-[#e8d8b5]/38 w-28 sm:w-44 md:w-56"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
          <button type="submit"
            className="w-7 h-7 rounded-[7px] flex items-center justify-center
              text-[#e8d8b5]/50 hover:text-[#e8d8b5] hover:bg-[#e8d8b5]/10 transition-colors">
            <FaSearch size={12} />
          </button>
        </form>

        <div className="dropdown dropdown-end">
          <div
  tabIndex={0}
  role="button"
  data-tip={user?.user_metadata?.username ?? user?.email ?? ""}
  className={`w-[34px] h-[34px] rounded-full border-[1.5px] border-[#e8d8b5]/20
    bg-[#e8d8b5]/8 flex items-center justify-center
    hover:border-[#e8d8b5]/40 transition-colors cursor-pointer
    ${user ? "tooltip tooltip-bottom before:text-xs before:bg-[#1a3547] before:text-[#e8d8b5] before:border before:border-[#e8d8b5]/60" : ""}`}
>
            {user ? (
              <img src={avatarUrl ?? "https://picsum.photos/200/300"}
                className="rounded-full w-full h-full object-cover" alt="avatar" />
            ) : (
              <FaUserCircle className="text-[#e8d8b5]/70" size={18} />
            )}
          </div>

          <ul className="dropdown-content menu bg-[#0b212e] border border-[#e8d8b5]/20
            rounded-xl shadow-lg w-44 p-1.5 mt-2">
            {!user ? (
              <>
                <li><Link to={routes.login} className="text-[13px] text-[#e8d8b5]/75 hover:text-[#e8d8b5] hover:bg-[#e8d8b5]/8 rounded-lg">
                  <FaSignInAlt size={13} /> Login
                </Link></li>
                <li><Link to={routes.register} className="text-[13px] text-[#e8d8b5]/75 hover:text-[#e8d8b5] hover:bg-[#e8d8b5]/8 rounded-lg">
                  <FaUserPlus size={13} /> Registrati
                </Link></li>
              </>
            ) : (
              <>
                <li><Link to={routes.profile} className="text-[13px] text-[#e8d8b5]/75 hover:text-[#e8d8b5] hover:bg-[#e8d8b5]/8 rounded-lg">
                  <FaUserCircle size={13} /> Profilo
                </Link></li>
                <div className="h-px bg-[#e8d8b5]/10 my-1" />
                <li><button onClick={handle_logout} className="text-[13px] text-red-400/80 hover:text-red-400 hover:bg-red-400/8 rounded-lg w-full text-left flex items-center gap-2 px-3 py-2">
                  <FaSignOutAlt size={13} /> Logout
                </button></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}