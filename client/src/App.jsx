import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Navbar from "@/components/layout/Navbar";

import GoogleAuthWrapper from "@/components/layout/GoogleAuthWrapper";
import routes from "@/routes/Routes";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (localStorage.getItem("thema") === null) {
      localStorage.setItem("thema", "dark");
      document.documentElement.classList.add("dark");
    }
  }, []);
  //All Routes Map
  const routeComponents = routes.map(({ path, component }, key) => (
    <Route path={path} element={component} key={key} />
  ));
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLEID}>
      <BrowserRouter>
        <Navbar />
        <GoogleAuthWrapper />
        <Routes>{routeComponents}</Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
