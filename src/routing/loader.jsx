
export async function gamesLoader({ request }) {
    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get("page")) || 1); 

    const response = await fetch(
        `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&page_size=33&page=${page}`
    );
    const json = await response.json();

    return {
        games: json.results,
        count: json.count,
        currentPage: Math.max(1, Number(page)),
        totalPages: Math.ceil(json.count / 33)
    };
}

export async function getSearchedGames({params}){
    const promise = await fetch(`https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&search=${params.slug}`);
    const json = await promise.json();
    return json.results;
}

export async function getGenres(){
    const promise = await fetch(`https://api.rawg.io/api/genres?key=${import.meta.env.VITE_API_KEY}`);
    const json = await promise.json();
    return json.results;
}

export async function getGamesByGenre({ params, request }) {
    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get("page")) || 1);

    const promise = await fetch(
        `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&genres=${params.slug}&page_size=33&page=${page}`
    );
    const json = await promise.json();

    return {
        games: json.results,
        count: json.count,
        currentPage: page,
        totalPages: Math.ceil(json.count / 33)
    };
}


export async function getGameDetails({ params }) {
  const [gameRes, screenshotsRes, moviesRes, similarRes, storesRes] = await Promise.all([
    fetch(`https://api.rawg.io/api/games/${params.id}?key=${import.meta.env.VITE_API_KEY}`),
    fetch(`https://api.rawg.io/api/games/${params.id}/screenshots?key=${import.meta.env.VITE_API_KEY}`),
    fetch(`https://api.rawg.io/api/games/${params.id}/movies?key=${import.meta.env.VITE_API_KEY}`),
    fetch(`https://api.rawg.io/api/games/${params.id}/game-series?key=${import.meta.env.VITE_API_KEY}&page_size=10`),
    fetch(`https://api.rawg.io/api/games/${params.id}/stores?key=${import.meta.env.VITE_API_KEY}`),
  ]);

  const [game, screenshots, movies, similar, stores] = await Promise.all([
    gameRes.json(),
    screenshotsRes.json(),
    moviesRes.json(),
    similarRes.json(),
    storesRes.json(),
  ]);

  return {
    ...game,
    screenshots: screenshots.results ?? [],
    movies: movies.results ?? [],
    similar: similar.results ?? [],
    stores: stores.results ?? [],
  };
}

