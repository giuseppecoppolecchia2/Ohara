import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { FaUser, FaEnvelope, FaAt, FaGamepad } from "react-icons/fa";
import { Link } from "react-router";
import routes from "../../routing/routes";
import { supabase } from "../../database/supabase";

export default function Profile() {
  const { user, profile, avatarUrl } = useContext(UserContext);

  const [userFavourites, setUserFavourites] = useState([]);
  const [userReviews, setUserReviews] = useState([]);

  // ✅ FIXED
  const get_reviews = async () => {
    if (profile) {
      let { data: reviews, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("profile_id", profile.id);

      if (!error && reviews) {
        setUserReviews(reviews);
      }
    }
  };

  const get_favourites = async () => {
    if (profile) {
      let { data: favourites, error } = await supabase
        .from("favourites")
        .select("*")
        .eq("profile_id", profile.id);

      if (!error && favourites) {
        setUserFavourites(favourites);
      }
    }
  };

  useEffect(() => {
    get_favourites();
    get_reviews();
  }, [profile]);

  if (!user || !profile) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex justify-center">
      <div className="w-full max-w-5xl">

        <div className="bg-[#0a1f2b]/80 backdrop-blur-sm border border-[#e8d8b5]/40 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center ">

          <img
            src={avatarUrl ?? "https://picsum.photos/200"}
            alt="Profilo"
            className="w-28 h-28 rounded-full border-4 border-[#e8d8b5]/40 shadow-md"
          />

          <h1 className="text-3xl font-bold mt-4 text-[#e8d8b5]">
            {profile.first_name} {profile.last_name}
          </h1>

          <p className="text-[#e8d8b5]/60 mt-1">
            @{profile.username}
          </p>

        </div>

        <section className="grid md:grid-cols-2 gap-6 mt-8">

          <div className="bg-[#0a1f2b]/80 backdrop-blur-sm border border-[#e8d8b5]/40 rounded-xl p-6 shadow-md hover:scale-[1.01] transition">

            <h2 className="text-lg font-semibold mb-4 text-[#e8d8b5]">
              Informazioni personali
            </h2>

            <div className="space-y-3 text-sm text-[#e8d8b5]/80">

              <p className="flex items-center gap-2">
                <FaUser className="opacity-70" />
                <span>
                  {profile.first_name} {profile.last_name}
                </span>
              </p>

              <p className="flex items-center gap-2">
                <FaAt className="opacity-70" />
                <span>@{profile.username}</span>
              </p>

              <p className="flex items-center gap-2">
                <FaEnvelope className="opacity-70" />
                <span>{user.email}</span>
              </p>

            </div>
          </div>

          <div className="bg-[#0a1f2b]/80 backdrop-blur-sm border border-[#e8d8b5]/40 rounded-xl p-6 shadow-md hover:scale-[1.01] transition">

            <h2 className="text-lg font-semibold mb-4 text-[#e8d8b5]">
              Statistiche
            </h2>

            <div className="grid grid-cols-2 gap-4 text-center">

              <div className="bg-[#0f2a3a]/70 border border-[#e8d8b5]/40 rounded-lg p-4">
                <p className="text-2xl font-bold text-[#e8d8b5]">
                  {userReviews.length}
                </p>
                <span className="text-sm text-[#e8d8b5]/60">
                  Recensioni
                </span>
              </div>

              <div className="bg-[#0f2a3a]/70 border border-[#e8d8b5]/40 rounded-lg p-4">
                <p className="text-2xl font-bold text-[#e8d8b5]">
                  {userFavourites.length}
                </p>
                <span className="text-sm text-[#e8d8b5]/60">
                  Preferiti
                </span>
              </div>

            </div>

          </div>

          <div className="bg-[#0a1f2b]/80 backdrop-blur-sm border border-[#e8d8b5]/40 rounded-xl p-6 shadow-md md:col-span-2 hover:scale-[1.01] transition">

            <h2 className="text-lg font-semibold mb-4 text-[#e8d8b5]">
              Giochi preferiti
            </h2>

            {userFavourites.length === 0 ? (
              <p className="text-sm text-[#e8d8b5]/60">
                Nessun gioco nei preferiti
              </p>
            ) : (
              <ul className="space-y-3 text-sm text-[#e8d8b5]/80">
                {userFavourites.map((favourite) => (
                  <li
                    key={favourite.game_id}
                    className="flex items-center gap-2"
                  >
                    <FaGamepad className="opacity-70" />
                    <span>{favourite.game_name}</span>
                  </li>
                ))}
              </ul>
            )}

          </div>

        </section>

        <div className="flex justify-center mt-8">
          <Link
            to={routes.profile_settings}
            className="px-6 py-2 rounded-xl bg-[#b48f40] border border-[#e8d8b5]/40 text-[#0a1f2b] font-semibold hover:opacity-90 transition"
          >
            Modifica Profilo
          </Link>
        </div>

      </div>
    </main>
  );
}