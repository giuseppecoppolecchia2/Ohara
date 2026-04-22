import { useLoaderData, useParams } from "react-router";
import GameList from "../components/GameList";

export default function SearchPage(){
    const games = useLoaderData();
    const {slug} = useParams();

    return (
        <>
        <p className="text-center text-2xl text-[#e8d8b5] font-serif   my-10">Risultati per - <span className="font-bold uppercase font-serif">{slug || ""}</span> </p>
            
        <GameList>
                {games.map((game)=> {
                    return (
                        <GameList.Card key={game.id} game={game} />
                    )
                })}
        </GameList>
        
        </>
    )
}