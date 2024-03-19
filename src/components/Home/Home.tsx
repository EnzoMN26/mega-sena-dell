import { Outlet } from "react-router-dom";
import styles from "../../styles/Home.module.css";

//Componente responsavel por renderizar a janela (retrato) onde roda o programa. Tambem eh a raiz do router, que promove o Single Page Application
const Home: React.FC = () => {
  return (
    <>
      <div id={styles.centralView}>
        <Outlet />
      </div>
    </>
  );
};
export default Home;
