import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaPaperPlane } from "react-icons/fa";
import { supabase } from "../../database/supabase";
export default function BodySection({ game, profile_id }) {
  const [liked, setLiked] = useState(false);
  const [description, setDescription] = useState("");
  const [gameReviews, setGameReviews] = useState([]);
  const [checkReview, setCheckReview] = useState(false);


  const get_reviews = async () => {
  const { data: reviews, error } = await supabase
    .from("reviews")
    .select("*, profiles(username)")
    .eq("game_id", game.id)
    .order("id", { ascending: false });


  if (error) {
    console.error("Errore nel recupero recensioni:", error.message);
  } else {
    setGameReviews(reviews || []);
  }
};

  const add_review = async () => {
  if (!description.trim()) return;

  const { data, error } = await supabase
    .from("reviews")
    .insert([
      { 
        profile_id, 
        game_id: game.id, 
        game_name: game.name, 
        description 
      }
    ])
    .select();

  if (!error) {
    setDescription("");
    if (data) setGameReviews((prev) => [data[0], ...prev]);
  } else {
    console.error("Errore nell'invio:", error.message);
  }


};

  const handleLike = async () => {
    if (liked) {
      await supabase.from("favourites").delete().eq("profile_id", profile_id).eq("game_id", game.id);
      setLiked(false);
    } else {
      await supabase.from("favourites").insert([{ profile_id, game_id: game.id, game_name: game.name, background_image: game.background_image ?? null }]);
      setLiked(true);
    }
  };

 useEffect(() => {
    const get_favourite = async () => {
      const { data } = await supabase
        .from("favourites")
        .select("*")
        .eq("profile_id", profile_id)
        .eq("game_id", game.id);
      if (data?.length > 0) setLiked(true);
    };

    get_favourite();
    get_reviews();
  }, [game.id]);

  
  return (
    <section className="flex flex-col gap-8 border-t border-[#e8d8b5]/10 pt-10 mt-10">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        
        <div className="bg-[#e8d8b5]/5 border border-[#e8d8b5]/10 rounded-3xl p-6 relative">
          
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#e8d8b5]/40">
              La tua opinione
            </h3>
            <button
              onClick={handleLike}
              title={liked ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
              className={`p-3 rounded-full border transition-all duration-300 cursor-pointer ${
                liked 
                ? "bg-red-500/20 border-red-500/50 text-red-500 scale-110" 
                : "bg-[#e8d8b5]/5 border-[#e8d8b5]/20 text-[#e8d8b5]/40 hover:text-[#e8d8b5] hover:border-[#e8d8b5]/40"
              }`}
            >
              {liked ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
            </button>
          </div>

          <div className="relative">
            <textarea
              className="w-full bg-[#0f2a3a]/50 border border-[#e8d8b5]/10 rounded-2xl p-4 text-sm text-[#e8d8b5] placeholder-[#e8d8b5]/20 focus:outline-none focus:border-[#e8d8b5]/30 transition shadow-inner"
              rows={3}
              placeholder="Scrivi cosa ne pensi..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button
              onClick={add_review}
              className="absolute bottom-3 right-3 bg-transparent text-[#e8d8b5] border border-[#e8d8b5]/30 p-2.5 rounded-xl hover:scale-105 transition active:scale-95 shadow-lg cursor-pointer"
            >
              <FaPaperPlane size={13} />
            </button>
            
          </div>
          
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#e8d8b5]/40 ml-2">
            Commenti della community ({gameReviews.length})
          </h3>
          
          <div className="grid gap-4">
            {gameReviews.length > 0 ? (
              gameReviews.map((r) => (
                <div 
                  key={r.id} 
                  className="bg-[#e8d8b5]/5 border border-[#e8d8b5]/10 rounded-2xl p-5 hover:bg-[#e8d8b5]/10 transition-colors group"
                >
                  <p className="text-sm text-[#e8d8b5]/80 leading-relaxed italic group-hover:text-[#e8d8b5]">
                    "{r.description}"
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-px w-4 bg-[#e8d8b5]/20"></div>
                    <span className="text-[10px] text-[#e8d8b5]/30 uppercase tracking-tighter">
                      {r.profiles?.username}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 border-2 border-dashed border-[#e8d8b5]/5 rounded-2xl">
                <p className="text-sm text-[#e8d8b5]/20 italic">
                  Non ci sono ancora recensioni per questo gioco.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}