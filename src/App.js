import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/root-layout/RootLayout";
import Home from "./pages/home/home";
import Signin from "./pages/signin/signin";
import Signup from "./pages/signup/signup";
import Favorites from "./pages/favorites/favorites";
import Gallery from "./pages/gallery/gallery";
import { ProtectedRoute } from "./util/ProtectedRoute";
import LoadingSpinner from "./components/UI/loading-spinner/LoadingSpinner";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/test",
          element: <LoadingSpinner />,
        },
        {
          path: "/favorites",
          element: (
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          ),
        },
        {
          path: "/gallery",
          element: <Gallery />,
        },
      ],
    },
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);

  return <RouterProvider router={router} />;
}
