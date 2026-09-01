import { useEffect } from "react";
import { useNavigate, useLocation, useSearchParams, Outlet } from "react-router";

export default function Root() {
  const navigate = useNavigate();
  const location = useLocation();
  // 1. Read query parameters directly from the URL route
  const [searchParams] = useSearchParams();

  useEffect(() => {
  // Extract ONLY the section ID
  const sectionId = searchParams.get("section");

  if (sectionId) {
    const timer = setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
    
    return () => clearTimeout(timer);
  } else {
    window.scrollTo({ top: 0, left: 0 });
  }
  // searchParams changes every click now because of the timestamp parameter!
}, [location.pathname, searchParams]); 

  useEffect(() => {
    const qsLangauge = searchParams.get("lang");
    if(qsLangauge){
      localStorage.setItem("language", qsLangauge.toLowerCase());
    }
    if (location.pathname !== "/") return;
    const lang = localStorage.getItem("language");

    if (!lang && !qsLangauge) {
     navigate("/language", { replace: true });
    }
  }, [location.pathname, navigate, searchParams]);

  return <Outlet />;
}
