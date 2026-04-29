import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Build } from "./pages/Build";
import { Basket } from "./pages/Basket";
import { Checkout } from "./pages/Checkout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "build", Component: Build },
      { path: "basket", Component: Basket },
      { path: "checkout", Component: Checkout },
    ],
  },
]);
