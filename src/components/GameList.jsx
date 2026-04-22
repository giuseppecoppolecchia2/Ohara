import GameCard from "./GameCard";
export default function GameList({children}){
    return(
        <>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-5 ">
                {children}
            </div>
        
        </>
    )
}


GameList.Card = GameCard