import { Link } from "react-router";
import useInView from "./useInView";
export default function GameCard({ game, index = 0 }) {
  const { ref, inView } = useInView();
  const delay = `${(index % 6 ) * 75}ms`;
  return (
     <Link to={`/detail/${game.id}`}>
      <div
        ref={ref}
        style={{ transitionDelay: inView ? delay : "0ms" }}
        className={`h-72 relative rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer group overflow-hidden bg-[#0f2a3a] shadow-lg z-0
          ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <img
          src={`${game.background_image}`}
          alt={game.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 flex flex-wrap gap-2 justify-end max-w-[80%] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          {game.genres.map((genre) => (
            <Link to={`/genre/${genre.slug}`}
              key={genre.id}
              className="px-3 py-1 text-xs rounded-full bg-[#0f2a3a]/80 backdrop-blur-md hover:cursor-default text-[#e8d8b5] border border-[#e8d8b5]/30 shadow-md"
            >
              {genre.name}
            </Link>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a3a]/95 via-[#0f2a3a]/50 to-transparent transition-opacity duration-500 group-hover:opacity-80" />

        <div className="absolute inset-0 rounded-2xl border border-[#e8d8b5]/30 pointer-events-none shadow-[inset_0_0_25px_rgba(0,0,0,0.6)]" />

        

        <div className="absolute bottom-0 w-full text-center px-3 pb-4">
          <p className="text-[#e8d8b5] font-serif text-lg drop-shadow-lg transition-all duration-500 group-hover:-translate-y-4">
            {game.name}
          </p>

          <p className="text-xs text-[#e8d8b5]/70 italic opacity-0 group-hover:opacity-100 transition duration-500">
            Scopri di piu...
          </p>
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[#e8d8b5]/10" />
      </div>
    </Link>
  );
}
