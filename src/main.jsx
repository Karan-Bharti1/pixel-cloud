import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./store.js";
import Home from "./pages/Home.jsx";
import ViewAlbum from "./pages/ViewAlbum.jsx";
import ViewImage from "./pages/ViewImage.jsx";
import LikedImages from "./pages/LikedImages.jsx";
import Bin from "./pages/Bin.jsx";
import View from "./pages/View.jsx";
import ViewLogin from "./pages/ViewLogin.jsx";
import PublicViewImage from "./pages/PublicViewImage.jsx";
const GoogleOAuthWrapper = () => (
  <GoogleOAuthProvider clientId="919329357228-pljkg169718fikr5cq0vib012q4jv44e.apps.googleusercontent.com">
    <Login />
  </GoogleOAuthProvider>
);
const GoogleOAuthWrapperView = () => (
  <GoogleOAuthProvider clientId="919329357228-pljkg169718fikr5cq0vib012q4jv44e.apps.googleusercontent.com">
    <ViewLogin />
  </GoogleOAuthProvider>
);
const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <App />,
  },
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <GoogleOAuthWrapper />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/album/:albumId",
    element: <ViewAlbum />,
  },
  { path: "/album/image/:imageId", element: <ViewImage /> },
  {
    path: "/liked-images",
    element: <LikedImages />,
  },
  {
    path: "/bin",
    element: <Bin />,
  },{
    path:"/view/:albumId",
    element:<View/>
  },{
    path:"/view-login/:albumId",
    element:<GoogleOAuthWrapperView/>
  },{
    path:"/view/image/:imageId",
    element:<PublicViewImage/>
  }
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
