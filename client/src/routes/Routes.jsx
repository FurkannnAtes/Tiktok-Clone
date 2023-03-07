import { Home, PostDetails, Profile, Upload, MyPostDetails } from "@/pages";

const routes = [
  { path: "/", component: <Home /> },
  { path: "/profile/:id", component: <Profile /> },
  { path: "/upload", component: <Upload /> },
  { path: "/post/:id", component: <PostDetails /> },
  { path: "/profilePostsDetails/:id", component: <MyPostDetails /> },
];

export default routes;
