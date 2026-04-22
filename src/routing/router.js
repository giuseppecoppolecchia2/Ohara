import { createBrowserRouter } from "react-router";
import Homepage from "../views/Homepage";
import Layout from "../layouts/Layout";
import routes from "./routes";
import { gamesLoader, getGameDetails, getGenres } from "./loader";
import SearchPage from "../views/SearchPage";
import { getSearchedGames } from "./loader";
import GenrePage from "../views/GenrePage";
import { getGamesByGenre } from "./loader";
import AuthenticationLayout from "../layouts/AuthLayout";
import Register from "../views/auth/Register";
import Login from "../views/auth/Login";
import Profile from "../views/auth/Profile";
import ProfileSettingPage from "../views/auth/ProfileSettingPage";
import DetailPage from "../views/DetailPage";
import ScrollToTop from "../components/ScrollToTop";
import FavouritePage from "../views/FavouritePage";


const router = createBrowserRouter([
    {
        Component: ScrollToTop,
        children: [
            {
        path: routes.home,
        Component: Layout,
        loader: getGenres,
        children: [
            {
                path: routes.home,
                Component: Homepage,
                loader: gamesLoader
            },
            {
                path: routes.search,
                Component: SearchPage,
                loader: getSearchedGames
            },
            {
                path: routes.genre,
                Component: GenrePage,
                loader: getGamesByGenre
            },
            {
                path: routes.favorites,
                Component: FavouritePage
            }
        ]
    },
    {
        path: '/auth',
        Component: AuthenticationLayout,
            children: [
                {
                path: routes.register,
                Component: Register
            },
            {
                path: routes.login,
                Component: Login
            },
            {
                path: routes.profile,
                Component: Profile
            },
            {
                path: routes.profile_settings,
                Component: ProfileSettingPage
            }
        ]
    },
    {
        path: routes.detail,
        Component: DetailPage,
        loader: getGameDetails
    }

        ]
    }
    
])
export default router
    