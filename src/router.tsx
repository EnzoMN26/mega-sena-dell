import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Registro from "./components/Registro";
import Sorteio from "./components/Sorteio";
import Loja from "./components/Loja";
import Inventario from "./components/Inventario";
import Aposta from "./components/Aposta";
import Menu from "./components/Menu";
import Lista from "./components/Lista";
import LojaLogin from "./components/LojaLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "",
        element: <Menu />,
      },
      {
        path: "registro",
        element: <Registro />,
      },
      {
        path: "sorteio",
        element: <Sorteio />,
      },
      {
        path: "loja",
        element: <Loja />,
      },
      {
        path: "inventario",
        element: <Inventario />,
      },
      {
        path: "aposta",
        element: <Aposta />,
      },
      {
        path: "lista",
        element: <Lista />,
      },
      {
        path: "lojaLogin",
        element: <LojaLogin />,
      },
    ],
  },
]);

export default router;
