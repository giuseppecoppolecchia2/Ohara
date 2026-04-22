import GameList from "../components/GameList";
import { useLoaderData } from "react-router";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

export default function GenrePage() {
    const { games = [], currentPage = 1, totalPages = 1 } = useLoaderData();
    const { slug } = useParams();
    const navigate = useNavigate();

    const handlePageChange = (newPage) => {
        navigate(`/genre/${slug}?page=${newPage}`);
      };

    return(
        <>
            <p className="text-center text-2xl font-serif text-[#e8d8b5] uppercase my-10"> {slug}</p>
            <GameList>
                {games.map((game)=> {
                    return (
                        <GameList.Card key={game.id} game={game} />
                    )
                }
                )}
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
                              ? "font-bold text-[#e8d8b5] border p-1 rounded-2xl cursor-pointer "
                              : "hover:scale-120 hover:transition-300 cursor-pointer"
                          }
                        >
                          <p className="text-[#e8d8b5] font-serif hover:scale-120 hover:transition-500  ">{page}</p>
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
        </>
    )
}