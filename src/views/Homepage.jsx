import { useLoaderData } from "react-router";
import { useNavigate } from "react-router";
import GameList from "../components/GameList";
import GameSwiper from "../components/GameSwiper";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Homepage() {
  const { games, currentPage, totalPages } = useLoaderData();
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePageChange = (newPage) => {
    navigate(`/?page=${newPage}`);
  };

  const randomGames = [...games].sort(() => Math.random() - 0.5).slice(0, 4);

  return (
    <>
      <div className="w-full bg-[#0a1f2b]/80 backdrop-blur-sm rounded-2xl border border-[#e8d8b5]/15 p-6 mb-8 shadow-inner">
        <div className="flex items-baseline justify-between mb-4">
          <span className="text-xs font-medium tracking-widest uppercase text-[#e8d8b5]/50">
            In evidenza
          </span>
          <span className="text-xs text-[#e8d8b5]/30"></span>
        </div>
        <GameSwiper games={randomGames} />
      </div>

      <GameList>
        {games.map((game, i) => (
          <GameList.Card key={game.id} game={game} index={i} />
        ))}
      </GameList>

      <div className="flex gap-2 justify-center mt-8 scale-115">
        <button
          onClick={() => {
            handlePageChange(currentPage - 1);
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
          disabled={currentPage === 1}
          className="hover:scale-120 transition-300 cursor-pointer"
        >
          <p className="text-[#e8d8b5] font-serif">
            <FaArrowLeft />
          </p>
        </button>

        {Array.from({ length: 5 }, (_, i) => currentPage - 2 + i)
          .filter((page) => page >= 1 && page <= totalPages)
          .map((page) => (
            <button
              key={page}
              onClick={() => {
                handlePageChange(page);
                window.scrollTo({ top: 0, behavior: "instant" });
              }}
              className={
                page === currentPage
                  ? "font-bold text-[#e8d8b5] border p-1 rounded-2xl cursor-pointer"
                  : "hover:scale-120 hover:transition-300 cursor-pointer"
              }
            >
              <p className="text-[#e8d8b5] font-serif hover:scale-120 hover:transition-500">
                {page}
              </p>
            </button>
          ))}

        <button
          onClick={() => {
            handlePageChange(currentPage + 1);
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
          disabled={currentPage === totalPages}
          className="hover:scale-120 transition-300 cursor-pointer"
        >
          <p className="text-[#e8d8b5] font-serif">
            <FaArrowRight />
          </p>
        </button>
      </div>

      {createPortal(
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`fixed bottom-8 right-2 flex items-center hover:gap-2 px-3 py-3 rounded-full 
      bg-[#0a1f2b89] border border-[#e8d8b5]/30 text-[#e8d8b5] font-serif text-sm 
      shadow-lg hover:scale-105 hover:border-[#e8d8b5]/60 
      transition-all duration-500 z-12 group cursor-pointer
      ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
        >
          <span className="max-w-0 group-hover:max-w-15 overflow-hidden transition-all duration-300 ease-in-out text-xs whitespace-nowrap">
  Torna su
</span>
          <FaArrowUp className="text-sm " />
        </button>,
        document.body,
      )}
    </>
  );
}
