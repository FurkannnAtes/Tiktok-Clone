import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLEID}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
