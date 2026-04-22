// ScrollToTop.jsx
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return <Outlet />;
}