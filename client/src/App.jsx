import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";
import Post from "./pages/Post";
import GoogleAuthWrapper from "./components/layout/GoogleAuthWrapper";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLEID}>
      <BrowserRouter>
        <Navbar />
        <GoogleAuthWrapper />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
