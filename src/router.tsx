import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Registro from "./components/Registro";
import Sorteio from "./components/Sorteio";
import Loja from "./components/Loja";
import Inventario from "./components/Inventario";
import Aposta from "./components/Aposta";

const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
    children: [
      {
        path: "/registro",
        element: <Registro />,
      },
      {
        path: "/Sorteio",
        element: <Sorteio />,
      },
      {
        path: "/Loja",
        element: <Loja />,
      },
      {
        path: "/Inventario",
        element: <Inventario />,
      },
      {
        path: "/Aposta",
        element: <Aposta />,
      },
    ],
  },
]);

export default router;
