import { useLoaderData, useNavigate, Link } from "react-router";
import {
  FaCircleArrowLeft,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
} from "react-icons/fa6";
import { use, useContext, useRef, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Navbar from "../components/Navbar";
import BodySection from "../components/DetailComponents/BodySection";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { trackRecentGame } from "../components/Sidebar";

import { useEffect } from "react";

export default function DetailPage() {



  const game = useLoaderData();
  const navigate = useNavigate();
  const { profile } = useContext(UserContext);

  const { screenshots = [], movies = [], similar = [] } = game;
  const [activeTrailer, setActiveTrailer] = useState(null);
  const similarRef = useRef(null);

  const scrollSimilar = (dir) => {
    if (!similarRef.current) return;
    similarRef.current.scrollBy({ left: dir * 240, behavior: "smooth" });
  };

  const [currentImg, setCurrentImg] = useState(0);
  const screenshotRef = useRef(null);

  useEffect(() => {
    if(game){
      trackRecentGame({ slug: game.slug, name: game.name, id: game.id, background_image: game.background_image });
    }
  }, [game])
    

  useEffect(() => {
    if (screenshots.length === 0) return;

    const interval = setInterval(() => {
      if (screenshotRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = screenshotRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 5) {
          screenshotRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          screenshotRef.current.scrollBy({ left: 240, behavior: "smooth" }); // 240 è la larghezza di una card
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [screenshots]);
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0f2a3a] text-[#e8d8b5]">
        <div className="relative w-full">
          <img
            src={game.background_image}
            alt={game.name}
            className="w-full h-auto block"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f2a3a]/20 via-transparent to-[#0f2a3a]" />
        </div>

        <div className="px-6 md:px-16 pb-10 -mt-16 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight text-[#e8d8b5] drop-shadow-md">
              {game.name}
            </h1>
            {game.rating && (
              <div className="flex items-center gap-2 bg-[#e8d8b5]/10 backdrop-blur px-4 py-2 rounded-full w-fit border border-[#e8d8b5]/20">
                <FaStar className="text-yellow-400/90 text-sm" />
                <span className="text-[#e8d8b5] font-semibold">
                  {game.rating.toFixed(1)}
                </span>
                <span className="text-[#e8d8b5]/50 text-sm">/ 5</span>
              </div>
            )}
          </div>

          {game.genres?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {game.genres.map((g) => (
                <span
                  key={g.id}
                  className="text-xs px-3 py-1 rounded-full bg-[#e8d8b5]/10 text-[#e8d8b5]/70 border border-[#e8d8b5]/15"
                >
                  {g.name}
                </span>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Rilascio", value: game.released ?? "—" },
              { label: "Metacritic", value: game.metacritic ?? "N/D" },
              {
                label: "Piattaforme",
                value:
                  game.platforms
                    ?.map((p) => p.platform.name)
                    .slice(0, 2)
                    .join(", ") ?? "—",
              },
              {
                label: "Sviluppatore",
                value: game.developers?.[0]?.name ?? "—",
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-[#e8d8b5]/5 border border-[#e8d8b5]/10 rounded-xl p-4"
              >
                <p className="text-xs text-[#e8d8b5]/40 mb-1">{label}</p>
                <p className="text-sm font-semibold text-[#e8d8b5] truncate">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {game.description_raw && (
            <div className="bg-[#e8d8b5]/5 border border-[#e8d8b5]/10 rounded-xl p-5 mb-10">
              <p className="text-xs text-[#e8d8b5]/40 mb-2 font-bold uppercase tracking-wider">
                Descrizione
              </p>
              <p className="text-sm text-[#e8d8b5]/70 leading-relaxed line-clamp-6">
                {game.description_raw}
              </p>
            </div>
          )}
          {screenshots.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xs font-medium tracking-widest uppercase text-[#e8d8b5]/40 mb-4">
                Galleria Immagini
              </h2>

              <div
                ref={screenshotRef}
                className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x"
              >
                {screenshots.map((s) => (
                  <div
                    key={s.id}
                    className="flex-shrink-0 w-64 h-36 relative rounded-2xl overflow-hidden border border-[#e8d8b5]/30 shadow-lg group snap-start"
                  >
                    <img
                      src={s.image}
                      alt="screenshot"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a3a]/60 via-transparent to-transparent opacity-60" />

                    <div className="absolute inset-0 rounded-2xl border border-[#e8d8b5]/20 pointer-events-none" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {movies.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xs font-medium tracking-widest uppercase text-[#e8d8b5]/40 mb-4">
                Trailer Ufficiali
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#e8d8b5]/20 bg-black shadow-2xl">
                    {activeTrailer ? (
                      <video
                        key={activeTrailer}
                        src={activeTrailer}
                        controls
                        autoPlay
                        className="w-full h-full"
                      />
                    ) : (
                      <div
                        className="relative w-full h-full cursor-pointer group"
                        onClick={() =>
                          setActiveTrailer(
                            movies[0].data.max ?? movies[0].data[480],
                          )
                        }
                      >
                        <img
                          src={movies[0].preview}
                          className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-all"
                          alt="Preview"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-[#e8d8b5]/20 backdrop-blur-md border border-[#e8d8b5]/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <FaPlay className="text-[#e8d8b5] ml-1" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 overflow-y-auto max-h-[350px] pr-2 scrollbar-hide">
                  {movies.map((m) => {
                    const src = m.data.max ?? m.data[480];
                    return (
                      <button
                        key={m.id}
                        onClick={() => setActiveTrailer(src)}
                        className={`flex gap-3 p-2 rounded-xl border transition-all text-left ${activeTrailer === src ? "bg-[#e8d8b5]/20 border-[#e8d8b5]/40" : "bg-white/5 border-transparent hover:border-[#e8d8b5]/20"}`}
                      >
                        <img
                          src={m.preview}
                          className="w-24 aspect-video object-cover rounded-lg"
                          alt=""
                        />
                        <p
                          className={`text-xs self-center line-clamp-2 ${activeTrailer === src ? "text-[#e8d8b5]" : "text-[#e8d8b5]/50"}`}
                        >
                          {m.name}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {similar.length > 0 && (
            <section className="pb-16">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-medium tracking-widest uppercase text-[#e8d8b5]/40">
                  Della stessa serie
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => scrollSimilar(-1)}
                    className="w-8 h-8 rounded-full border border-[#e8d8b5]/15 bg-[#e8d8b5]/5 hover:bg-[#e8d8b5]/10 flex items-center justify-center transition-colors"
                  >
                    <FaChevronLeft className="text-[#e8d8b5]/70 text-xs" />
                  </button>
                  <button
                    onClick={() => scrollSimilar(1)}
                    className="w-8 h-8 rounded-full border border-[#e8d8b5]/15 bg-[#e8d8b5]/5 hover:bg-[#e8d8b5]/10 flex items-center justify-center transition-colors"
                  >
                    <FaChevronRight className="text-[#e8d8b5]/70 text-xs" />
                  </button>
                </div>
              </div>
              <div
                ref={similarRef}
                className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
              >
                {similar.map((g) => (
                  <Link
                    key={g.id}
                    to={`/detail/${g.id}`}
                    className="flex-shrink-0 w-56"
                  >
                    <div className="h-36 relative rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer group overflow-hidden bg-[#0f2a3a] shadow-lg">
                      <img
                        src={g.background_image ?? "/placeholder.jpg"}
                        alt={g.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a3a]/95 via-[#0f2a3a]/50 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
                      <div className="absolute inset-0 rounded-2xl border border-[#e8d8b5]/30 pointer-events-none shadow-[inset_0_0_25px_rgba(0,0,0,0.6)]" />
                      <div className="absolute bottom-0 w-full text-center px-3 pb-3">
                        <p className="text-[#e8d8b5] font-serif text-sm drop-shadow-lg transition-all duration-500 group-hover:-translate-y-3">
                          {g.name}
                        </p>
                        <p className="text-[10px] text-[#e8d8b5]/70 italic opacity-0 group-hover:opacity-100 transition duration-500">
                          Scopri di più...
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {profile && <BodySection game={game} profile_id={profile.id} />}
        </div>

        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer fixed bottom-6 left-6 bg-[#e8d8b5]/10 backdrop-blur border border-[#e8d8b5]/20 hover:bg-[#e8d8b5]/20 transition p-3 rounded-full text-[#e8d8b5] text-xl z-50"
        >
          <FaCircleArrowLeft />
        </button>
      </main>
    </>
  );
}
