import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Registro from "./components/Apostas/Registro";
import Sorteio from "./components/Sorteio/Sorteio";
import Loja from "./components/Loja/Loja";
import Inventario from "./components/Inventario/Inventario";
import Aposta from "./components/Apostas/Aposta";
import Menu from "./components/Home/Menu";
import ListaAposta from "./components/Apostas/ListaApostas";
import LojaLogin from "./components/Loja/LojaLogin";
import InventarioLogin from "./components/Inventario/InventarioLogin";
import Start from "./components/Home/Start";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "",
        element: <Start />,
      },
      {
        path: "menu",
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
        element: <ListaAposta />,
      },
      {
        path: "lojaLogin",
        element: <LojaLogin />,
      },
      {
        path: "inventarioLogin",
        element: <InventarioLogin />,
      },
    ],
  },
]);

export default router;
