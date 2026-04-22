import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { FaHome, FaSignInAlt, FaStar, FaUserCircle, FaUserPlus } from "react-icons/fa";
import routes from "../routing/routes";

import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";



const MAX_RECENT = 5;
const STORAGE_KEY = "ohara_recent_games";

export function trackRecentGame(game) {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    const filtered = stored.filter((g) => g.slug !== game.slug);
    const updated = [game, ...filtered].slice(0, MAX_RECENT);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}
}

export default function Sidebar({ genres, onClose }) {
  const location = useLocation();
  const [recentGames, setRecentGames] = useState([]);
  const { user } = useContext(UserContext);
  const NAV_ITEMS = [
    { label: "Home", to: routes.home, icon: <FaHome size={13} /> },
    { label: "Preferiti", to: routes.favorites, icon: <FaStar size={13} /> },
    ...(user
      ? [{ label: user.user_metadata?.username ?? "Profilo", to: routes.profile, icon: <FaUserCircle size={13} /> }]
      : [
          { label: "Accedi", to: routes.login, icon: <FaSignInAlt size={13} />  },
          { label: "Registrati", to: routes.register, icon: <FaUserPlus size={13} />  },
        ]
    ),
  ];


  useEffect(() => {
    onClose?.();
  }, [location.pathname]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      setRecentGames(stored);
    } catch {}
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col gap-1">
      <p className="text-[10.5px] font-medium tracking-widest uppercase text-[#e8d8b5]/38 px-2 mb-1">
        Navigazione
      </p>
      <ul className="flex flex-col gap-0.5 mb-3">
        {NAV_ITEMS.map(({ label, to, icon }) => (
          <li key={to}>
            <Link
              to={to}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors duration-150
                ${
                  isActive(to)
                    ? "bg-[#e8d8b5]/12 text-[#e8d8b5]"
                    : "text-[#e8d8b5]/60 hover:text-[#e8d8b5] hover:bg-[#e8d8b5]/9"
                }`}
            >
              <span className="opacity-70">{icon}</span>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="h-px bg-[#e8d8b5]/10 mx-2 mb-3" />

      <p className="text-[10.5px] font-medium tracking-widest uppercase text-[#e8d8b5]/38 px-2 mb-1">
        Generi
      </p>
      <ul className="flex flex-col gap-0.5 mb-3">
        {genres.map((genre) => (
          <li key={genre.id}>
            <Link
              to={`/genre/${genre.slug}`}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors duration-150
                ${
                  location.pathname === `/genre/${genre.slug}`
                    ? "bg-[#e8d8b5]/12 text-[#e8d8b5]"
                    : "text-[#e8d8b5]/60 hover:text-[#e8d8b5] hover:bg-[#e8d8b5]/9"
                }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#e8d8b5]/25 flex-shrink-0" />
              {genre.name}
            </Link>
          </li>
        ))}
      </ul>

      {recentGames.length > 0 && (
        <>
          <div className="h-px bg-[#e8d8b5]/10 mx-2 mb-3" />
          <p className="text-[10.5px] font-medium tracking-widest uppercase text-[#e8d8b5]/38 px-2 mb-1">
            Visitati di recente
          </p>
          <ul className="flex flex-col gap-0.5">
            {recentGames.map((game) => (
              <li key={game.slug}>
                <Link
                  to={`/detail/${game.slug}`}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg
                    text-[#e8d8b5]/60 hover:text-[#e8d8b5] hover:bg-[#e8d8b5]/9
                    transition-colors duration-150"
                >
                  {game.background_image ? (
                    <img
                      src={game.background_image}
                      alt=""
                      className="w-7 h-7 rounded-[5px] object-cover flex-shrink-0 opacity-80"
                    />
                  ) : (
                    <span className="w-7 h-7 rounded-[5px] bg-[#e8d8b5]/8 flex-shrink-0" />
                  )}
                  <span className="text-[12.5px] truncate">{game.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
