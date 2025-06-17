import { useState } from "react";
import Login from "./Modules/KMC/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Layouts/Navbar";
import { router } from "./main";
import AuthProvider from "./AuthProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return <RouterProvider router={router} />;
}

export default App;
