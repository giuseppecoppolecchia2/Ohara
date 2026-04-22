import { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import GameList from "../components/GameList";
import { FaHeart } from "react-icons/fa";
import { supabase } from "../database/supabase";
import { UserContext } from "../contexts/UserContext";
import routes from "../routing/routes";

export default function FavouritePage() {
  const { profile } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile?.id) {
      setLoading(false); //
      return;
    }

    const getFavorites = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("favourites")
        .select("*")
        .eq("profile_id", profile.id)
        .order("id", { ascending: false });

      if (!error) setFavorites(data ?? []);
      setLoading(false);
    };

    getFavorites();
  }, [profile?.id]);

  const removeFavorite = async (game_id) => {
    await supabase
      .from("favourites")
      .delete()
      .eq("profile_id", profile.id)
      .eq("game_id", game_id);

    setFavorites((prev) => prev.filter((g) => g.game_id !== game_id));
  };

  return (
    <>
      <div className="w-full bg-[#0a1f2b]/80 backdrop-blur-sm rounded-2xl border border-[#e8d8b5]/15 p-6 mb-8 shadow-inner">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-medium tracking-widest uppercase text-[#e8d8b5]/50">
            I tuoi preferiti
          </span>
          <span className="text-xs text-[#e8d8b5]/30">
            {favorites.length} {favorites.length === 1 ? "gioco" : "giochi"}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <span className="text-[#e8d8b5]/30 text-sm animate-pulse">
            Caricamento...
          </span>
        </div>
      ) : !profile ? (
        <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
          <FaHeart size={32} className="text-[#e8d8b5]/15" />
          <p className="text-[#e8d8b5]/40 text-sm">
            Accedi o registrati per vedere i tuoi preferiti.
          </p>
          <Link
            to={routes.login}
            className="text-xs text-[#e8d8b5]/50 hover:text-[#e8d8b5] border border-[#e8d8b5]/15
              hover:border-[#e8d8b5]/35 px-4 py-2 rounded-xl transition-colors duration-150"
          >
            Vai al login
          </Link>
          <Link
            to={routes.register}
            className="text-xs text-[#e8d8b5]/50 hover:text-[#e8d8b5] border border-[#e8d8b5]/15
              hover:border-[#e8d8b5]/35 px-4 py-2 rounded-xl transition-colors duration-150"
          >
            Vai al register
          </Link>
        </div>
      ) : favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
          <FaHeart size={32} className="text-[#e8d8b5]/15" />
          <p className="text-[#e8d8b5]/40 text-sm">
            Non hai ancora aggiunto nessun preferito.
          </p>
          <Link
            to="/"
            className="text-xs text-[#e8d8b5]/50 hover:text-[#e8d8b5] border border-[#e8d8b5]/15
              hover:border-[#e8d8b5]/35 px-4 py-2 rounded-xl transition-colors duration-150"
          >
            Esplora i giochi
          </Link>
        </div>
      ) : (
        <GameList>
          {favorites.map((fav) => (
            <div key={fav.game_id} className="relative group">
              <GameList.Card
                game={{
                  id: fav.game_id,
                  slug: fav.game_id,
                  name: fav.game_name,
                  background_image: fav.background_image ?? null,
                  genres: [],
                }}
              />
              <button
                onClick={() => removeFavorite(fav.game_id)}
                className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full
                  bg-[#0b212e]/80 border border-[#e8d8b5]/15
                  flex items-center justify-center
                  opacity-0 group-hover:opacity-100 transition-opacity duration-150
                  hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400 text-[#e8d8b5]/50"
                title="Rimuovi dai preferiti"
              >
                <FaHeart size={11} />
              </button>
            </div>
          ))}
        </GameList>
      )}
    </>
  );
}
