import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Navbar from "@/components/layout/Navbar";

import GoogleAuthWrapper from "@/components/layout/GoogleAuthWrapper";
import routes from "@/routes/Routes";

function App() {
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
